# CLAUDE.md — web/

This file provides guidance to Claude Code when working with the **web** (Next.js SEO site) of SagewayAI.

> Coding style, naming, and TypeScript conventions: see **[CONVENTIONS.md](../CONVENTIONS.md)**.
> Git & commit rules: see **[CLAUDE.md](../CLAUDE.md)** (root).

## Purpose

Next.js App Router SEO site with three goals:
1. Generate organic traffic through digest pages (`/d/[slug]`)
2. Give visitors a situation-based wisdom search (without Telegram)
3. Convert visitors into Telegram bot subscribers (@sagewayai_bot)

## Stack

- **Next.js 15.3.9** + App Router + Turbopack
- **React 19**
- **TypeScript 5** (strict)
- **Tailwind CSS v4** (CSS-first config)
- **Prisma 7.8.0** (`prisma-client` provider, read-only queries only)
- **@prisma/adapter-pg** (required in Prisma 7 — `new PrismaClient()` without adapter is invalid)
- **date-fns v4** for date formatting
- **transliteration** for generating slugs from Russian titles
- **zod** for query param validation (e.g. `app/api/og/route.tsx`)
- **app/sitemap.ts** — built-in Next.js sitemap, queries DB via Prisma, revalidates every 24h
- **app/robots.ts** — built-in Next.js robots.txt
- **@next/third-parties** for Google Analytics 4 (optimized script loading)
- **@vercel/analytics** for Vercel Web Analytics (page views, unique visitors)
- **@vercel/speed-insights** for real-user Core Web Vitals

## Commands

```bash
npm run dev        # predev: prisma generate → next dev (Turbopack)
npm run build      # prisma generate → next build
npm start          # next start
npm run type-check # tsc --noEmit
```

## Project structure

```
web/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, LanguageProvider wrapper
│   ├── page.tsx                # Home: CTABlock + daily HomeDailyDigest
│   ├── globals.css             # Tailwind v4 import + CSS color variables
│   ├── generated/
│   │   └── prisma/             # Generated Prisma Client (gitignored, rebuilt on predev)
│   ├── d/
│   │   └── [slug]/
│   │       ├── page.tsx               # Digest page (SSG, revalidate 86400)
│   │       └── DigestPageContent.tsx  # Client wrapper — bilingual content, reads from LanguageContext
│   ├── digests/
│   │   ├── page.tsx                       # Archive: paginated list of all digests (revalidate 3600), optional ?category= filter
│   │   ├── DigestsArchiveContent.tsx       # Client coordinator — breadcrumb + category filter + grid + pagination
│   │   ├── DigestArchiveBreadcrumb.tsx     # Client — bilingual breadcrumb
│   │   ├── DigestCategoryFilter.tsx        # Client — "All" + category pills, links to /digests?category=slug
│   │   ├── DigestCard.tsx                  # Client — single digest card (category badge + AI title + date)
│   │   └── DigestPagination.tsx            # Client — prev/next page links, preserves ?category=
│   └── api/
│       ├── og/
│       │   └── route.tsx       # Edge: OG image 1200x630 — NOTE: .tsx not .ts (JSX inside)
│       └── situation/
│           └── route.ts        # Proxy to Express /api/digest/situation (forwards real IP)
├── components/
│   ├── Navbar.tsx              # 'use client' — logo + LanguageToggle (reads/sets LanguageContext)
│   ├── Footer.tsx              # © 2026 SagewayAI · slogan — no Telegram link (it's in CTABlock)
│   ├── CTAButton.tsx           # Simple Telegram link button (legacy — prefer CTABlock)
│   ├── CTABlock.tsx            # 'use client' — full CTA section: headline + 4 bullets + button
│   ├── DigestBlock.tsx         # 'use client' — quote + parable + reflection + question; reads lang from context
│   ├── HomeDailyDigest.tsx     # 'use client' — bilingual wrapper for homepage digest, reads lang from context
│   ├── SituationSearch.tsx     # 'use client' — wisdom search form with cookie-based rate limit
│   └── LanguageToggle.tsx      # 'use client' — custom RU/EN dropdown (presentational, controlled)
├── contexts/
│   └── LanguageContext.tsx     # Lang type, LanguageProvider, useLanguage() hook
├── lib/
│   ├── prisma.ts               # Singleton PrismaClient with PrismaPg adapter
│   ├── brand.ts                # Centralized color + font constants (use for ImageResponse inline styles)
│   ├── slug.ts                 # generateSlug(title) via transliteration library
│   ├── formatTime.ts           # formatCountdown(ms) → "23h 45m"
│   ├── config.ts               # SITE_URL — canonical domain, used for metadataBase, canonical tags, sitemap, robots
│   └── og-image.tsx            # buildOgImage() — used by app/api/og/route.tsx, see GET /api/og below
├── prisma/
│   └── schema.prisma           # Copy of server/prisma/schema.prisma (read access only)
├── public/
│   └── llms.txt                # AI-crawler discovery file (robots.txt analog for LLMs) — static, English
├── prisma.config.ts            # Prisma 7 config — no dotenv import (Next.js loads .env.local)
├── next.config.ts              # serverExternalPackages: ['@prisma/client', 'pg']
├── tailwind.config.ts          # extend: colors, fontFamily, borderRadius
├── postcss.config.mjs          # @tailwindcss/postcss plugin (Tailwind v4)
├── next-sitemap.config.js      # siteUrl: sagewayai.com, daily revalidation
└── vercel.json                 # buildCommand: prisma generate && next build
```

