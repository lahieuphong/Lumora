#!/usr/bin/env bash
set -e

echo "Waiting for PostgreSQL at ${POSTGRES_HOST:-db}:${POSTGRES_PORT:-5432}..."
python - <<'PY'
import os, time, socket
host = os.environ.get("POSTGRES_HOST", "db")
port = int(os.environ.get("POSTGRES_PORT", "5432"))
for _ in range(60):
    try:
        with socket.create_connection((host, port), timeout=2):
            break
    except OSError:
        time.sleep(1)
else:
    raise SystemExit("Database not reachable")
print("Database is up.")
PY

python manage.py migrate --noinput
python manage.py collectstatic --noinput || true

# Optional: seed a demo account (DEMO_EMAIL + DEMO_PASSWORD)
python manage.py seed_demo || true

if [ "${DEBUG:-True}" = "True" ]; then
  exec python manage.py runserver 0.0.0.0:8000
else
  exec gunicorn lumora.wsgi:application --bind 0.0.0.0:8000 --workers 3
fi
