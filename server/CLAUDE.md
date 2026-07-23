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
├── create-tomorrow-test.ts       # manual verification: creates one unpublished draft dated tomorrow (UTC), reusing createDigestForDate — for testing the publish-and-prepare flow without waiting for the cron
├── backfill-parable-slugs.ts     # one-time: idempotent RU→Latin transliteration + EN slugify for Parable.slugRu/slugEn, collision suffixes (-2, -3, ...)
├── backfill-parable-quotes.ts    # one-time: assigns each parable exactly 3 ParableQuote rows (position 0-2, one isPrimary) via vector similarity
├── backfill-parable-insights.ts  # batched runner: generateReviewedParableInsight + generateParableImageBrief across DRAFT parables, with a per-model cost report and reflectionStatus routing (REVIEWED/GENERATED/FAILED) — see "Canonical parable insight generation" below
└── dry-run-parable-insight.ts    # manual verification: runs the insight pipeline for a single parable, prints full generated text for review before trusting the batch runner
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
| `Parable` | `id`, `title`, `content`, `moral`, `source?`, `readTime`, `categoryId` — plus the canonical-parable fields added for the `/pritcha/[slug]` page: `slugRu?`/`slugEn?` (unique), `imageUrl?`, `imageAltRu/En?`, `imagePromptEn?`, `conclusionRu/En?` (deep reflection), `questionsRu/En?` (JSON array), `reflectionStatus` (`ReflectionStatus`, default `DRAFT`), `reflectionUpdatedAt?`. A parable is only linkable at `/pritcha/[slug]` once `reflectionStatus` reaches `REVIEWED` and both slugs are set. |
| `ParableQuote` | `id`, `parableId`, `quoteId`, `position` (0/1/2, `@@unique([parableId, position])`), `isPrimary` — join table assigning each parable exactly 3 quotes for the parable-first daily-digest pipeline (`selectDailyParable` + `findQuoteForParable`, see "Daily digest logic" below). |
| `Category` | `id`, `name`, `slug`, `color?`, `parablesCount` |
| `DailyParable` | `id`, `parableId`, `date` (unique per day) |
| `DailyDigest` | `id`, `date` (unique), `slug?` (unique), `titleEn?`, `titleRu?`, `quoteId`, `parableId`, `conclusionEn/Ru`, `questionEn/Ru`, `isPublished` (default `false`), `publishedAt?` |
| `SituationRequest` | `id`, `ip`, `chatId?`, `usedAt` — 24h rate limit table for `POST /api/digest/situation`, but only written to when the request has `includeReflection: true` (Telegram bot only — passes `chatId` so each bot user has an independent limit). Web always sends `includeReflection: false` and never touches this table; see "Situation search endpoint" below. |
| `TelegramSubscriber` | `id`, `chatId` (unique), `username?`, `active`, `language`, `situationUsedAt?`, `referredBy?` — owned by `telegram-bot/`; `referredBy` stores the referring subscriber's `chatId` for the referral system. |
| `BotEvent` | `id` (autoincrement), `userId`, `event`, `meta?` (JSON), `createdAt` — owned by `telegram-bot/` (analytics events, see `telegram-bot/src/lib/analytics.ts`); indexed on `userId` and `[event, createdAt]`. Adopted into `server/`'s canonical schema and migration history 2026-07-18 — the table itself predates this and was created via `telegram-bot/`'s `prisma db push`, so its migration (`20260718000000_add_bot_event`) was adopted via `prisma migrate resolve --applied` rather than actually run. |

`DailyDigest`'s old `@@unique([parableId, quoteId])` constraint was dropped — the parable-first pipeline deliberately rotates a parable back through the same 3 pre-assigned quotes (via `ParableQuote`) every 3rd time it's shown, which the old "each pair only once ever" constraint would have blocked.

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
3. If no — `createDigestForDate()` picks the parable and quote (parable-first pipeline — see "Daily digest parable/quote selection" below), generate EN+RU reflections **and AI titles** via Claude in parallel, generate slug, create record with `isPublished: true` (this is an on-demand creation for *today*, not a draft).

