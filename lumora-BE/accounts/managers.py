import re

from django.contrib.auth.base_user import BaseUserManager
from django.db.models import Q

EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')


def looks_like_email(value: str) -> bool:
    return bool(EMAIL_RE.match((value or '').strip()))


def normalize_phone(value: str) -> str:
    """Keep a leading + and digits only."""
    value = (value or '').strip()
    plus = value.startswith('+')
    digits = re.sub(r'\D', '', value)
    return ('+' + digits) if plus else digits


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create(self, identifier, password, **extra):
        if not identifier:
            raise ValueError('Cần email hoặc số điện thoại.')
        identifier = identifier.strip()
        if looks_like_email(identifier):
            extra['email'] = self.normalize_email(identifier).lower()
        else:
            extra['phone'] = normalize_phone(identifier)
        user = self.model(**extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, identifier=None, password=None, **extra):
        extra.setdefault('is_staff', False)
        extra.setdefault('is_superuser', False)
        return self._create(identifier, password, **extra)

    def create_superuser(self, username=None, password=None, **extra):
        extra.setdefault('is_staff', True)
        extra.setdefault('is_superuser', True)
        if extra.get('is_staff') is not True:
            raise ValueError('Superuser phải có is_staff=True.')
        if extra.get('is_superuser') is not True:
            raise ValueError('Superuser phải có is_superuser=True.')
        if not username:
            raise ValueError('Cần tên đăng nhập.')
        user = self.model(username=username, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def get_by_identifier(self, identifier):
        identifier = (identifier or '').strip()
        if looks_like_email(identifier):
            return self.get(email__iexact=self.normalize_email(identifier))
        return self.get(phone=normalize_phone(identifier))

    def find_by_identifier(self, identifier):
        try:
            return self.get_by_identifier(identifier)
        except self.model.DoesNotExist:
            return None