## Language switching architecture

Language state lives in **`contexts/LanguageContext.tsx`** — single source of truth.

```
LanguageProvider (app/layout.tsx body)
  └── Navbar.tsx          → reads { lang, setLang } → renders LanguageToggle
  └── DigestBlock.tsx     → reads { lang } → switches labels (Мудрость дня / Daily Wisdom etc.)
  └── HomeDailyDigest.tsx → reads { lang } → picks RU or EN content fields
  └── DigestPageContent.tsx → reads { lang } → switches all bilingual fields + date locale
  └── CTABlock.tsx        → reads { lang } → bilingual headline, bullets, button text
  └── SituationSearch.tsx → reads { lang } → bilingual UI + sends lang to API
```

**Rule:** never add a local `lang` state to a component — always use `useLanguage()` from context.

`LanguageToggle` is a **presentational** component — receives `lang` + `onChange` as props. Only `Navbar` wires it to the context.

## Key components

### DigestBlock
Client component. Accepts single-language `DigestData`. Reads `lang` from context for **labels only** (Мудрость дня, Размышление, Вопрос, Читать полностью). Content itself stays in whatever language was passed — doesn't re-fetch on lang change.

### HomeDailyDigest
Client wrapper used on the homepage. Receives bilingual data from the server component (`page.tsx`) and picks the correct language fields based on `useLanguage()`. Renders `DigestBlock`.

### CTABlock
Full conversion block: headline, 4 content bullets (цитата → притча → рефлексия → вопрос), centered Telegram button. Used at the bottom of `/` and `/d/[slug]`. Fully bilingual.

### DigestPageContent
Renders the full digest page. Reads `lang` from context. Switches: quote, parable, conclusion, question, breadcrumbs, section labels, date locale (`ru` / `enUS`), and related card titles (server passes both `parableTitleRu` and `parableTitleEn`).

Renders the AI-generated digest title (`titleRu` / `titleEn`, resolved server-side with fallback to the parable title) as the page's `<h1>` — matches `<title>`/OG so search snippets and the on-page heading agree. The parable's own title is rendered as `<h2>` right above the parable text, so it stays visible without competing with the digest `<h1>`.

## Critical: Prisma 7 + Turbopack compatibility

### What does NOT work (do not revert to these)

| What | Why it breaks |
|------|---------------|
| `provider = "prisma-client-js"` in schema | Prisma 7 throws "Could not resolve @prisma/client" |
| `import 'dotenv/config'` in prisma.config.ts | `dotenv` not installed — Next.js loads `.env.local` automatically |
| `new PrismaClient()` without adapter | Invalid in Prisma 7 — adapter is always required |
| `"type": "module"` in package.json | Breaks Prisma CLI module resolution |
| `app/api/og/route.ts` | Must be `.tsx` — the file contains JSX (ImageResponse) |

### Correct configuration

**prisma/schema.prisma:**
```prisma
generator client {
  provider = "prisma-client"           // Prisma 7 native — NOT prisma-client-js
  output   = "../app/generated/prisma" // explicit path — Turbopack can resolve it
}
```

