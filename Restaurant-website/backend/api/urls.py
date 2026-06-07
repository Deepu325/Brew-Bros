from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CategoryViewSet, MenuItemViewSet, ReviewViewSet, InquiryViewSet, TableBookingViewSet, admin_login, create_razorpay_order

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'menu-items', MenuItemViewSet, basename='menuitem')
router.register(r'reviews', ReviewViewSet)
router.register(r'inquiries', InquiryViewSet)
router.register(r'table-bookings', TableBookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/login/', admin_login),
    path('admin/token/refresh/', TokenRefreshView.as_view()),
    path('payment/create-order/', create_razorpay_order),
]
