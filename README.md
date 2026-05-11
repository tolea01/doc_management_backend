# Document Management Backend

A production-ready **NestJS + TypeORM + PostgreSQL** backend for document lifecycle management (entry, internal, and exit documents), user/auth flows, and real-time chat.

## What this project does
This backend is designed for organizations that need to manage document flow across multiple departments and users. It centralizes:
- document registration and tracking,
- status updates and filtering,
- user and role-based access,
- JWT authentication and refresh-token handling,
- file uploads for document attachments,
- real-time chat messaging,
- multilingual validation/error messages.

## Core Modules
Business logic is organized by module under `src/app/modules`:
- **Auth**: login, register, token management.
- **User**: user CRUD, password updates, roles.
- **Person**: person/entity registry used by document flows.
- **Entry Documents**: incoming documents management.
- **Internal Documents**: intra-organization document lifecycle.
- **Exit Documents**: outgoing document tracking.
- **File Management**: uploaded file handling.
- **Chat**: websocket-based messaging.

## API Behavior & Conventions
- Global API prefix: `/api`
- Swagger docs route: `/api/docs`
- CORS is configurable via environment variables.
- Input validation is enforced globally.
- Responses and validation messages support i18n resources (`ro`, `ru` by default).

## Tech Stack
- **Runtime:** Node.js 18
- **Framework:** NestJS 10
- **Database:** PostgreSQL 17
- **ORM:** TypeORM 0.3
- **API Docs:** Swagger
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions

## Project Structure
- `src/app/modules/*` — business modules (auth, users, documents, chat, etc.)
- `src/database/*` — database configuration and migration wiring
- `src/seeds/*` — seed runners and seed data
- `src/i18n/*` — translation files (messages/errors/validation)
- `Dockerfile.dev` — development image (hot reload)
- `Dockerfile.prod` — production multi-stage image
- `docker-compose.yml` — local full stack (API + Postgres + pgAdmin)

## Environment Variables
Create a `.env` file in the project root.

```env
APP_PORT=4200
CORS_ALLOWED_ORIGINS=http://localhost:3000

DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=doc_management

ACCESS_TOKEN_KEY=replace_me
ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_KEY=replace_me
REFRESH_TOKEN_EXPIRE=7d

DEFAULT_APP_LANGUAGE=en

PG_EMAIL=admin@example.com
PG_PASSWORD=admin
```

## Run Locally (without Docker)
```bash
yarn install
yarn start:dev
```

Useful commands:
```bash
yarn test
yarn test:e2e
yarn build
```

## Docker Setup

### 1) Development (hot reload)
```bash
docker compose up --build
```

Services:
- API: `http://localhost:4200`
- Swagger: `http://localhost:4200/api/docs`
- PostgreSQL: `localhost:5555`
- pgAdmin: `http://localhost:7777`

### 2) Production image
Build and run only the API image:
```bash
docker build -f Dockerfile.prod -t doc-management-backend:latest .
docker run --env-file .env -p 4200:4200 doc-management-backend:latest
```

## Database Migrations & Seeds

Generate migration:
```bash
MIGRATION_NAME=init yarn migration:generate
```

Create empty migration:
```bash
MIGRATION_NAME=init yarn migration:create
```

Apply / rollback:
```bash
yarn migration:apply
yarn migration:revert
```

Run seeds:
```bash
yarn run:seed
```

## CI/CD (GitHub Actions)
A ready-to-use pipeline is available in `.github/workflows/ci-cd.yml`:

- **CI on push/PR**
  - installs dependencies
  - lints
  - runs unit tests
  - builds app
  - builds production Docker image

- **CD on `main` branch**
  - publishes Docker image to GitHub Container Registry (`ghcr.io`)

### Required GitHub settings
1. Enable **GitHub Actions** for the repository.
2. Ensure workflow has `packages: write` permission (already declared in workflow).
3. For deployments to remote servers/cloud, add environment-specific secrets and an extra deploy job (SSH/Kubernetes/Render/Fly.io, etc.).

## API Documentation
Swagger is generated at runtime and exposed under:
- `GET /api/docs`

## License
Private / proprietary (as defined in `package.json`).
