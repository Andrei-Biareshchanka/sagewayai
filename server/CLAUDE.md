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

`app.listen()` in `src/index.ts` binds explicitly to a host, not just `PORT` — binding to the default host inside a container means Railway's healthcheck (which hits `/api/health` from outside the container's network namespace) can't reach the process, and the deploy fails with "service unavailable" / "never became healthy" even though the build succeeded and the process is alive (visible as nonzero CPU/memory in Railway metrics with zero request traffic).

**Binds to both `'::'` and `'0.0.0.0'`, not just one.** Whether a given host's default sysctl makes `'::'` dual-stack (covering IPv4 too) or IPv6-only (`IPV6_V6ONLY=1`) isn't something to assume — it's a host-level setting we don't control on Railway. Binding only to `'0.0.0.0'` previously left the TCP healthcheck passing (Railway's prober may reach it over IPv6) while real HTTP traffic through Railway's edge got `502 Application failed to respond`. Binding only to `'::'` didn't fix it either, which is consistent with the host *not* being dual-stack. So `src/index.ts` now listens on `'::'` first, then attempts a second explicit listener on `'0.0.0.0'` on the same port — if the host is already dual-stack this second bind fails with `EADDRINUSE`, which is caught and logged as a no-op (already covered); if the host is IPv6-only, this second bind is what actually gives IPv4 clients a path in.

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

**`railway.toml`'s `[deploy] startCommand` overrides the `Dockerfile`'s `CMD` at runtime**, even though Railway uses the Dockerfile for the build itself — don't assume the `CMD` line is what actually runs in production. `startCommand` must not call `npm start`: the `start` script in `package.json` includes `npx prisma migrate resolve --rolled-back <migration> || true`, a one-off command for recovering from a specific historical failed migration, and it can hang indefinitely in the container with no output, silently preventing the server from ever starting (all healthcheck attempts then fail with "service unavailable" even though the process is alive and consuming CPU/memory). `startCommand` runs `node dist/index.js` alone — migrations moved to `preDeployCommand` (`npx prisma migrate deploy`), Railway's dedicated pre-deploy phase, after Railway support found the deployment's own event log stopping at `DRAIN_INSTANCES` with no `START_CONTAINER`/`HEALTH_CHECK` ever firing, despite migrations completing successfully — i.e. Railway's pipeline was never transitioning from the migration step to actually starting the app, even though the exact same `&&`-chained command reliably works when run locally. Splitting the two into Railway's native separate lifecycle steps (both in `railway.toml` **and** mirrored in the Dashboard's Settings → Deploy → "Pre-Deploy Command", since Dashboard settings there take priority) works around whatever is breaking that transition for chained shell commands.

`railway.toml` has no `healthcheckPath` — the app (proven working locally against the real Neon DB, full production env vars, and the exact built image) never became reachable via Railway's HTTP healthcheck on `/api/health` despite migrations succeeding and the process staying alive (nonzero CPU/memory, zero request traffic). Removing the HTTP path and falling back to a plain TCP check confirmed the split: TCP connects fine, but real HTTP requests routed through Railway's edge still got "Application failed to respond" — an HTTP-layer-specific failure, not basic connectivity.

**`server.keepAliveTimeout`/`headersTimeout` are set explicitly** (65s/66s) on the `http.Server` returned by `app.listen()`. Node's default `keepAliveTimeout` (5s) is shorter than many reverse proxies' own idle timeout — a proxy can reuse a kept-alive connection Node has already started tearing down, producing exactly this "TCP is open but HTTP requests get no response" symptom behind a proxy like Railway's edge. `headersTimeout` must be set higher than `keepAliveTimeout` (Node requirement).

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
| `SituationRequest` | `id`, `ip`, `chatId?`, `usedAt` — 24h rate limit table for `POST /api/digest/situation`, but only written to when the request has `includeReflection: true` (Telegram bot only — passes `chatId` so each bot user has an independent limit). Web always sends `includeReflection: false` and never touches this table; see "Situation search endpoint" below. |
| `TelegramSubscriber` | `id`, `chatId` (unique), `username?`, `active`, `language`, `situationUsedAt?`, `referredBy?` — owned by `telegram-bot/`; `referredBy` stores the referring subscriber's `chatId` for the referral system. |
| `BotEvent` | `id` (autoincrement), `userId`, `event`, `meta?` (JSON), `createdAt` — owned by `telegram-bot/` (analytics events, see `telegram-bot/src/lib/analytics.ts`); indexed on `userId` and `[event, createdAt]`. Adopted into `server/`'s canonical schema and migration history 2026-07-18 — the table itself predates this and was created via `telegram-bot/`'s `prisma db push`, so its migration (`20260718000000_add_bot_event`) was adopted via `prisma migrate resolve --applied` rather than actually run. |