**`POST /api/admin/publish-and-prepare`** (`src/routes/admin.ts`) — called by `.github/workflows/publish-digest.yml`, scheduled `0 22 * * *` UTC (01:00 Moscow time, UTC+3 no DST — deliberately anchored to the primary RU/BY audience's clock, not UTC midnight). Guarded by `x-publish-secret` header matched against `ADMIN_PUBLISH_SECRET` env var (same unauthenticated-but-secret-gated pattern as `/send-daily`).

`publishTodayAndPrepareTomorrow()` (`dailyDigest.ts`): at 22:00 UTC, `getTodayDate()` is still "today" in UTC terms, but it's already the start of MSK's *next* calendar day — so this function acts on **UTC-today + 1** (the digest to publish) and **UTC-today + 2** (the digest to prepare as a draft), not on UTC-today itself:
1. If UTC-today+1 doesn't exist yet — create **and** publish it in one step (bootstrap case, e.g. very first run ever).
2. If it exists and is unpublished — publish it (`isPublished: true`, `publishedAt: now()`).
3. If it's already published — no-op.
4. If UTC-today+2 doesn't exist — create it as an unpublished draft (`createDigestForDate(date, false)`). If it already exists — no-op (idempotent against repeated/retried cron runs).

Returns `{ published: slug | null, prepared: slug | null }`, logged by the workflow.

If `publishTodayAndPrepareTomorrow()` throws (e.g. `selectDailyParable` exhausting every cooldown step, or `findQuoteForParable` hitting a missing `ParableQuote` row — see "Daily digest parable/quote selection" below), the route (`src/routes/admin.ts`) catches it, calls `notifyAdmin()` (`src/lib/adminAlert.ts`) with the error message, then rethrows — Express 5 forwards the rethrown rejection to `errorHandler`, so the HTTP response is still a 500 (the workflow's `curl -f` still fails the Actions job) but an admin also gets a heads-up instead of the failure going unnoticed until someone checks Actions manually.

`notifyAdmin()` calls the Telegram Bot API directly (`fetch` to `api.telegram.org`, not the `telegram-bot` process — they're separate deployments) using `TELEGRAM_BOT_TOKEN`/`ADMIN_CHAT_ID` env vars, the same values already configured for `telegram-bot`'s own admin notifications (see `telegram-bot/CLAUDE.md`) — not a second bot. No-ops silently if either var is unset (e.g. local dev), same guard pattern as `email.ts`'s `RESEND_API_KEY` check.

`createDigestForDate(date, isPublished)` — exported, generalized version of what used to be `createDigestForToday`; reused by both the lazy on-demand path and the cron, and by `scripts/create-tomorrow-test.ts` for manual verification.

### AI titles (`src/lib/anthropic.ts`)

`generateDigestTitle(quoteText, author, parableTitle, moral, theme, language)` — calls Claude (`max_tokens: 50, temperature: 0.8`) to produce a 4-7 word evocative page title capturing the unique connection between the specific quote and parable. Generated in both `'en'` and `'ru'` in parallel alongside reflections and stored as `titleEn`/`titleRu` on `DailyDigest`.

Because this is free-text LLM output (non-zero temperature), two different quote+parable pairs could otherwise land on the same or a near-identical title. `dailyDigest.ts`'s `generateUniqueTitle()` guards against **exact** duplicates: after each generation it checks `DailyDigest.titleEn`/`titleRu` for an existing exact match via `isTitleTaken()`, and regenerates up to `MAX_TITLE_ATTEMPTS` (3) times per language before giving up and accepting the last attempt (rather than blocking digest creation indefinitely). This does not catch near-duplicate/semantically-similar titles — only literal string matches.

It also sometimes ignores the Russian instruction and answers in English. `generateUniqueTitle()` checks this via `isWrongLanguage(title, language)` — `language === 'ru'` and the title contains no Cyrillic character — and retries the same way as the duplicate check (same `MAX_TITLE_ATTEMPTS` budget, language check runs first). `isWrongLanguage()` is exported so scripts can find already-broken records (`scripts/fix-wrong-language-titles.ts` regenerates only `titleRu` for digests where it's `null` or fails this check).

`generateUniqueTitle()` and its argument builder `buildTitleArgs()` are **exported** from `dailyDigest.ts` so any script that (re)generates titles reuses the same dedup guard instead of calling `generateDigestTitle()` directly (see `scripts/generate-digest-titles.ts`). `buildTitleArgs(quote, parable, language)` takes narrowed `Pick<Quote, 'text' | 'textRu' | 'author' | 'authorRu' | 'theme'>` / `Pick<Parable, 'title' | 'moral'>` types — it only reads those fields, so both the live `findParableForQuote()` match shape and a full Prisma `Parable`/`Quote` row (as used by backfill scripts) satisfy it.

**Scripts that touch shared title/digest logic should import `prisma` from `src/lib/prisma`** (the app's singleton, which self-loads env vars via `import 'dotenv/config'`) rather than constructing their own `PrismaClient` — this guarantees they see the same DB state the dedup check relies on and avoids maintaining a second connection setup.

### Canonical parable insight generation (`src/lib/anthropic.ts`)

Powers the `/pritcha/[slug]` canonical parable page (`web/`) — separate from the daily digest's own short `generateReflection()`. Produces the deep `conclusion` + 3 graduated `questions` (RU+EN) and the illustration brief stored on `Parable`.

- **`INSIGHT_LENSES`** — 7 fixed angles (`bodily`, `relational`, `threshold`, `paradox`, `retrospective`, `cost`, `witness`), each a specific instruction for where the essay's second/third level of insight anchors. `getInsightLens(parableIndexInDb)` picks `INSIGHT_LENSES[parableIndexInDb % 7]` — deterministic by the parable's position in `id ASC` order, not random, so the same parable always gets the same lens, including on a regeneration retry (a retry must fix the same essay, not roll a different one).
- **`generateParableInsight(quote, parable, language, lens)`** — Opus 4.8 (`PARABLE_INSIGHT_MODEL`), up to `MAX_GENERATION_ATTEMPTS` (3) attempts. Each attempt is validated by `findValidationIssue()` before being accepted: zod shape, `containsToolCallArtifact()` (regex-catches leaked tool-call-syntax fragments like `<parameter>`), `detectMixedScript()` (catches a single word mixing Cyrillic and Latin letters — a real defect seen in dry-run testing, distinct from legitimate whole-word language mixing). Throws `ParableInsightGenerationError` (carries `attempts` + `lastRawResponse`) only after all attempts fail, so a caller can route that parable to `reflectionStatus = FAILED` instead of crashing the whole batch.
- **`reviewDeepReflection(conclusion, questions, language)`** — Haiku-based review gate. Length bounds are deliberately wider than the generation prompt's own target (EN reject range 380-720 words vs. a 400-700 target; RU 330-620 vs. 350-600) — same "target vs. reject range" relationship as the generation length. Em-dash overuse is checked in code (`countEmDashes`, reject threshold `> 5`), not left to the LLM's judgment — an earlier version had the reviewer judge em-dash count directly and it rejected nearly an entire batch over normal prose density (Opus reliably produces ~3 per essay); the generation prompt still nudges toward ≤2 as a soft target, but only the code-level count can reject.
- **`generateReviewedParableInsight()`** — orchestrates the two above, `MAX_REVIEW_CYCLES = 3` (generate → review → regenerate on fail, same lens every time). Returns `insightUsage`/`reviewUsage` as separate `TokenUsage` values, never blended — Opus and Haiku are priced differently, so a combined total would be meaningless for cost tracking.
- **`generateParableImageBrief(parable)`** — Sonnet. The model only ever describes the scene (3-5 sentences) plus bilingual alt text; `imagePromptEn` is assembled by code (`${IMAGE_STYLE_PREFIX} ${scene} ${IMAGE_STYLE_PALETTE} ${IMAGE_STYLE_FORMAT}`) from fixed constants, so illustration style (flat children's-book look, fixed hex palette, 16:9 2048×1152) stays consistent across parables regardless of what the model generates for the scene itself.

`scripts/backfill-parable-insights.ts` is the batch runner over `reflectionStatus = DRAFT` parables — see the scripts table above. A parable only becomes linkable at `/pritcha/[slug]` once `reflectionStatus` reaches `REVIEWED` (both languages passed the review gate) and both slugs are set; `GENERATED` means the text exists but failed review and needs manual attention, `FAILED` means generation itself never produced a valid response.

### Slug format (`src/lib/slug.ts`)

`buildDigestSlug(prisma, parableTitle, author, theme)` — generates `{parable-title}-{author}-{theme}` (all lowercased, special chars stripped). If the base slug is taken, appends `-2`, `-3`, etc. until unique. Theme is always included when present on the quote.

### Daily digest parable/quote selection (`src/services/dailyParableSelection.ts`)

**Live pipeline, parable-first** — `createDigestForDate()` calls `selectDailyParable()` then `findQuoteForParable(parable)`, in that order:

- `selectDailyParable()`: LRU by last-shown date (`MAX(DailyDigest.date)` per parable, `NULLS FIRST` so a never-shown parable always wins over any shown one), under a cooldown exclusion. `COOLDOWN_STEPS = [60, 45, 30, 21, 14, 7, 0]` — tries each window in descending order, only relaxing to a shorter one when the stricter window has zero candidates (same defensive-relaxation pattern as the old quote steps below). `0` disables the cooldown entirely, so the loop is guaranteed to terminate with a result as long as `Parable` is non-empty; throws only if the table itself is empty.
- `findQuoteForParable(parable)`: rotates each parable through its 3 pre-assigned `ParableQuote` rows (backfilled once, positions 0/1/2, one `isPrimary`) instead of re-running a vector search on every digest. `position = timesShown % 3`, where `timesShown` counts every `DailyDigest` row ever created for that parable (drafts included). Must be called *before* today's `DailyDigest` row is created — counting it would shift the rotation by one. Throws if a parable is missing a `ParableQuote` at the expected position (a real data problem, not a soft-fallback case).

**Legacy quote-first pipeline (kept, unused)** — `findParableForQuote` (`src/services/digest.ts`) and `pickNextQuote` (`src/lib/dailyDigest.ts`, unexported) implemented the original flow: pick a quote first, then vector-search the best-matching parable (`PARABLE_COOLDOWN_STEPS = [14, 10, 7, 3, 1, 0]`, plus a usage-frequency diversity penalty in `queryBestMatch` to stop a handful of "generalist" parables like "The Two Wolves" from dominating close vector-similarity ties). Neither is called from `createDigestForDate` anymore, but both are left in place intentionally as a rollback path — reverting requires wiring both back in together, not just one.

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
