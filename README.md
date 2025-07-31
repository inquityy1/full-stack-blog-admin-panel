# Blog Admin Panel

A **full-stack blog admin panel** built with **Nest.js**, **Prisma**, **PostgreSQL**, and **Next.js**, featuring **JWT authentication**, CRUD functionality, and **automated tests**.

---

## Features

- **Secure Login** with JWT authentication
- **Admin Dashboard** with full **CRUD** for blog posts
- **Responsive UI** styled with `styled-components`
- **Protected Routes** for authorized users
- **Automated Testing**
- **Unit tests** (Jest) for backend
- **E2E tests** (Playwright) for full user flow

---

## Tech Stack

- **Backend:** [Nest.js](https://nestjs.com/), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/)
- **Frontend:** [Next.js](https://nextjs.org/), [styled-components](https://styled-components.com/)
- **Authentication:** JWT
- **Testing:** Jest (backend), Playwright (frontend)

---

## Architecture Overview

```text
project-root/
├── blog-api/ # Backend (Nest.js + Prisma)
│ ├── src/
│ │ ├── posts/ # Posts module (CRUD)
│ │ ├── auth/ # Auth module (JWT)
│ │ └── main.ts
│ └── prisma/
│ └── schema.prisma
├── blog-frontend/ # Frontend (Next.js)
│ ├── src/
│ │ ├── app/ # Pages (/login, /dashboard)
│ │ ├── components/
│ │ └── lib/api.ts
└── tests/ # Playwright E2E tests
```

---

## Installation & Setup

### 1. Clone Repo

```
git clone https://github.com/inquityy1/full-stack-blog-admin-panel.git
```

---

### 2. Backend Setup

```
cd blog-api
npm install
```

Create .env in blog-api/:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/blog-admin-panel?schema=public"
JWT_SECRET="your-secret-key"
```

Run Prisma migrations:

```
npx prisma migrate dev --name init
```

Start backend:

```
npm run start:dev
```

---

### 3. Frontend Setup

```
cd ../blog-frontend
npm install
```

Start Frontend

```
npm run dev
```

Frontend runs on: http://localhost:3001

---

## Authentication

Login Endpoint: POST /auth/login

Credentials:

```json
{
  "username": "admin",
  "password": "password"
}
```

Response:

```json
{
  "access_token": "your.jwt.token"
}
```

---

## Testing

### Backend (Unit)

Run unit tests:

```
cd blog-api
npm run test
```

### Frontend (Playwright)

Run E2E test for Login + Dashboard CRUD:

```
cd blog-frontend
npx playwright test
```

## API Endpoints

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| POST   | /auth/login | User login    |
| GET    | /posts      | Get all posts |
| POST   | /posts      | Create post   |
| PUT    | /posts/\:id | Update post   |
| DELETE | /posts/\:id | Delete post   |
