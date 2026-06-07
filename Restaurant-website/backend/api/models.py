from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    image_url = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class MenuItem(models.Model):
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_spicy = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    image_url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='menu_images/', blank=True, null=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    customer_name = models.CharField(max_length=100)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} ({self.rating}/5)"

class Inquiry(models.Model):
    customer_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    message = models.TextField(blank=True)
    items_json = models.TextField(help_text="JSON string of selected items")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    order_type = models.CharField(max_length=20, default='takeaway')
    table_number = models.CharField(max_length=10, blank=True, null=True)
    payment_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"Inquiry from {self.customer_name}"

class TableBooking(models.Model):
    customer_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    date = models.DateField()
    time_slot = models.CharField(max_length=50)
    guests = models.IntegerField()
    table_number = models.IntegerField()
    special_requests = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Confirmed')

    def __str__(self):
        return f"Table {self.table_number} - {self.customer_name} on {self.date}"
