from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .managers import looks_like_email, normalize_phone
from .models import User


class UserSerializer(serializers.ModelSerializer):
    identifier = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'email', 'phone', 'identifier', 'date_joined']


class RegisterSerializer(serializers.Serializer):
    full_name = serializers.CharField(required=False, allow_blank=True, max_length=120)
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=6)

    def validate_identifier(self, value):
        value = value.strip()
        if looks_like_email(value):
            if User.objects.filter(email__iexact=value).exists():
                raise serializers.ValidationError('Email đã được sử dụng.')
        else:
            phone = normalize_phone(value)
            if not phone:
                raise serializers.ValidationError('Email hoặc số điện thoại không hợp lệ.')
            if User.objects.filter(phone=phone).exists():
                raise serializers.ValidationError('Số điện thoại đã được sử dụng.')
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated):
        return User.objects.create_user(
            identifier=validated['identifier'],
            password=validated['password'],
            full_name=validated.get('full_name', ''),
        )


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True)


class ForgotPasswordSerializer(serializers.Serializer):
    identifier = serializers.CharField()


class VerifyOtpSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    code = serializers.CharField(min_length=4, max_length=6)


class ResetPasswordSerializer(serializers.Serializer):
    reset_token = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=6)

    def validate_password(self, value):
        validate_password(value)
        return value
