from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django import forms

from .models import OTP, PasswordResetToken, User


class UserChangeForm(forms.ModelForm):
    username = forms.CharField(label='Tên đăng nhập', required=False)
    password = ReadOnlyPasswordHashField(label='Mật khẩu')

    class Meta:
        model = User
        fields = '__all__'

    def clean_username(self):
        username = self.cleaned_data.get('username')
        return username.strip() or None if username is not None else None

    def clean_email(self):
        email = self.cleaned_data.get('email')
        return email.strip().lower() or None if email is not None else None

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        return phone.strip() or None if phone is not None else None


class UserCreationForm(forms.ModelForm):
    username = forms.CharField(label='Tên đăng nhập', required=False)
    password1 = forms.CharField(label='Mật khẩu', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Nhập lại mật khẩu', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'phone', 'username', 'full_name')

    def clean_username(self):
        username = self.cleaned_data.get('username')
        return username.strip() or None if username is not None else None

    def clean_email(self):
        email = self.cleaned_data.get('email')
        return email.strip().lower() or None if email is not None else None

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        return phone.strip() or None if phone is not None else None

    def clean(self):
        cleaned_data = super().clean()
        if not cleaned_data.get('email') and not cleaned_data.get('phone'):
            raise forms.ValidationError('Cần nhập email hoặc số điện thoại.')
        return cleaned_data

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Hai mật khẩu không khớp.')
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
            self.save_m2m()
        return user


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    ordering = ['-date_joined']
    list_display = ['id', 'username', 'email', 'phone', 'full_name', 'is_active', 'is_staff', 'date_joined']
    list_filter = ['is_active', 'is_staff', 'is_superuser']
    search_fields = ['email', 'phone', 'full_name']
    readonly_fields = ['date_joined', 'last_login']

    fieldsets = (
        (None, {'fields': ('email', 'phone', 'password')}),
        ('Thông tin', {'fields': ('username', 'full_name',)}),
        ('Quyền', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Thời gian', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone', 'full_name', 'password1', 'password2'),
        }),
    )


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ['user', 'code', 'purpose', 'is_used', 'created_at', 'expires_at']
    list_filter = ['purpose', 'is_used']
    search_fields = ['user__email', 'user__phone']


@admin.register(PasswordResetToken)
class PasswordResetTokenAdmin(admin.ModelAdmin):
    list_display = ['user', 'is_used', 'created_at', 'expires_at']
    list_filter = ['is_used']
    search_fields = ['user__email', 'user__phone']
