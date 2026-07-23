# Document Management Backend

Backend API for a document management system built with **NestJS**, **TypeORM** and **PostgreSQL**. The application manages users, roles, persons and three document flows: incoming documents, internal documents and outgoing documents.

The project includes JWT authentication, role-based authorization, Swagger documentation, file upload support, pagination, filtering, multilingual validation messages and a small real-time chat module.

## Main Features

- JWT authentication with access and refresh tokens
- Role-based access control for admin, director, secretary and head of direction users
- User management with CRUD operations
- Person/entity registry used by document flows
- Incoming document management
- Internal document management
- Outgoing document management
- PDF upload and download endpoints for document attachments
- Pagination, sorting and filtering for list endpoints
- Swagger/OpenAPI documentation
- Validation and error messages in Romanian and Russian
- WebSocket-based chat messages
- Docker setup with API, PostgreSQL and pgAdmin

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** NestJS 10
- **Language:** TypeScript
- **Database:** PostgreSQL 17
- **ORM:** TypeORM 0.3
- **Authentication:** JWT + Passport
- **Validation:** class-validator, class-transformer, nestjs-i18n
- **API Documentation:** Swagger / OpenAPI
- **File Uploads:** Multer
- **Realtime:** Socket.IO
- **Containerization:** Docker and Docker Compose
- **Testing:** Jest

## Project Structure

```text
src/
  app/
    modules/
      auth/                 Authentication and token handling
      user/                 Users, roles and profile management
      person/               Persons/entities used in document flows
      entry_documents/      Incoming documents
      internal_documents/   Internal documents
      exit_documents/       Outgoing documents
      file_management/      File handling logic
      chat/                 WebSocket chat module
    guards/                 JWT and roles guards
    common/                 Shared decorators, enums and interfaces
  config/                   Application configuration
  database/                 TypeORM database configuration
  docs/                     Swagger configuration
  i18n/                     Romanian and Russian translations
  seeds/                    Demo data seeders
test/                       End-to-end tests
```

## API Documentation

Swagger is available after the application starts:

```text
http://localhost:4200/api/docs
```

The global API prefix is:

```text
/api
```

## Demo Accounts

After running the seed command, these demo accounts can be used in Swagger:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `default.admin@example.com` | `password` |
| Director | `default.director@example.com` | `password` |

The login route also contains Swagger examples for these accounts:

```text
POST /api/auth/login
```

## Environment Variables

Create a `.env` file in the project root. For local Docker development, this configuration can be used:

```env
APP_TITLE=Document Management API
APP_TAG=Document Management
APP_PORT=4200
APP_VERSION=1.0
SWAGGER_PATH=api/docs

DB_HOST=postgres
DB_PORT=5432
DB_NAME=doc_management
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB=postgres

PG_EMAIL=admin@example.com
PG_PASSWORD=admin

CORS_ALLOWED_ORIGINS=http://localhost:3000

DEFAULT_APP_LANGUAGE=ro

ACCESS_TOKEN_EXPIRE=15m
ACCESS_TOKEN_KEY=replace_with_access_secret
REFRESH_TOKEN_EXPIRE=7d
REFRESH_TOKEN_KEY=replace_with_refresh_secret
REFRESH_TOKEN_COOKIES=refreshToken

ENTRY_DOCUMENTS_UPLOAD_DEST=uploads/entry_documents
INTERNAL_DOCUMENTS_UPLOAD_DEST=uploads/internal_documents
EXIT_DOCUMENTS_UPLOAD_DEST=uploads/exit_documents
```

## Run With Docker

Docker Compose starts the API, PostgreSQL and pgAdmin.

```bash
docker compose up --build
```

Services:

| Service | URL |
| --- | --- |
| API | `http://localhost:4200` |
| Swagger | `http://localhost:4200/api/docs` |
| PostgreSQL | `localhost:5555` |
| pgAdmin | `http://localhost:7777` |

To stop the services:

```bash
docker compose down
```

## Run Locally Without Docker

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn start:dev
```

Make sure PostgreSQL is running and the database variables in `.env` point to your local database.

## Database And Demo Data

Run the seed command to insert demo users, persons and documents:

```bash
yarn run:seed
```

When using Docker, run the command inside the application container:

```bash
docker compose exec app yarn run:seed
```

The seeders create demo data for:

- users
- persons
- incoming documents
- internal documents
- outgoing documents

## Useful Commands

```bash
yarn build
yarn start
yarn start:dev
yarn test
yarn test:e2e
yarn lint
```

## Migrations

Available migration commands:

```bash
MIGRATION_NAME=init yarn migration:generate
MIGRATION_NAME=init yarn migration:create
yarn migration:apply
yarn migration:revert
```

## Recommended Swagger Test Flow

For a short demo or portfolio video, test the API in this order:

1. `POST /api/auth/login`
2. Authorize Swagger with the returned `accessToken`
3. `GET /api/auth/me`
4. `GET /api/user/list`
5. `GET /api/person/list`
6. `GET /api/entry-documents/list`
7. `GET /api/internal-documents/list`
8. `GET /api/exit-documents/list`
9. `GET /api/entry-documents/{id}`
10. `POST /api/auth/logout`

This demonstrates authentication, authorization, user roles, pagination and all main document modules without making the demo too long.

## Production Build

Build the application:

```bash
yarn build
```

Start the compiled application:

```bash
yarn start:prod
```

Build and run the production Docker image:

```bash
docker build -f Dockerfile.prod -t document-management-backend .
docker run --env-file .env -p 4200:4200 document-management-backend
```
