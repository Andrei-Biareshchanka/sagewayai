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

## Deployment (Railway)

`app.listen()` in `src/index.ts` binds explicitly to `0.0.0.0`, not just `PORT` — binding to the default host inside a container means Railway's healthcheck (which hits `/api/health` from outside the container's network namespace) can't reach the process, and the deploy fails with "service unavailable" / "never became healthy" even though the build succeeded.

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
├── generate-digest-titles.ts     # backfill: generates titleEn/titleRu for digests missing either
├── fix-wrong-language-titles.ts  # repair: regenerates titleRu for digests where it's null or came back in English
├── populate-digest-slugs.ts      # repopulates ALL digest slugs (resets then rebuilds) — do not run on prod without checking for already-indexed URLs first
├── check-digest-themes.ts
├── find-duplicate-parables.ts
├── generate-quotes.ts
├── seed-quotes.ts
├── seed-embeddings.ts / seed-quote-embeddings.ts  # pgvector embedding backfills
└── create-tomorrow-test.ts       # manual verification: creates one unpublished draft dated tomorrow (UTC), reusing createDigestForDate — for testing the publish-and-prepare flow without waiting for the cron
```

## Prisma notes

Using **Prisma 7** — `prisma.config.ts` at server root. Schema at `prisma/schema.prisma`.

Prisma 7 removed `url` from the schema's `datasource` block entirely — the connection URL lives only in `prisma.config.ts`'s `datasource.url`, via the `env()` helper from `prisma/config` (not raw `process.env[...]`, which is silently `undefined`-tolerant and can mask a missing variable).

**`prisma.config.ts` uses `DIRECT_URL`, not `DATABASE_URL`.** `DATABASE_URL` (used by `src/lib/prisma.ts`'s runtime `PrismaClient`) points at Neon's pooled connection (`-pooler` host, PgBouncer transaction mode) — fine for regular app queries, but `prisma migrate deploy` takes an advisory lock (`pg_advisory_lock`) that requires a session-scoped connection, which a transaction-mode pooler can't guarantee, causing `Error: P1002 ... Timed out trying to acquire a postgres advisory lock`. `DIRECT_URL` must be Neon's **direct** (non-pooled) connection string, set as its own env var on Railway — CLI commands (`migrate deploy`, `generate`, `db push`) use it via `prisma.config.ts`, while the app's runtime connection is untouched and keeps using the pooled `DATABASE_URL`.

**`Dockerfile` must `COPY prisma.config.ts ./`** in both the `builder` and `runner` stages, alongside `COPY prisma ./prisma/`. Without it, `npx prisma migrate deploy` can't find the datasource URL at all and fails with `"The datasource.url property is required in your Prisma config file when using prisma migrate deploy"` — this looks like a Prisma config/env bug ([prisma#28983](https://github.com/prisma/prisma/issues/28983) describes a similar-sounding error) but in this repo's case the real cause was simpler: the config file was just missing from the image.

Because `env("DIRECT_URL")` throws instead of returning `undefined`, both `RUN npx prisma generate` steps in the `Dockerfile` also need a placeholder `ENV DIRECT_URL=...` set beforehand — Railway only injects real env vars into the *running* container, not into the image build process, and `generate` never actually connects to the database, so a placeholder value is sufficient there. The placeholder is overridden by Railway's real env var at container runtime, which is what `migrate deploy` in `CMD` actually uses.

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
| `DailyDigest` | `id`, `date` (unique), `slug?` (unique), `titleEn?`, `titleRu?`, `quoteId`, `parableId`, `conclusionEn/Ru`, `questionEn/Ru`, `isPublished` (default `false`), `publishedAt?` |
| `SituationRequest` | `id`, `ip`, `chatId?`, `usedAt` — rate limit table for `/api/digest/situation`. Web uses IP, Telegram bot passes `chatId` so each bot user has an independent 24h limit (all bot requests share one Railway IP). |
| `TelegramSubscriber` | `id`, `chatId` (unique), `username?`, `active`, `language`, `situationUsedAt?`, `referredBy?` — owned by `telegram-bot/`; `referredBy` stores the referring subscriber's `chatId` for the referral system. |

Constraints: `DailyDigest` has `@@unique([parableId, quoteId])` — same parable+quote pair can only appear once ever.

Seed categories: Wisdom, Motivation, Leadership, Journey, Loss, Risk, Trust, Meaning

## Daily digest logic (`src/lib/dailyDigest.ts`)

Digests are created a day ahead of publication ("tomorrow's teaser") and only made visible to end users on their own day, via `isPublished`/`publishedAt`.

**`GET /api/digest/daily` → `getDailyDigest()`** — used by the Telegram bot (`web/` reads `DailyDigest` directly via its own Prisma client, not this endpoint):
1. Check if today's date has a record in `DailyDigest`.
2. If yes — auto-publish it if it isn't already (`publishDigest()`, idempotent no-op if already published). This is a safety net for when the publish-and-prepare cron missed its run: the bot shouldn't stay stuck just because the cron didn't fire.
3. If no — pick next quote (unused first, then LRU), find best matching parable via vector similarity (excluding parables already paired with this quote, and — when possible — parables used in any digest within the last 14 days), generate EN+RU reflections **and AI titles** via Claude in parallel, generate slug, create record with `isPublished: true` (this is an on-demand creation for *today*, not a draft).

**`POST /api/admin/publish-and-prepare`** (`src/routes/admin.ts`) — called by `.github/workflows/publish-digest.yml`, scheduled `0 22 * * *` UTC (01:00 Moscow time, UTC+3 no DST — deliberately anchored to the primary RU/BY audience's clock, not UTC midnight). Guarded by `x-publish-secret` header matched against `ADMIN_PUBLISH_SECRET` env var (same unauthenticated-but-secret-gated pattern as `/send-daily`).

`publishTodayAndPrepareTomorrow()` (`dailyDigest.ts`): at 22:00 UTC, `getTodayDate()` is still "today" in UTC terms, but it's already the start of MSK's *next* calendar day — so this function acts on **UTC-today + 1** (the digest to publish) and **UTC-today + 2** (the digest to prepare as a draft), not on UTC-today itself:
1. If UTC-today+1 doesn't exist yet — create **and** publish it in one step (bootstrap case, e.g. very first run ever).
2. If it exists and is unpublished — publish it (`isPublished: true`, `publishedAt: now()`).
3. If it's already published — no-op.
4. If UTC-today+2 doesn't exist — create it as an unpublished draft (`createDigestForDate(date, false)`). If it already exists — no-op (idempotent against repeated/retried cron runs).

Returns `{ published: slug | null, prepared: slug | null }`, logged by the workflow.

`createDigestForDate(date, isPublished)` — exported, generalized version of what used to be `createDigestForToday`; reused by both the lazy on-demand path and the cron, and by `scripts/create-tomorrow-test.ts` for manual verification.

### AI titles (`src/lib/anthropic.ts`)

`generateDigestTitle(quoteText, author, parableTitle, moral, theme, language)` — calls Claude (`max_tokens: 50, temperature: 0.8`) to produce a 4-7 word evocative page title capturing the unique connection between the specific quote and parable. Generated in both `'en'` and `'ru'` in parallel alongside reflections and stored as `titleEn`/`titleRu` on `DailyDigest`.

Because this is free-text LLM output (non-zero temperature), two different quote+parable pairs could otherwise land on the same or a near-identical title. `dailyDigest.ts`'s `generateUniqueTitle()` guards against **exact** duplicates: after each generation it checks `DailyDigest.titleEn`/`titleRu` for an existing exact match via `isTitleTaken()`, and regenerates up to `MAX_TITLE_ATTEMPTS` (3) times per language before giving up and accepting the last attempt (rather than blocking digest creation indefinitely). This does not catch near-duplicate/semantically-similar titles — only literal string matches.

It also sometimes ignores the Russian instruction and answers in English. `generateUniqueTitle()` checks this via `isWrongLanguage(title, language)` — `language === 'ru'` and the title contains no Cyrillic character — and retries the same way as the duplicate check (same `MAX_TITLE_ATTEMPTS` budget, language check runs first). `isWrongLanguage()` is exported so scripts can find already-broken records (`scripts/fix-wrong-language-titles.ts` regenerates only `titleRu` for digests where it's `null` or fails this check).

`generateUniqueTitle()` and its argument builder `buildTitleArgs()` are **exported** from `dailyDigest.ts` so any script that (re)generates titles reuses the same dedup guard instead of calling `generateDigestTitle()` directly (see `scripts/generate-digest-titles.ts`). `buildTitleArgs(quote, parable, language)` takes narrowed `Pick<Quote, 'text' | 'textRu' | 'author' | 'authorRu' | 'theme'>` / `Pick<Parable, 'title' | 'moral'>` types — it only reads those fields, so both the live `findParableForQuote()` match shape and a full Prisma `Parable`/`Quote` row (as used by backfill scripts) satisfy it.

**Scripts that touch shared title/digest logic should import `prisma` from `src/lib/prisma`** (the app's singleton, which self-loads env vars via `import 'dotenv/config'`) rather than constructing their own `PrismaClient` — this guarantees they see the same DB state the dedup check relies on and avoids maintaining a second connection setup.

### Slug format (`src/lib/slug.ts`)

`buildDigestSlug(prisma, parableTitle, author, theme)` — generates `{parable-title}-{author}-{theme}` (all lowercased, special chars stripped). If the base slug is taken, appends `-2`, `-3`, etc. until unique. Theme is always included when present on the quote.

### Parable exclusion & cooldown (`src/services/digest.ts`)

`findParableForQuote(quoteId)` finds the best vector-similarity match (`<=>`) via a safe `Prisma.sql` + `Prisma.join` parameterized query, excluding two sets of parables:
1. **Permanent**: parables already paired with *this specific quote* (any digest, ever) — prevents the same pair from repeating.
2. **Cooldown**: parables used in *any* digest within the last `PARABLE_COOLDOWN_DAYS` (14) — prevents the same parable resurfacing every day or two with a different quote.

If applying both exclusions leaves no candidate (small parable pool), it retries once with only the permanent exclusion — same graceful-degradation pattern as quote LRU selection, so a small library never throws `No available parable found` unnecessarily.

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
