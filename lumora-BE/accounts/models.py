import secrets
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('Tên đăng nhập', max_length=50, unique=True, null=True, blank=True)
    full_name = models.CharField('Họ và tên', max_length=120, blank=True)
    email = models.EmailField('Email', unique=True, null=True, blank=True)
    phone = models.CharField('Số điện thoại', max_length=20, unique=True, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'Người dùng'
        verbose_name_plural = 'Người dùng'

    def __str__(self):
        return self.email or self.phone or f'user-{self.pk}'

    @property
    def identifier(self):
        return self.email or self.phone

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = None
        if not self.email:
            self.email = None
        if not self.phone:
            self.phone = None
        super().save(*args, **kwargs)


class OTP(models.Model):
    PURPOSE_RESET = 'reset'
    PURPOSE_CHOICES = [(PURPOSE_RESET, 'Đặt lại mật khẩu')]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='otps')
    code = models.CharField(max_length=6)
    purpose = models.CharField(max_length=20, choices=PURPOSE_CHOICES, default=PURPOSE_RESET)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        ordering = ['-created_at']

    @classmethod
    def issue(cls, user, purpose=PURPOSE_RESET):
        # Invalidate previous codes for this purpose.
        cls.objects.filter(user=user, purpose=purpose, is_used=False).update(is_used=True)
        code = f'{secrets.randbelow(10000):04d}'
        ttl = getattr(settings, 'OTP_TTL_MINUTES', 5)
        return cls.objects.create(
            user=user,
            code=code,
            purpose=purpose,
            expires_at=timezone.now() + timedelta(minutes=ttl),
        )

    @property
    def is_valid(self):
        return not self.is_used and timezone.now() < self.expires_at


class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reset_tokens')
    token = models.CharField(max_length=64, unique=True, db_index=True)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    @classmethod
    def issue(cls, user):
        ttl = getattr(settings, 'RESET_TOKEN_TTL_MINUTES', 10)
        return cls.objects.create(
            user=user,
            token=secrets.token_urlsafe(32),
            expires_at=timezone.now() + timedelta(minutes=ttl),
        )

    @property
    def is_valid(self):
        return not self.is_used and timezone.now() < self.expires_at
