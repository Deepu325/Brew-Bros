import os
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Create an admin superuser if one does not already exist.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--username',
            default=os.getenv('ADMIN_USERNAME', 'admin'),
            help='Admin username (default from ADMIN_USERNAME or admin).',
        )
        parser.add_argument(
            '--email',
            default=os.getenv('ADMIN_EMAIL', 'admin@brewbros.com'),
            help='Admin email (default from ADMIN_EMAIL or admin@brewbros.com).',
        )
        parser.add_argument(
            '--password',
            default=os.getenv('ADMIN_PASSWORD', 'admin123'),
            help='Admin password (default from ADMIN_PASSWORD or admin123).',
        )
        parser.add_argument(
            '--force',
            action='store_true',
            help='Reset password if the admin user already exists.',
        )

    def handle(self, *args, **options):
        User = get_user_model()
        username = options['username']
        email = options['email']
        password = options['password']
        force = options['force']

        if not username or not password:
            self.stderr.write(self.style.ERROR('Username and password are required.'))
            return

        user, created = User.objects.get_or_create(username=username, defaults={'email': email, 'is_staff': True, 'is_superuser': True})

        if created:
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Created superuser: {username}'))
            return

        if not user.is_superuser or not user.is_staff:
            user.is_staff = True
            user.is_superuser = True

        if force:
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Updated existing admin user and reset password: {username}'))
            return

        self.stdout.write(self.style.WARNING(f'Admin user already exists: {username}. Use --force to reset password.'))
