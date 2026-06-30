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
    ├── daily.ts       # daily parable selection logic
    └── anthropic.ts   # Claude API helpers: generateReflection(), generateDigestTitle()
scripts/
└── generate-digest-titles.ts  # backfill: generates titleEn/titleRu for existing digests
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
| `DailyDigest` | `id`, `date` (unique), `slug?` (unique), `titleEn?`, `titleRu?`, `quoteId`, `parableId`, `conclusionEn/Ru`, `questionEn/Ru` |
| `SituationRequest` | `id`, `ip`, `chatId?`, `usedAt` — rate limit table for `/api/digest/situation`. Web uses IP, Telegram bot passes `chatId` so each bot user has an independent 24h limit (all bot requests share one Railway IP). |

Constraints: `DailyDigest` has `@@unique([parableId, quoteId])` — same parable+quote pair can only appear once ever.

Seed categories: Wisdom, Motivation, Leadership, Journey, Loss, Risk, Trust, Meaning

## Daily digest logic (`src/lib/dailyDigest.ts`)

Each day a quote+parable pair is selected and stored in `DailyDigest`. On request:
1. Check if today's date has a record in `DailyDigest`
2. If yes — return it
3. If no — pick next quote (unused first, then LRU), find best matching parable via vector similarity (excluding parables already paired with this quote), generate EN+RU reflections **and AI titles** via Claude in parallel, generate slug, create record

### AI titles (`src/lib/anthropic.ts`)

`generateDigestTitle(quoteText, author, parableTitle, moral, theme, language)` — calls Claude (`max_tokens: 50, temperature: 0.8`) to produce a 4-7 word evocative page title capturing the unique connection between the specific quote and parable. Titles are unique across digests even when parables repeat, because they reflect the quote+parable combination. Generated in both `'en'` and `'ru'` in parallel alongside reflections and stored as `titleEn`/`titleRu` on `DailyDigest`.

### Slug format (`src/lib/slug.ts`)

`buildDigestSlug(prisma, parableTitle, author, theme)` — generates `{parable-title}-{author}-{theme}` (all lowercased, special chars stripped). If the base slug is taken, appends `-2`, `-3`, etc. until unique. Theme is always included when present on the quote.

### Parable exclusion (`src/services/digest.ts`)

`findParableForQuote(quoteId)` excludes parables already paired with this quote using vector similarity (`<=>`) with a safe `Prisma.sql` + `Prisma.join` parameterized query. This prevents the same parable from repeating with the same quote across different digests.

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
