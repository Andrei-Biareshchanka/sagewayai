# SagewayAI

> The daily parable that resonates

A parable library organized by category. Every day a new random parable appears on the home page. Users can subscribe and receive it by email.

[![CI](https://github.com/Andrei-Biareshchanka/sagewayai/actions/workflows/ci.yml/badge.svg)](https://github.com/Andrei-Biareshchanka/sagewayai/actions/workflows/ci.yml)
[![Deploy](https://github.com/Andrei-Biareshchanka/sagewayai/actions/workflows/deploy.yml/badge.svg)](https://github.com/Andrei-Biareshchanka/sagewayai/actions/workflows/deploy.yml)

## Stack

| Part | Technologies |
|------|-------------|
| Client | React 18 + Vite + Tailwind CSS |
| Server | Express + Prisma + PostgreSQL |
| Auth | JWT + bcrypt |
| Email | Resend |
| Database | Neon (PostgreSQL) |
| Deploy | Vercel (client) + Render (server) |

## Development

```bash
# Start PostgreSQL
docker-compose up -d

# Server (port 3001)
cd server && npm run dev

# Client (port 5173)
cd client && npm run dev
```

## API

```
GET /api/parables           # list parables (?category, ?page)
GET /api/parables/daily     # parable of the day
GET /api/parables/:id       # single parable
GET /api/categories         # all categories
GET /api/health             # health check
```
