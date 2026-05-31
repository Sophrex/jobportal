#!/usr/bin/env python
"""Create a staff superuser for Refine admin access."""
from django.core.management.base import BaseCommand

from accounts.models import User


class Command(BaseCommand):
    help = "Create a staff superuser for admin panel access"

    def add_arguments(self, parser):
        parser.add_argument("--username", default="admin")
        parser.add_argument("--email", default="admin@example.com")
        parser.add_argument("--password", default="admin123")

    def handle(self, *args, **options):
        username = options["username"]
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            user.is_staff = True
            user.is_superuser = True
            user.role = User.Role.STAFF
            user.set_password(options["password"])
            user.save()
            self.stdout.write(self.style.WARNING(f"Updated existing user: {username}"))
        else:
            User.objects.create_superuser(
                username=username,
                email=options["email"],
                password=options["password"],
                role=User.Role.STAFF,
            )
            self.stdout.write(self.style.SUCCESS(f"Created staff user: {username}"))

        self.stdout.write(f"  Username: {username}")
        self.stdout.write(f"  Password: {options['password']}")
