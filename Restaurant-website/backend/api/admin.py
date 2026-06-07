from django.contrib import admin
from .models import Category, MenuItem, Review, Inquiry, TableBooking


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ('id', 'name')


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
	list_display = ('id', 'name', 'category', 'price', 'is_available')
	list_filter = ('category', 'is_available', 'is_spicy')
	search_fields = ('name', 'description')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
	list_display = ('id', 'customer_name', 'rating', 'created_at')


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
	list_display = ('id', 'customer_name', 'phone', 'total_amount', 'status', 'created_at')


@admin.register(TableBooking)
class TableBookingAdmin(admin.ModelAdmin):
	list_display = ('id', 'customer_name', 'phone', 'date', 'time_slot', 'guests', 'table_number', 'status')
	list_filter = ('status', 'date')
	search_fields = ('customer_name', 'phone')
