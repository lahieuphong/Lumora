# Lumora — AI Live Website Platform

Monorepo cho dự án **Lumora**.

```
lumora/
├── lumora-FE/   # Frontend — React + Vite (Đăng nhập, Quên mật khẩu, OTP, Đặt lại mật khẩu, Trang chủ)
└── lumora-BE/   # Backend  — Django + DRF + PostgreSQL + Docker
```

---

## Hướng dẫn chạy Lumora

Mở **2 terminal song song** — một cho BE, một cho FE.

---

### Terminal 1 — Backend (Docker)

```bash
cd lumora-BE
```

Lần đầu tiên, copy file env:

```bash
copy .env.example .env
```

Chạy Docker (build + migrate + tạo tài khoản demo tự động):

```bash
docker compose up --build
```

> Lần sau (không cần build lại) thì chỉ cần: `docker compose up`

Kiểm tra BE đã chạy chưa: mở browser vào `http://localhost:8000/api/health/`

---

### Terminal 2 — Frontend (Yarn)

```bash
cd lumora-FE
```

Lần đầu tiên, cài dependencies:

```bash
yarn install
```

Chạy dev server:

```bash
yarn dev
```

Mở browser vào `http://localhost:5173`

---

### Tài khoản demo để test

| Field | Giá trị |
|-------|---------|
| Email | `demo@lumora.app` |
| Password | `lumora123` |

---

### Lưu ý

- **Phải chạy BE trước** (FE gọi API về `localhost:8000`).
- Docker cần đang chạy trên máy — kiểm tra bằng `docker info`.
- OTP quên mật khẩu sẽ in ra **log của terminal BE** (không gửi email thật).