# CLAUDE.md — web/

This file provides guidance to Claude Code when working with the **web** (Next.js SEO site) of SagewayAI.

> Coding style, naming, and TypeScript conventions: see **[CONVENTIONS.md](../CONVENTIONS.md)**.

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
- **next-sitemap** for sitemap.xml generation

## Commands

```bash
npm run dev        # predev: prisma generate → next dev (Turbopack)
npm run build      # prisma generate → next build → next-sitemap
npm start          # next start
npm run type-check # tsc --noEmit
```

## Project structure

```
web/
├── app/
│   ├── layout.tsx              # Root layout — Inter + Lora fonts via next/font, metadata
│   ├── page.tsx                # Home: SituationSearch + daily DigestBlock
│   ├── globals.css             # Tailwind v4 import + CSS color variables
│   ├── generated/
│   │   └── prisma/             # Generated Prisma Client (gitignored, rebuilt on predev)
│   ├── d/
│   │   └── [slug]/
│   │       ├── page.tsx               # Digest page (SSG, revalidate 86400)
│   │       └── DigestPageContent.tsx  # Client wrapper for RU/EN language toggle
│   └── api/
│       ├── og/
│       │   └── route.tsx       # Edge: OG image 1200x630 — NOTE: .tsx not .ts (JSX inside)
│       └── situation/
│           └── route.ts        # Proxy to Express /api/digest/situation (forwards real IP)
├── components/
│   ├── Navbar.tsx              # Sticky header — logo + Telegram link
│   ├── Footer.tsx              # © 2026 SagewayAI
│   ├── CTAButton.tsx           # "Get it in Telegram" button (uses NEXT_PUBLIC_BOT_URL)
│   ├── DigestBlock.tsx         # Reusable block: quote + parable + reflection + question
│   ├── SituationSearch.tsx     # Client component: search form with cookie-based rate limit
│   └── LanguageToggle.tsx      # Client component: RU / EN toggle buttons
├── lib/
│   ├── prisma.ts               # Singleton PrismaClient with PrismaPg adapter
│   ├── slug.ts                 # generateSlug(title) via transliteration library
│   └── formatTime.ts           # formatCountdown(ms) → "23h 45m"
├── prisma/
│   └── schema.prisma           # Copy of server/prisma/schema.prisma (read access only)
├── prisma.config.ts            # Prisma 7 config — no dotenv/config (Next.js loads .env.local)
├── next.config.ts              # serverExternalPackages: ['@prisma/client', 'pg']
├── tailwind.config.ts          # extend: colors, fontFamily, borderRadius
├── postcss.config.mjs          # @tailwindcss/postcss plugin (Tailwind v4)
├── next-sitemap.config.js      # siteUrl: sagewayai.com, daily revalidation
└── vercel.json                 # buildCommand: prisma generate && next build
```

## Critical: Prisma 7 + Turbopack compatibility

This setup required significant debugging. Read carefully before changing anything here.

### What does NOT work (do not revert to these)

| What | Why it breaks |
|------|---------------|
| `provider = "prisma-client-js"` in schema | Prisma 7 throws "Could not resolve @prisma/client" |
| `import 'dotenv/config'` in prisma.config.ts | `dotenv` is not installed in web/ — Next.js loads `.env.local` automatically |
| `new PrismaClient()` without adapter | Invalid in Prisma 7 — adapter is always required |
| `"type": "module"` in package.json | Breaks Prisma CLI module resolution |
| `next@latest` / `next@^16` | 16.2.9 is a broken Windows backport build — missing `metadata/` directory |
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
// Tells Turbopack not to bundle these — loads from node_modules at runtime
```

**lib/prisma.ts:**
```ts
import { PrismaClient } from '../app/generated/prisma'; // NOT from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';          // required adapter
```

**prisma.config.ts:**
```ts
import { defineConfig } from 'prisma/config'; // no dotenv import
export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: { url: process.env['DATABASE_URL'] },
});
```

### After any schema.prisma change

```bash
npx prisma generate
# Regenerates client to app/generated/prisma/ (gitignored)
```

## Environment variables

File `web/.env.local` (not committed):

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/sagewayai
SAGEWAYAI_API_URL=http://localhost:3001
NEXT_PUBLIC_BOT_URL=https://t.me/sagewayai_bot
```

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
Server component. Renders:
1. `SituationSearch` — wisdom search form (client component, top of page)
2. `DigestBlock` — today's digest fetched from DB (server-rendered, RU by default)

