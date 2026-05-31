# Job Portal Monorepo

A multi-client job portal with Django/Wagtail backend, Next.js marketing site, Expo mobile app, and Refine ops admin.

## Architecture

| App | Path | URL (local) | Purpose |
|-----|------|-------------|---------|
| Backend | `backend/` | http://localhost:8000 | Django API, JWT auth, Wagtail CMS |
| Frontend | `frontend/` | http://localhost:3000 | Next.js landings, blog, job listings |
| Admin | `admin/` | http://localhost:5173 | Refine ops panel (staff only) |
| Mobile | `mobile/` | Expo dev server | React Native app (iOS/Android) |

## Prerequisites

- Python 3.12+
- Node.js 20+
- PostgreSQL 14+ (Homebrew: `brew install postgresql@16`)

## Quick Start

### 1. Database

```bash
brew services start postgresql@16   # if not running
createdb jobportal
```

### 2. Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py create_staff_user   # admin / admin123
python manage.py seed_jobs
python manage.py setup_wagtail
python manage.py runserver
```

**Endpoints:**

- API: http://localhost:8000/api/v1/
- Wagtail CMS: http://localhost:8000/admin/
- Wagtail API: http://localhost:8000/api/v2/pages/

**Demo accounts:**

| User | Password | Role |
|------|----------|------|
| `admin` | `admin123` | Staff (Refine admin) |
| `demo_employer` | `password123` | Employer |

### 3. Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000

### 4. Refine Admin

```bash
cd admin
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173 and sign in with `admin@example.com` / `admin123`.

### 5. Mobile (Expo)

```bash
cd mobile
npm install
cp .env.example .env
npx expo start
```

- **Simulator:** `EXPO_PUBLIC_API_URL=http://localhost:8000` works for iOS Simulator.
- **Physical device:** Use your machine's LAN IP, e.g. `EXPO_PUBLIC_API_URL=http://192.168.1.10:8000`.

## Environment Variables

See [`.env.example`](.env.example) for all variables. Each app has its own `.env.example` file.

## Project Structure

```
jobportal/
├── backend/          # Django + Wagtail + DRF + JWT
│   ├── accounts/     # Custom User model, auth endpoints
│   ├── jobs/         # Job & Application models + API
│   └── blog/         # Wagtail blog pages + SEO
├── frontend/         # Next.js + Tailwind
├── admin/            # Refine + Ant Design
└── mobile/           # Expo + expo-router
```

## API Overview

### Auth (JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register/` | Register (job_seeker or employer) |
| POST | `/api/v1/auth/login/` | Login → access + refresh tokens |
| POST | `/api/v1/auth/refresh/` | Refresh access token |
| GET | `/api/v1/auth/me/` | Current user (requires auth) |

### Jobs

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/jobs/` | Public (published only) |
| POST | `/api/v1/jobs/` | Employers |
| GET/PATCH/DELETE | `/api/v1/jobs/:id/` | Owner or staff |

### Applications

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/applications/` | Job seekers |
| GET | `/api/v1/applications/` | Own apps, employer (for their jobs), staff |

### Wagtail Blog

```
GET /api/v2/pages/?type=blog.BlogPage&fields=title,date,intro,seo_title,search_description
GET /api/v2/pages/?type=blog.BlogPage&slug=<slug>&fields=title,date,intro,body,seo_title,search_description
```

## Later Phases

- Blog in mobile app
- Docker Compose
- Email verification, OAuth
- CI/CD and production deploy configs
