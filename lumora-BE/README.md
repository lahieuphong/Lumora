# lumora-BE

Backend của Lumora — **Django 5 + Django REST Framework + PostgreSQL + Docker**, xác thực bằng **JWT** (SimpleJWT).

## Chạy bằng Docker (khuyến nghị)

```bash
cp .env.example .env
docker compose up --build
```

- API gốc: `http://localhost:8000/api/`
- Tự động `migrate`, `collectstatic`, và tạo tài khoản demo **demo@lumora.app / lumora123**.
- PostgreSQL chạy trong service `db` (cổng 5432).

## Chạy thủ công (không Docker)

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# cần một PostgreSQL đang chạy; chỉnh POSTGRES_* trong .env, đặt POSTGRES_HOST=localhost
python manage.py migrate
python manage.py seed_demo            # tuỳ chọn: tạo tài khoản demo
python manage.py createsuperuser      # tuỳ chọn: vào /admin
python manage.py runserver
```

## API

Base URL: `/api/auth/`

| Method | Endpoint | Body | Mô tả |
|-------|----------|------|------|
| POST | `register/` | `full_name?, identifier, password` | Đăng ký, trả về `access` + `refresh` + `user` |
| POST | `login/` | `identifier, password` | Đăng nhập (email **hoặc** SĐT) |
| POST | `forgot-password/` | `identifier` | Tạo & gửi mã OTP (in ra log) |
| POST | `verify-otp/` | `identifier, code` | Xác thực OTP → trả `reset_token` |
| POST | `reset-password/` | `reset_token, password` | Đặt lại mật khẩu |
| POST | `token/refresh/` | `refresh` | Làm mới `access` token |
| GET | `me/` | — | Thông tin người dùng (cần `Authorization: Bearer <access>`) |

`GET /api/health/` để kiểm tra trạng thái.

- `identifier` = email (vd `a@b.com`) hoặc số điện thoại (vd `0901234567`). Hệ thống tự nhận diện.
- OTP gồm 4 chữ số, hết hạn sau `OTP_TTL_MINUTES` phút (mặc định 5).
- `reset_token` hết hạn sau `RESET_TOKEN_TTL_MINUTES` phút (mặc định 10).

### Thử nhanh luồng quên mật khẩu

```bash
curl -X POST localhost:8000/api/auth/forgot-password/ \
  -H "Content-Type: application/json" -d '{"identifier":"demo@lumora.app"}'
# -> xem mã OTP ở log container backend: [LUMORA OTP] demo@lumora.app -> 1234
```

## Cấu trúc

```
lumora-BE/
├── lumora/            # settings, urls, wsgi, asgi
├── accounts/          # app người dùng
│   ├── models.py      # User (email/phone), OTP, PasswordResetToken
│   ├── managers.py    # nhận diện email vs SĐT
│   ├── serializers.py
│   ├── views.py       # register/login/forgot/verify/reset/me
│   ├── urls.py
│   ├── admin.py
│   ├── migrations/0001_initial.py
│   └── management/commands/seed_demo.py
├── manage.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── entrypoint.sh
└── .env.example
```

> Gửi email thật: đổi `EMAIL_BACKEND` sang SMTP và thêm cấu hình `EMAIL_HOST/EMAIL_HOST_USER/...`
> trong `.env` (mặc định dùng console backend để in OTP ra log khi phát triển).
