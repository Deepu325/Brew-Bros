from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Category, MenuItem, Review, Inquiry, TableBooking
from .serializers import CategorySerializer, MenuItemSerializer, ReviewSerializer, InquirySerializer, TableBookingSerializer
import razorpay
import os

RAZORPAY_KEY_ID = os.getenv('RAZORPAY_KEY_ID', '')
RAZORPAY_KEY_SECRET = os.getenv('RAZORPAY_KEY_SECRET', '')
razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))


@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user and user.is_staff:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'username': user.username,
        })
    return Response({'error': 'Invalid credentials or not an admin'}, status=status.HTTP_401_UNAUTHORIZED)


# Public read / Admin full CRUD
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]


class MenuItemViewSet(viewsets.ModelViewSet):
    serializer_class = MenuItemSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        if self.request.user and self.request.user.is_authenticated:
            return MenuItem.objects.all()
        return MenuItem.objects.filter(is_available=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        # Handle uploaded image if provided
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'create']:
            return [AllowAny()]
        return [IsAuthenticated()]


class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [AllowAny()]
        return [IsAuthenticated()]


class TableBookingViewSet(viewsets.ModelViewSet):
    queryset = TableBooking.objects.all().order_by('-created_at')
    serializer_class = TableBookingSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [AllowAny()]
        return [IsAuthenticated()]


@api_view(['POST'])
@permission_classes([AllowAny])
def create_razorpay_order(request):
    if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
        return Response(
            {'error': 'Razorpay API keys are not configured on the backend. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    amount = request.data.get('amount')
    if amount is None:
        return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        amount_value = float(amount)
        if amount_value <= 0:
            raise ValueError('Amount must be positive')
    except (ValueError, TypeError) as exc:
        return Response({'error': f'Invalid amount: {exc}'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        order = razorpay_client.order.create({
            'amount': int(amount_value * 100),
            'currency': 'INR',
            'payment_capture': 1,
        })
        return Response({'order_id': order['id'], 'amount': order['amount'], 'currency': order['currency']})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