**next.config.ts:**
```ts
serverExternalPackages: ['@prisma/client', 'pg']
```

**lib/prisma.ts:**
```ts
import { PrismaClient } from '../app/generated/prisma'; // NOT from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';
```

## Environment variables

File `web/.env.local` (not committed):

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/sagewayai
SAGEWAYAI_API_URL=http://localhost:3001
NEXT_PUBLIC_BOT_URL=https://t.me/sagewayai_bot
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # optional — GA4 disabled in dev without it
NEXT_PUBLIC_SITE_URL=https://sagewayai.com   # optional — falls back to https://sagewayai.com via lib/config.ts
```

Production env vars to set in Vercel dashboard:
- `DATABASE_URL` — production PostgreSQL connection string
- `SAGEWAYAI_API_URL` — deployed Express server URL (Railway)
- `NEXT_PUBLIC_BOT_URL` — `https://t.me/sagewayai_bot`
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 Measurement ID
- `NEXT_PUBLIC_SITE_URL` — `https://sagewayai.com` (canonical domain — same value for Production, Preview, Development)

**Important:** PostgreSQL listens on port **5433** locally (not 5432).
See `docker-compose.yml` in monorepo root: `ports: "5433:5432"`.

## Local development startup order

```bash
# 1. Start PostgreSQL (from monorepo root)
docker-compose up -d postgres

# 2. Start Express server (from server/)
npm run dev

# 3. Start Next.js (from web/)
npm run dev   # automatically runs prisma generate via predev script
```

## Routes

### GET /
Server component. Fetches bilingual daily digest from DB. Includes `WebSite` JSON-LD (`websiteJsonLd` in `page.tsx`) with a `SearchAction` pointing at `/search?q={search_term_string}` — that route doesn't exist yet, added ahead of time so Google can pick up the sitelinks searchbox once it ships. Renders:
1. `HomeDailyDigest` — bilingual digest (switches language via context)
2. `CTABlock` — Telegram subscription CTA (at the bottom)

### GET /d/[slug]
SSG digest page. `revalidate = 86400`. Slug is read directly from `DailyDigest.slug` in the DB — it is generated and stored by the server at digest creation time (format: `{parable-title}-{author}-{theme}`).

`generateStaticParams` queries `prisma.dailyDigest.findMany({ select: { slug: true }, where: { slug: { not: null } } })` — uses DB slugs, no runtime generation.

`app/sitemap.ts` also reads slugs directly from DB.

Server passes **both RU and EN** fields to `DigestPageContent` for all content, quotes, and related card titles. Also passes `parable.category` (`name` + `slug`), rendered as a pill next to the date that links to `/digests?category=[slug]`.

