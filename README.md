# Cafe Management System

A full-stack web application for managing cafes and employees, built with React, Node.js/Express, and PostgreSQL.

---

## Running with Docker

**Prerequisites:** Docker and Docker Compose installed.

```bash
cp .env.example .env
docker-compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:3000

The database schema and seed data are applied automatically on first run.

```bash
docker-compose down      # stop containers
docker-compose down -v   # stop and remove database volume
```

---

## Running Locally

**Prerequisites:** Node.js 22+, PostgreSQL 16.

### 1. Database

```bash
psql -U postgres -c "CREATE DATABASE cafe_manager;"
psql -U postgres -d cafe_manager -f backend/db/001_schema.sql
psql -U postgres -d cafe_manager -f backend/db/002_seed.sql
```

### 2. Backend

Create `backend/.env` (copy from `backend/.env.example` and fill in your password):

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=cafe_manager
ALLOWED_ORIGIN=http://localhost:5173
```

```bash
cd backend && npm install && npm run dev
```

### 3. Frontend

```bash
cd frontend && npm install && npm run dev
```

Frontend runs at http://localhost:5173. Set `VITE_API_BASE_URL` in `frontend/.env.local` to override the API URL.

---

## Tech Stack

| Layer    | Technologies                                    |
|----------|-------------------------------------------------|
| Frontend | React 19, Vite, TailwindCSS, Ant Design, AG Grid |
| Backend  | Node.js 22, Express 5, Awilix (DI)              |
| Database | PostgreSQL 16                                   |
