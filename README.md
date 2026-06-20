# Lumora — AI Live Website Platform

Monorepo cho dự án **Lumora**.

```
lumora/
├── lumora-FE/   # Frontend — React + Vite (Đăng nhập, Quên mật khẩu, OTP, Đặt lại mật khẩu, Trang chủ)
└── lumora-BE/   # Backend  — Django + DRF + PostgreSQL + Docker
```

## Các trang đã có (Frontend)

| Trang | Đường dẫn | Mô tả |
|------|-----------|------|
| Đăng nhập | `/login` | Email/SĐT + mật khẩu |
| Quên mật khẩu | `/forgot-password` | Gửi mã OTP |
| Nhập mã OTP | `/verify-otp` | 4 ô OTP + đếm ngược gửi lại |
| Tạo mật khẩu mới | `/reset-password` | Đặt lại mật khẩu |
| Trang chủ | `/` | Dashboard sau khi đăng nhập (route được bảo vệ) |

Giao diện responsive cho **mobile / tablet / PC**, theo đúng thiết kế Figma (nền tối, nút vàng, minh hoạ tím).

---

## 1) Chạy Backend (Docker — khuyến nghị)

```bash
cd lumora-BE
cp .env.example .env      # đã có sẵn .env mặc định
docker compose up --build
```

- API: `http://localhost:8000/api/`
- Khi khởi động sẽ tự tạo tài khoản demo: **demo@lumora.app / lumora123**
- Mã OTP (khi Quên mật khẩu) được in ra **log của container backend**.

## 2) Chạy Frontend

```bash
cd lumora-FE
yarn
yarn dev
```

Mở `http://localhost:5173`. Vite đã proxy `/api` → `http://localhost:8000`, nên không cần cấu hình thêm.

---

Chi tiết từng phần xem `lumora-FE/README.md` và `lumora-BE/README.md`.
