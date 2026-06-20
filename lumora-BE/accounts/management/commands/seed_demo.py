import os

from django.core.management.base import BaseCommand

from accounts.models import User


class Command(BaseCommand):
    help = 'Create a demo account from DEMO_EMAIL / DEMO_PASSWORD env vars.'

    def handle(self, *args, **options):
        email = os.environ.get('DEMO_EMAIL')
        password = os.environ.get('DEMO_PASSWORD')
        if not email or not password:
            self.stdout.write('DEMO_EMAIL/DEMO_PASSWORD not set — skipping demo seed.')
            return

        if User.objects.filter(email__iexact=email).exists():
            self.stdout.write(f'Demo account {email} already exists.')
            return

        User.objects.create_user(
            identifier=email,
            password=password,
            full_name='Lumora Demo',
        )
        self.stdout.write(self.style.SUCCESS(f'Created demo account: {email} / {password}'))
