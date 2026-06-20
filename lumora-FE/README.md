# lumora-FE

Frontend của Lumora — **React 18 + Vite + React Router**.

## Cài đặt & chạy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build production -> dist/
npm run preview  # xem thử bản build
```

## Cấu trúc

```
src/
├── assets/illustration.svg     # minh hoạ thương mại (tím) cạnh form
├── components/
│   ├── AuthLayout.jsx          # khung trang auth (topbar + minh hoạ + form)
│   ├── Brand.jsx               # logo LUMORA
│   └── icons.jsx               # icon mắt / refresh
├── pages/
│   ├── Login.jsx               # /login
│   ├── Register.jsx            # /register
│   ├── ForgotPassword.jsx      # /forgot-password
│   ├── VerifyOtp.jsx           # /verify-otp
│   ├── ResetPassword.jsx       # /reset-password
│   └── Home.jsx                # /  (dashboard, route bảo vệ)
├── services/api.js             # axios + lưu JWT + các endpoint auth
├── styles/                     # global.css, auth.css, home.css
├── App.jsx                     # định tuyến
└── main.jsx
```

## Kết nối Backend

Mặc định gọi `/api` và được Vite proxy sang `http://localhost:8000` (xem `vite.config.js`).
Để trỏ tới host khác, tạo file `.env`:

```
VITE_API_BASE=https://api.your-domain.com/api
```

## Luồng xác thực

1. **Đăng nhập** → `POST /api/auth/login/` → lưu `access` + `refresh` vào `localStorage`.
2. **Quên mật khẩu** → `POST /api/auth/forgot-password/` → chuyển sang trang OTP.
3. **Nhập OTP** → `POST /api/auth/verify-otp/` → nhận `reset_token`.
4. **Tạo mật khẩu mới** → `POST /api/auth/reset-password/` → quay lại đăng nhập.

> Ảnh minh hoạ là SVG tự dựng để khớp tông thiết kế. Có thể thay bằng ảnh export từ Figma:
> đặt file vào `src/assets/` rồi sửa import trong `src/components/AuthLayout.jsx`.