Constraints: `DailyDigest` has `@@unique([parableId, quoteId])` — same parable+quote pair can only appear once ever.

Seed categories: Wisdom, Motivation, Leadership, Journey, Loss, Risk, Trust, Meaning

## Situation search endpoint (`src/routes/digest.ts`)

**`POST /api/digest/situation`** — semantic search: embeds the free-text `situation` via Voyage AI, finds the nearest `Parable` and nearest `Quote` independently (two separate top-1 `<=>` queries, not a paired lookup), and optionally generates a Claude reflection on top. Body: `{ situation, lang, chatId?, includeReflection? }` (`includeReflection` defaults to `true`).

- **`includeReflection: true`** (Telegram bot — always sends this explicitly) — full flow: 24h `SituationRequest` check/write (by `chatId`, falls back to IP), then `generateReflection()` (Claude) on top of the matched quote+parable. Returns `conclusion`/`question` as strings.
- **`includeReflection: false`** (web `/[locale]/search` — always sends this) — skips the `SituationRequest` check/write entirely (no 24h limit on this path) and skips the Claude call. Returns `conclusion: null, question: null`. Instead, this path is guarded by a separate `express-rate-limit` middleware (`searchOnlyLimiter`, 20 req/min per IP, keyed via `ipKeyGenerator` on `getClientIp()`) — added because unlike the reflection path, this one has no other cost guard against repeated Voyage AI embedding calls. The limiter's `skip` option checks `req.body?.includeReflection`, so it's a no-op for the `true` path.

`getClientIp()` reads the **last** entry of `X-Forwarded-For`, not the first — Railway (the reverse proxy in front of this app) always appends the IP of whoever connected to it, so that entry can't be forged; a client can prepend arbitrary fake addresses before it, but not control what Railway itself observes. Taking the first entry would trust exactly the attacker-controlled part of the header, letting the 20 req/min limiter be bypassed by sending a different fake IP on every request. Same function backs both the 24h `SituationRequest` lookup and the new limiter.

Both paths share the same embedding + top-1 lookup logic — the flag only controls what happens *after* the match is found.

## Daily digest logic (`src/lib/dailyDigest.ts`)

Digests are created a day ahead of publication ("tomorrow's teaser") and only made visible to end users on their own day, via `isPublished`/`publishedAt`.

**`GET /api/digest/daily` → `getDailyDigest()`** — used by the Telegram bot (`web/` reads `DailyDigest` directly via its own Prisma client, not this endpoint). Response includes `slug` and a localized `title` (`titleRu`/`titleEn` with fallback to the other language if one is missing) alongside `quote`/`parable`/`conclusion`/`question` — the bot uses `slug` to link back to `/{locale}/d/{slug}` when publishing to the `@sagewayai` channel (see `telegram-bot/CLAUDE.md`):
1. Check if today's date has a record in `DailyDigest`.
2. If yes — auto-publish it if it isn't already (`publishDigest()`, idempotent no-op if already published). This is a safety net for when the publish-and-prepare cron missed its run: the bot shouldn't stay stuck just because the cron didn't fire.
3. If no — pick next quote (unused first, then cooldown-aware selection degrading to strict LRU — see below), find best matching parable via vector similarity with the same degrading-cooldown pattern (see below), generate EN+RU reflections **and AI titles** via Claude in parallel, generate slug, create record with `isPublished: true` (this is an on-demand creation for *today*, not a draft).

