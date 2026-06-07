from django.core.management.base import BaseCommand
from api.models import Category, MenuItem

class Command(BaseCommand):
    help = 'seeds the database with BREW BROS initial data using local assets'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding updated menu data with local images...')
        
        # Clear existing data
        Category.objects.all().delete()
        MenuItem.objects.all().delete()

        # --- CATEGORIES ---
        cat_starters = Category.objects.create(
            name="Starters (ಪ್ರಾರಂಭ)", 
            image_url="/images/menu/paneer_tikka.jfif"
        )
        cat_main = Category.objects.create(
            name="Pot Specialties (ಹಟ್ಟಿ ವಿಶೇಷ)", 
            image_url="/images/menu/paneer_biryani.jfif"
        )
        cat_famous = Category.objects.create(
            name="BREW BROS Famous (ಬ್ರೂ ಬ್ರೋಸ್ ಫೇಮಸ್)", 
            image_url="/images/menu/kobri_mittai.jpg"
        )
        cat_sweets = Category.objects.create(
            name="Traditional Sweets (ಸಿಹಿ ತಿಂಡಿ)", 
            image_url="/images/menu/gulab_jamun.webp"
        )
        cat_drinks = Category.objects.create(
            name="Juices & Mocktails (ಪಾನೀಯಗಳು)", 
            image_url="/images/menu/pineapple_juice.jfif"
        )
        cat_shakes = Category.objects.create(
            name="Shakes & Ice Creams (ಶೇಕ್ಸ್ ಮತ್ತು ಐಸ್ ಕ್ರೀಮ್)", 
            image_url="/images/menu/oreo_shake.jpeg"
        )

        # --- STARTERS ---
        starters = [
            ("Veg Spring Rolls", "/images/menu/spring_rolls.jfif", 140.00, False),
            ("Paneer Tikka", "/images/menu/paneer_tikka.jfif", 180.00, True),
            ("Bruschetta", "/images/menu/bruschetta.jfif", 160.00, False),
            ("Stuffed Mushrooms", "/images/menu/stuffed_mushrooms.jfif", 170.00, False),
            ("Cheese Balls", "/images/menu/cheese_balls.jfif", 150.00, False),
            ("Garlic Bread", "/images/menu/garlic_bread.jfif", 90.00, False),
        ]
        for name, img, price, spicy in starters:
            MenuItem.objects.create(category=cat_starters, name=name, description=f"Handcrafted {name} served with traditional chutney.", price=price, is_spicy=spicy, image_url=img)

        # --- POT SPECIALTIES (Main Menu) ---
        main_course = [
            ("Paneer Biryani (Pot)", "/images/menu/paneer_biryani.jfif", 220.00, True),
            ("Mushroom Biryani (Pot)", "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=60", 210.00, True),
            ("Malai Paneer Tadka", "/images/menu/malai_paneer_tadka.jfif", 240.00, False),
            ("Baby Corn Masala", "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60", 190.00, True),
            ("Peri Peri Corn Fries", "/images/menu/corn_fries.jfif", 120.00, True),
            ("Mushroom Cheese Shawarma", "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=500&q=60", 160.00, False),
            ("Paneer Cheese Shawarma", "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=60", 170.00, False),
            ("Veg Shawarma", "/images/menu/shawarma_veg.jpeg", 140.00, False),
        ]
        for name, img, price, spicy in main_course:
            MenuItem.objects.create(category=cat_main, name=name, description="A specialty prepared in our authentic village clay pots.", price=price, is_spicy=spicy, image_url=img)

        # --- BREW BROS FAMOUS ---
        famous = [
            ("Kobri Mittai", "/images/menu/kobri_mittai.jpg", 100.00, False),
            ("Halkova", "/images/menu/halkova.jpg", 120.00, False),
        ]
        for name, img, price, spicy in famous:
            MenuItem.objects.create(category=cat_famous, name=name, description="A beloved local favorite made with age-old recipes.", price=price, is_spicy=spicy, image_url=img)

        # --- SWEETS ---
        sweets = [
            ("Kunafa", "/images/menu/kunafa.jfif", 250.00, False),
            ("Rasmalai", "/images/menu/rasmalai.jfif", 140.00, False),
            ("Kaju Katli", "/images/menu/kaju_katli.jfif", 180.00, False),
            ("Basundhi", "/images/menu/basundhi.jpg", 120.00, False),
            ("Rabdi", "/images/menu/rabdi.jpg", 110.00, False),
            ("Gulab Jamun", "/images/menu/gulab_jamun.webp", 90.00, False),
        ]
        for name, img, price, spicy in sweets:
            MenuItem.objects.create(category=cat_sweets, name=name, description="Pure traditional sweetness served in earthen bowls.", price=price, is_spicy=spicy, image_url=img)

        # --- DRINKS (Juices & Mocktails) ---
        drinks = [
            ("Pineapple Juice", "/images/menu/pineapple_juice.jfif", 80.00, False),
            ("Watermelon Juice", "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=500&q=60", 70.00, False),
            ("Mango Juice", "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=60", 100.00, False),
            ("Virgin Mojito", "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60", 120.00, False),
            ("Virgin Mary", "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60", 130.00, False),
        ]
        for name, img, price, spicy in drinks:
            MenuItem.objects.create(category=cat_drinks, name=name, description="Refreshing beverages served in chilled clay mugs.", price=price, is_spicy=spicy, image_url=img)

        # --- SHAKES & ICE CREAMS ---
        shakes = [
            ("Death By Chocolate", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60", 220.00, False),
            ("Jackfruit Ice Cream", "/images/menu/jackfruit_ice_cream.jfif", 150.00, False),
        ]
        for name, img, price, spicy in shakes:
            MenuItem.objects.create(category=cat_shakes, name=name, description="Thick and creamy delights for every season.", price=price, is_spicy=spicy, image_url=img)

        self.stdout.write(self.style.SUCCESS('Successfully updated BREW BROS menu with local assets!'))
