import re

from django.contrib.auth.base_user import BaseUserManager

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

    def _unique_username(self, base):
        username = base
        counter = 1
        while self.filter(username=username).exists():
            username = f'{base}{counter}'
            counter += 1
        return username

    def _create(self, identifier, password, **extra):
        if not identifier:
            raise ValueError('Cần email hoặc số điện thoại.')
        identifier = identifier.strip()
        if looks_like_email(identifier):
            email = self.normalize_email(identifier).lower()
            extra['email'] = email
            if not extra.get('username'):
                extra['username'] = self._unique_username(email.split('@')[0])
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

    def create_superuser(self, email=None, password=None, **extra):
        extra.setdefault('is_staff', True)
        extra.setdefault('is_superuser', True)
        if extra.get('is_staff') is not True:
            raise ValueError('Superuser phải có is_staff=True.')
        if extra.get('is_superuser') is not True:
            raise ValueError('Superuser phải có is_superuser=True.')
        if not email:
            raise ValueError('Superuser cần có email.')
        return self._create(email, password, **extra)

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
