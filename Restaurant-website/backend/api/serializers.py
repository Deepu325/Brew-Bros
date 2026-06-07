from rest_framework import serializers
from .models import Category, MenuItem, Review, Inquiry, TableBooking

class MenuItemSerializer(serializers.ModelSerializer):
    image_display = serializers.SerializerMethodField()

    def get_image_display(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image_url or None

    class Meta:
        model = MenuItem
        fields = '__all__'
        read_only_fields = ('id',)

class CategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'image_url', 'items']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'

class TableBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableBooking
        fields = '__all__'
