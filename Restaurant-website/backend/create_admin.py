import os
import sys
import traceback
sys.path.insert(0, r'd:\Freelancing prrojects\Restaurant prj\projrct\Restaurant-website\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()
from django.contrib.auth import get_user_model

User = get_user_model()
username = os.getenv('ADMIN_USERNAME', 'admin')
email = os.getenv('ADMIN_EMAIL', 'admin@brewbros.com')
password = os.getenv('ADMIN_PASSWORD', 'admin123')

try:
    exists = User.objects.filter(username=username).exists()
    print(f'admin exists: {exists} (username={username})')
    if not exists:
        User.objects.create_superuser(username, email, password)
        print('created')
    else:
        print('already exists')
    print('done')
except Exception:
    print('ERROR')
    traceback.print_exc()