**`POST /api/admin/publish-and-prepare`** (`src/routes/admin.ts`) — called by `.github/workflows/publish-digest.yml`, scheduled `0 22 * * *` UTC (01:00 Moscow time, UTC+3 no DST — deliberately anchored to the primary RU/BY audience's clock, not UTC midnight). Guarded by `x-publish-secret` header matched against `ADMIN_PUBLISH_SECRET` env var (same unauthenticated-but-secret-gated pattern as `/send-daily`).

`publishTodayAndPrepareTomorrow()` (`dailyDigest.ts`): at 22:00 UTC, `getTodayDate()` is still "today" in UTC terms, but it's already the start of MSK's *next* calendar day — so this function acts on **UTC-today + 1** (the digest to publish) and **UTC-today + 2** (the digest to prepare as a draft), not on UTC-today itself:
1. If UTC-today+1 doesn't exist yet — create **and** publish it in one step (bootstrap case, e.g. very first run ever).
2. If it exists and is unpublished — publish it (`isPublished: true`, `publishedAt: now()`).
3. If it's already published — no-op.
4. If UTC-today+2 doesn't exist — create it as an unpublished draft (`createDigestForDate(date, false)`). If it already exists — no-op (idempotent against repeated/retried cron runs).

Returns `{ published: slug | null, prepared: slug | null }`, logged by the workflow.

If `publishTodayAndPrepareTomorrow()` throws (e.g. `findParableForQuote`/`pickNextQuote` exhausting every cooldown step — see "Parable exclusion & cooldown" and "Quote selection & cooldown" below), the route (`src/routes/admin.ts`) catches it, calls `notifyAdmin()` (`src/lib/adminAlert.ts`) with the error message, then rethrows — Express 5 forwards the rethrown rejection to `errorHandler`, so the HTTP response is still a 500 (the workflow's `curl -f` still fails the Actions job) but an admin also gets a heads-up instead of the failure going unnoticed until someone checks Actions manually.

`notifyAdmin()` calls the Telegram Bot API directly (`fetch` to `api.telegram.org`, not the `telegram-bot` process — they're separate deployments) using `TELEGRAM_BOT_TOKEN`/`ADMIN_CHAT_ID` env vars, the same values already configured for `telegram-bot`'s own admin notifications (see `telegram-bot/CLAUDE.md`) — not a second bot. No-ops silently if either var is unset (e.g. local dev), same guard pattern as `email.ts`'s `RESEND_API_KEY` check.

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
2. **Cooldown**: parables used in *any* digest within the last N days.

`PARABLE_COOLDOWN_STEPS = [14, 10, 7, 3, 1, 0]` — tries each window in descending order, only relaxing to a shorter one when the stricter window has zero vector-similarity candidates. This replaced a previous single-step fallback (14 days → no cooldown at all) that could silently let a parable resurface after just a few days whenever the 14-day pool happened to be exhausted for a given quote (observed in production: "Пустой трон" repeated after only 4 days). The fixed-length steps array bounds the loop to at most 6 attempts — it cannot run forever. `0` still enforces the permanent pairing exclusion, so the loop's last resort is "any parable not already paired with this quote," never "any parable at all." Throws `No available parable found` only if even that fails (every parable is already permanently paired with this exact quote — a real data problem, not a transient squeeze).

**Usage-frequency diversity penalty** (`queryBestMatch`, same file): cooldown alone only blocks *recent* repeats, not *frequent* ones over months — with only 80 parables and cosine-distance gaps between top candidates often under 0.01, a handful of "generalist" parables (broadly relevant to many themes — "The Two Wolves", "The Empty Throne") kept winning the vector-similarity ranking almost every time they were eligible, while most of the pool never got picked at all (confirmed against production 2026-07-27: 65% of parables — 52 of 80 — had zero uses across 34 digests, while the top parable had already repeated 3x). `PARABLE_USAGE_PENALTY = 0.015` is added to the ORDER BY per historical use of each candidate (`SELECT COUNT(*) FROM "DailyDigest" WHERE "parableId" = ...`), so a parable used 2x more than a rival needs roughly a 0.03 similarity edge to still win — soft-prefers less-used parables on close ties without overriding a genuinely stronger semantic match.

### Quote selection & cooldown (`src/lib/dailyDigest.ts`)

`pickNextQuote()` mirrors the parable pattern: unused quotes first (random pick), then `QUOTE_COOLDOWN_STEPS = [14, 10, 7, 3, 1]` tried in descending order (quotes used in any digest within that window are excluded), and if every step still finds zero eligible quotes, falls back to `pickLeastRecentlyUsedQuote()` — the quote from the single oldest digest (strict LRU, guaranteed to terminate: it either returns a quote or throws if the `Quote` table itself is empty). Same fixed-length-array bound as the parable steps — this can never loop indefinitely.

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
