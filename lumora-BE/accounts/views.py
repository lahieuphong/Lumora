from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .email import deliver_otp
from .models import OTP, PasswordResetToken, User
from .serializers import (
    ForgotPasswordSerializer,
    LoginSerializer,
    RegisterSerializer,
    ResetPasswordSerializer,
    UserSerializer,
    VerifyOtpSerializer,
)


def tokens_for(user):
    refresh = RefreshToken.for_user(user)
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': UserSerializer(user).data,
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(tokens_for(user), status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        identifier = serializer.validated_data['identifier']
        password = serializer.validated_data['password']

        user = User.objects.find_by_identifier(identifier)
        if user is None or not user.check_password(password):
            return Response(
                {'detail': 'Email/số điện thoại hoặc mật khẩu không đúng.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        if not user.is_active:
            return Response(
                {'detail': 'Tài khoản đã bị khoá.'},
                status=status.HTTP_403_FORBIDDEN,
            )
        return Response(tokens_for(user))


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        identifier = serializer.validated_data['identifier']

        user = User.objects.find_by_identifier(identifier)
        if user is not None:
            otp = OTP.issue(user)
            deliver_otp(user, otp.code)

        # Do not reveal whether the account exists.
        return Response({'detail': 'Nếu tài khoản tồn tại, mã OTP đã được gửi.'})


class VerifyOtpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        identifier = serializer.validated_data['identifier']
        code = serializer.validated_data['code']

        invalid = Response(
            {'detail': 'Mã OTP không đúng hoặc đã hết hạn.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

        user = User.objects.find_by_identifier(identifier)
        if user is None:
            return invalid

        otp = (
            OTP.objects.filter(user=user, code=code, purpose=OTP.PURPOSE_RESET)
            .order_by('-created_at')
            .first()
        )
        if otp is None or not otp.is_valid:
            return invalid

        otp.is_used = True
        otp.save(update_fields=['is_used'])

        reset = PasswordResetToken.issue(user)
        return Response({'reset_token': reset.token})


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['reset_token']
        password = serializer.validated_data['password']

        reset = PasswordResetToken.objects.filter(token=token).first()
        if reset is None or not reset.is_valid:
            return Response(
                {'detail': 'Liên kết đặt lại đã hết hạn. Vui lòng thử lại.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = reset.user
        user.set_password(password)
        user.save(update_fields=['password'])

        reset.is_used = True
        reset.save(update_fields=['is_used'])

        return Response({'detail': 'Đặt lại mật khẩu thành công.'})


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
