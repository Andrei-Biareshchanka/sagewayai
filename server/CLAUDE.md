# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the **server** (backend) of SagewayAI.

> Coding style, naming, and TypeScript conventions: see **[CONVENTIONS.md](../CONVENTIONS.md)**.

## Stack

- Node.js + Express 5 + TypeScript 6
- Prisma 7 ORM + PostgreSQL
- Zod 4 for request validation
- bcryptjs + jsonwebtoken for auth (v2)
- Resend for email (v2)
- Vitest for tests

## Commands

```bash
npm run dev          # ts-node-dev hot reload on :3001
npm run build        # tsc → dist/
npm start            # node dist/index.js
npm test             # vitest run
npm run test:watch   # vitest watch

npx vitest run src/path/to/test.ts   # single file
npx prisma migrate dev --name <name>
npx prisma studio                    # visual DB browser :5555
npx prisma db seed                   # seed categories + parables
npx tsc --noEmit                     # type-check
```

## Project structure

```
src/
├── index.ts           # Express app entry
├── routes/
│   ├── parables.ts    # GET /api/parables, /api/parables/daily, /api/parables/:id
│   └── categories.ts  # GET /api/categories
├── middleware/        # error handling, validation
├── services/          # business logic (no Express types)
└── lib/
    ├── prisma.ts      # shared PrismaClient instance
    └── daily.ts       # daily parable selection logic
```

## Prisma notes

Using **Prisma 7** — `prisma.config.ts` at server root. Schema at `prisma/schema.prisma`.

Always import the shared instance — never instantiate inline:

```ts
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

After schema change: `npx prisma migrate dev --name <name>` then `npx prisma generate`.

## Data models (v1)

| Model | Key fields |
|---|---|
| `Parable` | `id`, `title`, `content`, `moral`, `source?`, `readTime`, `categoryId` |
| `Category` | `id`, `name`, `slug`, `color?`, `parablesCount` |
| `DailyParable` | `id`, `parableId`, `date` (unique per day) |

Seed categories: Wisdom, Motivation, Leadership, Journey, Loss, Risk, Trust, Meaning

## Daily parable logic (`src/lib/daily.ts`)

Each day a random parable is selected and stored in `DailyParable`. On request:
1. Check if today's date has a record in `DailyParable`
2. If yes — return that parable
3. If no — pick random `Parable`, create `DailyParable` record, return it

## Request validation

Zod at the route level before passing to services:

```ts
const querySchema = z.object({
  category: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
});
```

## Error handling

All async route handlers wrapped in try/catch. Central error middleware in `src/middleware/errorHandler.ts`.