Includes JSON-LD `Article` schema and full OpenGraph metadata. `jsonLd` includes `author`/`publisher` (both `Organization`, publisher has a `logo` pointing at `/favicon.svg`), `image` (the digest's OG image URL), `inLanguage: 'ru'`, and `isPartOf` (`WebSite`). `dateModified` uses `digest.createdAt` — `DailyDigest` has no `updatedAt` field in the schema, so `createdAt` is the closest available proxy.

`generateMetadata` uses `digest.titleRu ?? digest.titleEn` (AI-generated, stored in DB) as the page `<title>`, falling back to the parable title. Description is built from the quote snippet + parable moral for unique, content-rich SEO snippets per page. `buildOgImageUrl()` (local helper) builds the `/api/og` URL with `title`, `quote` (truncated to 200 chars), and `author` — used for both `openGraph.images` and `twitter.images`, and reused for the JSON-LD `image` field.

### GET /digests
Paginated archive of all daily digests (`?page=N`, 12 per page, `revalidate = 3600`). Lists `titleRu`/`titleEn` (AI-generated, fallback to parable title) + date + category badge, linking to `/d/[slug]`. Linked from `Navbar` ("Архив" / "Archive") and included in `app/sitemap.ts`. Pages beyond 1 are `noindex` to avoid duplicate-content SEO issues.

Optional `?category=[slug]` filters to one `Category` (only categories with at least one published digest are listed, via `Category.parables.some.digests.some`). `generateMetadata` builds a per-category title/canonical when the filter is active. `DigestCategoryFilter` renders an "All" pill plus one pill per category; `DigestPagination` preserves the `category` param across page links.

### POST /api/situation
Proxy to Express backend. Reads real user IP from `x-forwarded-for`, forwards it for IP-based rate limiting.

### GET /api/og
Edge runtime. Returns 1200×630 OG image. Uses `colors` from `lib/brand.ts` (CSS variables don't work in ImageResponse inline styles).

Params: `?title=...` (falls back to `SagewayAI`), `?quote=...` (optional, truncated to 200 chars), `?author=...` (optional, only shown when `quote` is present), `?lang=ru|en` (default `ru`).

Two render modes, selected by whether `quote` is present:
- **Digest mode** (`quote` present) — brand icon + wordmark top-left, `sagewayai.com` top-right, centered quote (Lora, up to 3 lines) with `— author` below it, digest title bottom-left, "Мудрость дня"/"Daily Wisdom" badge bottom-right.
- **Home mode** (no `quote`) — same header, centered "SagewayAI" + tagline, `sagewayai.com` bottom-left, "SagewayAI" badge bottom-right.

Fonts (Inter 400/700, Lora 400 italic/600) are fetched at request time from the Google Fonts CSS API (`loadGoogleFont` helper) — only the weights actually used for the current mode are fetched, scoped to the exact text being rendered via the API's `text=` param (handles Cyrillic automatically).

## Rate limiting

**Client-side (cookie):** `SituationSearch` checks cookie `swai_situation_used_at` (24h cooldown).

**Server-side (IP + DB):** Express checks `SituationRequest` table by IP (or `chatId` for Telegram bot requests). Returns 429 with `retryAfter` ms.

`web/prisma/schema.prisma` is a read-only copy of the shared schema — it also carries `TelegramSubscriber.referredBy` (referral tracking, owned by `telegram-bot/`) even though `web/` doesn't read it, to stay in sync with `server/` and `telegram-bot/` (see root `CLAUDE.md` → `schema-sync-check`).

## Design system

Colors from brand logotype, defined as CSS variables in `globals.css` + `tailwind.config.ts` + `lib/brand.ts`:

```
sage:           #5C9E65  — primary green
sage-light:     #EBF5EC  — section backgrounds, CTA block bg
sage-pill:      #DFF0E1  — tags, pills
sage-pill-hover:#CEEBD1  — pill hover
sage-dark:      #3E7048  — hover/pressed
sage-muted:     #94BF9A  — subtle green
amber:          #E8A33D  — accent
amber-light:    #FBF0DF  — amber backgrounds
canvas:         #FAFAF8  — page background
ink:            #1A1A1A  — body text
muted:          #6B7280  — secondary text
```

**`lib/brand.ts`** — use this for any hardcoded color values (e.g., ImageResponse, inline styles). Never scatter hex values across components.

Fonts (loaded via `next/font/google`):
- `--font-plus-jakarta` → `font-sans` primary (Plus Jakarta Sans, Latin)
- `--font-inter` → `font-sans` fallback (Inter, Cyrillic subset)
- `--font-lora` → `font-serif` (headings, parable body, quotes)

Reader max-width: `680px`. Page max-width: `1200px`.

## Analytics & SEO

- **Canonical domain** — `lib/config.ts` exports `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, default `https://sagewayai.com`). Used for `metadataBase`, all `alternates.canonical`, OG `url`, JSON-LD `publisher.url`, `sitemap.ts`, and `robots.ts` — never hardcode the domain elsewhere.
- **GA4** — `GoogleAnalytics` in `layout.tsx`, only renders when `NEXT_PUBLIC_GA_ID` is set
- **Vercel Analytics** — `Analytics` in `layout.tsx`, always active on Vercel deployments
- **Speed Insights** — `SpeedInsights` in `layout.tsx`, always active on Vercel deployments
- **Home page SEO** — explicit `metadata` export with canonical URL and OG image (`/api/og?title=SagewayAI&lang=ru`)
- **Sitemap** — `app/sitemap.ts`, queries all digests from DB, revalidates every 24h → `https://sagewayai.com/sitemap.xml`
- **robots.txt** — `app/robots.ts`, always allows all, points to sitemap

## Deployment (Vercel)

`vercel.json`:
```json
{ "buildCommand": "prisma generate && next build" }
```