Data: `prisma.dailyDigest.findFirst({ where: { date: { gte: startOfToday } }, include: { quote, parable } })`  
Fallback: most recent digest if today has none.

### GET /d/[slug]
SSG digest page. `revalidate = 86400`.

Slug is generated from `parable.title` (English) via `generateSlug()`.  
Page defaults to RU, `LanguageToggle` in `DigestPageContent` switches to EN client-side.

`generateStaticParams` → fetches all DailyDigest records → returns array of slugs.

Includes JSON-LD Article schema and full OpenGraph metadata.

### POST /api/situation
Proxy to Express backend. Reads real user IP from `x-forwarded-for` header and forwards it to Express for IP-based rate limiting. The Express server writes to `SituationRequest` table.

Client (`SituationSearch`) posts to this Next.js route — not directly to Express. This keeps `SAGEWAYAI_API_URL` server-side only.

### GET /api/og
Edge runtime (`export const runtime = 'edge'`). Accepts `?title=...&lang=ru|en`.  
Returns 1200×630 OG image with sage-green accent bar.

## Rate limiting

**Client-side (cookie):** `SituationSearch` checks cookie `swai_situation_used_at`.  
If `Date.now() - cookieValue < 86400000` — blocks locally, shows countdown timer.  
Cookie name: `swai_situation_used_at`, `max-age=86400`, `SameSite=Lax`.

**Server-side (IP + DB):** Express `POST /api/digest/situation` checks `SituationRequest` table by IP for the last 24h. Returns 429 with `{ error: 'rate_limited', retryAfter: msLeft }`.

## Design system

Colors derived from the brand logotype (`/public/sageway-logotype.svg`).
Defined as CSS variables in `globals.css` + Tailwind `extend.colors`:

```
sage:           #5C9E65  — primary green (from "Sage" in logotype)
sage-light:     #EBF5EC  — section backgrounds
sage-pill:      #DFF0E1  — tags, category pills
sage-pill-hover:#CEEBD1  — pill hover state
sage-dark:      #3E7048  — hover / pressed states
sage-muted:     #94BF9A  — subtle green (from "AI" in logotype)
amber:          #E8A33D  — accent (from "way" in logotype)
amber-light:    #FBF0DF  — amber tinted backgrounds
canvas:         #FAFAF8  — page background (confirmed in favicon)
ink:            #1A1A1A  — body text
muted:          #6B7280  — secondary text
border:         rgba(0,0,0,0.08)
```

Fonts (loaded via `next/font/google`, injected as CSS variables on `<html>`):
- `--font-plus-jakarta` → `font-sans` primary (Plus Jakarta Sans, Latin — matches logotype)
- `--font-inter` → `font-sans` fallback (Inter, Cyrillic subset — Russian content)
- `--font-lora` → `font-serif` (headings, parable body, quotes)

Font stack for `font-sans`: `var(--font-plus-jakarta), var(--font-inter), sans-serif`
Latin text → Plus Jakarta Sans. Cyrillic text → falls back to Inter automatically.

Reader max-width: `680px`. Page max-width: `1200px`.

## Changes made to server/

These changes were made to `server/` when creating the web project:

1. **`server/prisma/schema.prisma`** — added model:
   ```prisma
   model SituationRequest {
     id     String   @id @default(cuid())
     ip     String
     usedAt DateTime @default(now())
     @@index([ip, usedAt])
   }
   ```

2. **`server/src/routes/digest.ts`** — added IP rate limiting before Claude API call in `POST /situation`

3. **`server/src/index.ts`** — added daily cron that deletes `SituationRequest` records older than 48h

**Migration required after pull:**
```bash
cd server
npx prisma migrate dev --name add_situation_request
```

## Deployment (Vercel)

`vercel.json`:
```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

Environment variables to set on Vercel:
- `DATABASE_URL` — production PostgreSQL connection string
- `SAGEWAYAI_API_URL` — deployed Express server URL (Railway)
- `NEXT_PUBLIC_BOT_URL` — `https://t.me/sagewayai_bot`

`next-sitemap` runs via `postbuild` script and generates `public/sitemap.xml` + `public/robots.txt` (both gitignored, generated at build time).
