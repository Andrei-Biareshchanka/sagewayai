# CLAUDE.md — web/

This file provides guidance to Claude Code when working with the **web** (Next.js SEO site) of SagewayAI.

> Coding style, naming, and TypeScript conventions: see **[CONVENTIONS.md](../CONVENTIONS.md)**.
> Git & commit rules: see **[CLAUDE.md](../CLAUDE.md)** (root).

## Purpose

Next.js App Router SEO site with three goals:
1. Generate organic traffic through digest pages (`/d/[slug]`)
2. Give visitors a situation-based wisdom search (without Telegram) — **live** at `/[locale]/search`: `SituationSearch.tsx` posts to `/api/situation` (proxy to Express `/api/digest/situation`) with `includeReflection: false`, so the web flow returns only a matching quote + parable (no Claude-generated conclusion/question, keeping the endpoint cheap and unrate-limited — see "POST /api/situation" and "Rate limiting" below)
3. Convert visitors into Telegram bot subscribers (@sagewayai_bot)

## Stack

- **Next.js 15.3.9** + App Router + Turbopack
- **React 19**
- **TypeScript 5** (strict)
- **Tailwind CSS v4** (CSS-first config)
- **Prisma 7.8.0** (`prisma-client` provider, read-only queries only)
- **@prisma/adapter-pg** (required in Prisma 7 — `new PrismaClient()` without adapter is invalid)
- **date-fns v4** for date formatting
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
│   ├── [locale]/                # locale segment — 'ru' | 'en', see lib/locales.ts. Every page lives here.
│   │   ├── layout.tsx           # Root layout (html/body live here — no separate app/layout.tsx) —
│   │   │                        # fonts, metadata, <html lang={locale}>, 404s on invalid locale,
│   │   │                        # renders Navbar/Footer once, wraps children in LanguageProvider
│   │   ├── page.tsx             # Home: CTABlock + daily HomeDailyDigest, locale-aware metadata
│   │   ├── d/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx               # Digest page (SSG, revalidate 86400, generateStaticParams is locale×slug)
│   │   │       └── DigestPageContent.tsx  # Client wrapper — bilingual content, reads from LanguageContext
│   │   ├── digests/
│   │   │   ├── page.tsx                       # Archive: paginated list of all digests (revalidate 3600), optional ?category= filter
│   │   │   ├── DigestsArchiveContent.tsx       # Client coordinator — breadcrumb + category filter + grid + pagination
│   │   │   ├── DigestArchiveBreadcrumb.tsx     # Client — bilingual breadcrumb
│   │   │   ├── DigestCategoryFilter.tsx        # Client — "All" + category pills, links to /{lang}/digests?category=slug
│   │   │   ├── DigestCard.tsx                  # Client — single digest card (category badge + AI title + date + "Read" link)
│   │   │   └── DigestPagination.tsx            # Client — prev/next page links, preserves ?category=
│   │   └── search/
│   │       └── page.tsx          # Situation search: hero image + h1 + SituationSearch, revalidate 3600
│   ├── globals.css             # Tailwind v4 import + CSS color variables
│   ├── generated/
│   │   └── prisma/             # Generated Prisma Client (gitignored, rebuilt on predev)
│   ├── sitemap.ts              # Top-level (outside [locale]) — emits both /ru and /en URLs per page/digest
│   ├── robots.ts               # Top-level — allows all, points to sitemap.xml
│   └── api/
│       ├── og/
│       │   └── route.tsx       # Edge: OG image 1200x630 — NOTE: .tsx not .ts (JSX inside)
│       └── situation/
│           └── route.ts        # Proxy to Express /api/digest/situation (forwards real IP); caller SituationSearch.tsx always sends includeReflection: false
├── components/
│   ├── Navbar.tsx              # 'use client' — logo + LanguageToggle (reads/sets LanguageContext), links prefixed with /{lang}
│   ├── Footer.tsx              # 'use client' — © 2026 SagewayAI · slogan, switches RU/EN via LanguageContext
│   ├── CTABlock.tsx            # 'use client' — full CTA section: headline + 4 bullets + button
│   ├── DigestBlock.tsx         # 'use client' — quote + parable + reflection + question; reads lang from context
│   ├── HomeDailyDigest.tsx     # 'use client' — bilingual wrapper for homepage digest, reads lang from context
│   ├── SituationSearch.tsx     # 'use client' — wisdom search form, rendered on /[locale]/search. No client-side rate limit (backend has none for includeReflection: false requests, see "Rate limiting")
│   ├── SituationCTA.tsx        # 'use client' — small button linking to /{lang}/search; rendered under DigestBlock on home + digest pages
│   ├── TomorrowTeaser.tsx      # 'use client' — preview of tomorrow's not-yet-published digest title; renders null if no draft exists
│   └── LanguageToggle.tsx      # 'use client' — custom RU/EN dropdown (presentational, controlled)
├── contexts/
│   └── LanguageContext.tsx     # Lang type, LanguageProvider, useLanguage() hook — see "Language routing architecture" below
├── lib/
│   ├── prisma.ts               # Singleton PrismaClient with PrismaPg adapter
│   ├── brand.ts                # Centralized color + font constants (use for ImageResponse inline styles)
│   ├── locales.ts              # LOCALES = ['ru', 'en'], Locale type, isLocale() guard — single source of truth for supported locales
│   ├── locale-content.ts       # pickLocalized(ru, en, locale) — selects a bilingual DB field; used both server-side (metadata/OG) and client-side (via useLocalizedDigest and directly)
│   ├── i18n.ts                 # t(lang, key) — static UI copy (labels, headings, errors), not DB content; TranslationKey = keyof typeof translations.ru enforces valid keys
│   ├── config.ts               # SITE_URL — canonical domain, used for metadataBase, canonical tags, sitemap, robots
│   └── og-image.tsx            # buildOgImage() — used by app/api/og/route.tsx, see GET /api/og below; slogan text goes through i18n.ts too
├── hooks/
│   └── useLocalizedDigest.ts   # useLocalizedDigest(digest: BilingualDigestContent, lang) → { title, imageAlt, data: DigestData } — shared by HomeDailyDigest and DigestPageContent
├── scripts/
│   ├── list-upcoming-digests.ts  # npm run digests:upcoming — lists unpublished drafts + image status
│   └── set-digest-image.ts       # npm run digests:set-image -- <slug> <path> <altRu> <altEn> — uploads to Vercel Blob, writes imageUrl/imageAltRu/imageAltEn
├── prisma/
│   └── schema.prisma           # Copy of server/prisma/schema.prisma (read access only)
├── public/
│   └── llms.txt                # AI-crawler discovery file (robots.txt analog for LLMs) — static, English
├── prisma.config.ts            # Prisma 7 config — no dotenv import (Next.js loads .env.local)
├── next.config.ts              # serverExternalPackages: ['@prisma/client', 'pg']; redirects() 308s old unprefixed URLs (/, /d/:slug, /digests) to /ru/...
├── middleware.ts                # 308-redirects the sagewayai.vercel.app host (Vercel's production alias — served the same content as the canonical domain, indexed as a duplicate) to sagewayai.com, preserving path + query. Scoped to that exact host, not *.vercel.app broadly, so PR preview deployments stay directly viewable.
├── tailwind.config.ts          # extend: colors, fontFamily, borderRadius
├── postcss.config.mjs          # @tailwindcss/postcss plugin (Tailwind v4)
├── next-sitemap.config.js      # siteUrl: sagewayai.com, daily revalidation
└── vercel.json                 # buildCommand: prisma generate && next build
```

## Language routing architecture

**RU and EN are separate, real URLs** (`/ru/...`, `/en/...`), not a client-side toggle over one URL — this is required for Google to index both languages independently (each declares the other as its `hreflang` alternate, pointing at the sibling URL, not itself).

`contexts/LanguageContext.tsx` still exposes the same `{ lang, setLang }` contract every component below reads, but the mechanics changed: `lang` is derived from the URL's `[locale]` segment (passed in as a prop by `app/[locale]/layout.tsx`, not local `useState`), and `setLang(newLang)` navigates (`router.push`) to the same path with the locale segment swapped instead of just re-rendering. Switching language is a real page navigation to a real URL now, since the content genuinely differs by URL.

```
LanguageProvider (app/[locale]/layout.tsx body, lang comes from params.locale)
  └── Navbar.tsx          → reads { lang, setLang } → renders LanguageToggle, links prefixed with /{lang}
  └── Footer.tsx          → reads { lang } → switches slogan text
  └── DigestBlock.tsx     → reads { lang } → labels via i18n.ts's t(lang, key) + date locale + category link prefix (pickLocalized)
  └── HomeDailyDigest.tsx → reads { lang } → useLocalizedDigest(digest, lang) picks content fields, renders DigestBlock
  └── DigestPageContent.tsx → reads { lang } → useLocalizedDigest(digest, lang) picks content fields, renders DigestBlock
  └── CTABlock.tsx        → reads { lang } → bilingual headline, bullets, button text
  └── SituationSearch.tsx → reads { lang } → bilingual UI, sends { situation, lang, includeReflection: false } to API
```

**Rule:** never add a local `lang` state to a component — always use `useLanguage()` from context.

`LanguageToggle` is a **presentational** component — receives `lang` + `onChange` as props. Only `Navbar` wires it to the context.

**`pickLocalized` vs `i18n.ts`:** two different concerns, both centralized. `lib/locale-content.ts`'s `pickLocalized(ru, en, locale)` selects a *DB-content* field (title, quote, parable text) with a same-language-first fallback — used server-side (`generateMetadata`, JSON-LD, OG image URL building, which can't reach client context) and client-side (`DigestBlock`, `useLocalizedDigest`). `lib/i18n.ts`'s `t(lang, key)` is for *static UI copy* (button labels, headings, error messages) — no DB content, no fallback semantics, just a typed dictionary. Don't reintroduce raw `lang === 'ru' ? x : y` ternaries for either case — both were fully swept from the codebase 2026-07-12 (see `.claude/docs/adr/0004-picklocalized-and-i18n.md`), including a real bug class the raw ternaries had (no fallback when a `*Ru` field is null on the `ru` locale). Old unprefixed URLs (`/`, `/d/:slug`, `/digests`) 308-redirect to their `/ru` equivalent via `next.config.ts`.

## Key components

### DigestBlock
The single shared component rendering a digest's content — used by `HomeDailyDigest` (homepage), `DigestPageContent` (`/d/[slug]`), and `SituationSearch` (live search result on `/[locale]/search`). Client component. Accepts `DigestData` with `conclusion`/`question` as `string | null` (`null` for situation-search results with `includeReflection: false` — those boxes just don't render, see below); reads `lang` from context for `i18n.ts` labels (Мудрость дня, Вопрос, Резюме — `t(lang, key)`, not inline ternaries) and for date formatting/category link prefixing (`pickLocalized`). Content itself stays in whatever language the caller passed — doesn't re-fetch on lang change. Shows the quote and full parable text unconditionally (no truncation, no link to `/d/[slug]` — removed to stop duplicating almost the entire digest page for a near-identical "read more" click).

All props besides `data` are optional, since callers differ in what they have available:
- `title` — rendered as the page `<h1>` inside the card; omitted by `SituationSearch` (a live search result has no separate digest title, only the parable's own title, already rendered as `<h2>`)
- `date` / `category` — rendered as a row at the top of the card (date left, category pill right, linking to `/{lang}/digests?category=[slug]`); either can be omitted independently, the row itself is skipped if neither is present
- `imageUrl` / `imageAlt` — when `imageUrl` is set, renders an `<img>` between the quote and the parable divider (`rounded-xl object-cover`, no fixed aspect ratio); renders nothing at all when unset, no layout shift or placeholder box. `alt` falls back to `title` then the parable title when `imageAlt` isn't set (older/un-annotated images) — see `.claude/docs/adr/0003-digest-images.md` for why `imageAlt` needed its own field pair (`imageAltRu`/`imageAltEn`) instead of reusing the digest title as alt text
- `shareUrl` / `shareTitle` — when provided, renders `ShareButton` in a bordered-top row after the Summary/Question boxes
- `showDailyBadge` — defaults to `true` (`HomeDailyDigest`/`DigestPageContent` don't pass it); `SituationSearch` explicitly passes `false` since a live search result isn't "today's wisdom" and showing that pill was misleading

Summary and Question boxes (`conclusion`/`question`) each render conditionally now — `null` (situation-search without reflection) simply omits that box rather than showing an empty one; when present, both are always visible, no collapse/toggle.

Layout: the "Мудрость дня"/"Daily wisdom" pill (`showDailyBadge`) sits **above** the bordered card (not inside it) as a page-level eyebrow; the card itself (`border border-sage-pill rounded-2xl`) wraps everything from the date/category row through the ShareButton.

### ShareButton
Client component (`components/ShareButton.tsx`). Props: `url`, `title`, `text` (kept short — quote + author, not the full parable, since the destination page's own OG image/description already carries the rich preview). On click, tries `navigator.share()` (native OS share sheet on supporting devices); if unsupported or the call resolves without the user completing a share, falls back to a small dropdown with Telegram (`t.me/share/url` — same scheme `telegram-bot/src/lib/keyboard.ts`'s `buildShareUrl` already uses), WhatsApp, X, and "copy link".

`url` is always built by the caller as `` `${SITE_URL}/${lang}/d/${slug}?utm_source=share&utm_medium=social` `` so GA4 can attribute traffic from shares; a `gtag('event', 'share', { method, content_type: 'digest' })` also fires on every successful path (guarded — no-op if `gtag` isn't loaded). No dedicated Prisma model or API endpoint tracks shares — mirrors the Telegram bot's own share feature, which has no tracking table either.

Rendered from two places, each threading the digest's `slug` down to build `url` and passed to `DigestBlock`:
- `HomeDailyDigest` (homepage digest; `slug` added to `BilingualDailyData`, guarded — no button renders if `slug` is `null`)
- `DigestPageContent` (`/[locale]/d/[slug]`; `slug` added to `BilingualDigest`, always present since the page 404s otherwise)

### HomeDailyDigest
Client wrapper used on the homepage. Receives bilingual data from the server component (`page.tsx`), including `date`, `category`, `imageUrl`/`imageAltRu`/`imageAltEn`, and resolves the current-language fields via `useLocalizedDigest()`. Renders `DigestBlock`, forwarding `title`, `date`, `category`, `imageUrl`/`imageAlt`, and (when the digest has a `slug`) `shareUrl`/`shareTitle`. Image support was added 2026-07-12 — before that, the homepage digest never showed an image even when one was set (only `/d/[slug]` did); see `.claude/docs/adr/0004-picklocalized-and-i18n.md`.

### CTABlock
Full conversion block: headline, 4 content bullets (цитата → притча → рефлексия → вопрос), centered Telegram button. Used at the bottom of `/` and `/d/[slug]`. Fully bilingual.

Requires a `source: string` prop — fired as `gtag('event', 'telegram_subscribe_click', { source })` on button click (same `window.gtag` global declared in `ShareButton.tsx`), so GA4 can attribute subscribes by page. Callers: `homepage_cta` (`app/[locale]/page.tsx`), `digest_cta` (`DigestPageContent`).

A second, RU-only button links to the Telegram **channel** (`@sagewayai`, `NEXT_PUBLIC_CHANNEL_URL` env var, fallback `https://telegram.me/sagewayai`) — only rendered when `lang === 'ru'`, since the channel currently posts Russian-only content (`CHANNEL_LANGUAGE = 'ru'` in `telegram-bot/src/lib/broadcast.ts`). Fires `gtag('event', 'telegram_channel_click', { source })` on click.

Each button has a short caption below it clarifying what it actually is, since "bot" vs "channel" isn't self-explanatory to a first-time visitor: `subscribeButton`/`subscribeCaption` ("Подключиться к боту" / "Личный дайджест каждый день + поиск мудрости по вашей ситуации") vs `channelButton`/`channelCaption` ("Подключиться к каналу" / "Все дайджесты в открытой ленте") in `i18n.ts` — mirrors the actual product difference (bot = personal DM digest + `/settings` + the situation-search command `telegram-bot/src/commands/situation.ts`, channel = public feed, no personalization). The bot's situation search always requests `includeReflection: true` (full Claude-generated conclusion/question, 24h rate limit) — the web version at `/[locale]/search` is the same underlying endpoint but with `includeReflection: false` (quote + parable only, no rate limit), see "POST /api/situation" and "Rate limiting" below.

### DigestPageContent
Renders the full digest page. Reads `lang` from context, resolves content fields via `useLocalizedDigest()`, and renders `DigestBlock` (passing `title`, `date`, `category`, `imageUrl`/`imageAlt`, `shareUrl`/`shareTitle`) plus its own breadcrumb nav (labels via `i18n.ts`), a `SituationCTA` button, related-digests grid, and `CTABlock` around it.

The digest title (`titleRu`/`titleEn`, resolved server-side with fallback to the parable title) is passed as `DigestBlock`'s `title` and rendered as the page's `<h1>` — matches `<title>`/OG so search snippets and the on-page heading agree. The parable's own title is rendered as `<h2>` right above the parable text (inside `DigestBlock`), so it stays visible without competing with the digest `<h1>`.

### TomorrowTeaser
Client component (`components/TomorrowTeaser.tsx`). Rendered **only on the homepage** (`app/[locale]/page.tsx`), between `HomeDailyDigest` and `CTABlock` — deliberately not shown on `/d/[slug]`, since the "come back tomorrow" hook only makes sense on the page users are likely to revisit, not on an individual digest permalink. Props: `tomorrow: { titleRu: string; titleEn: string } | null` — renders `null` if there's no draft yet (nothing to tease). Styled as a bordered card (`bg-canvas border border-sage-pill rounded-2xl p-8 text-center`): a small "Tomorrow on SagewayAI:" label, the draft's title, and a "parable · quote · reflection · question" caption in `text-sage`. No CTA/link inside — `CTABlock` right below already carries the Telegram subscribe button, so this stays a pure preview.

`getTomorrowDigest()` (in `app/[locale]/page.tsx`) queries `DailyDigest` for `isPublished: false` ordered by `date asc` — at any steady-state moment there's at most one unpublished draft (the next one `server/`'s publish-and-prepare cron will publish), so this doesn't need to know the cron's UTC-vs-MSK date-shift logic.

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
NEXT_PUBLIC_BOT_URL=https://telegram.me/sagewayai_bot
NEXT_PUBLIC_CHANNEL_URL=https://telegram.me/sagewayai   # optional — RU-only channel link shown alongside the bot CTA
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # optional — GA4 disabled in dev without it
NEXT_PUBLIC_SITE_URL=https://sagewayai.com   # optional — falls back to https://sagewayai.com via lib/config.ts
```

Production env vars to set in Vercel dashboard:
- `DATABASE_URL` — production PostgreSQL connection string
- `SAGEWAYAI_API_URL` — deployed Express server URL (Railway)
- `NEXT_PUBLIC_BOT_URL` — `https://telegram.me/sagewayai_bot`
- `NEXT_PUBLIC_CHANNEL_URL` — `https://telegram.me/sagewayai` (optional, RU-only channel link)
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

All page routes live under `app/[locale]/`, so every path below is actually `/ru/...` or `/en/...` — the old unprefixed paths (`/`, `/d/:slug`, `/digests`) 308-redirect to their `/ru` equivalent via `next.config.ts`'s `redirects()`.

**Publish gating:** `DailyDigest` rows can exist a day ahead of their publish date as unpublished drafts (see `server/CLAUDE.md`'s publish-and-prepare cron). Every query below that selects "the daily digest" or lists digests filters on `isPublished: true` — a draft must never be reachable by URL, listed in the archive, or included in the sitemap before its own day.

### GET /[locale]
Server component. Fetches the latest **published** daily digest from DB (`findFirst({ where: { isPublished: true }, orderBy: { date: 'desc' }, include: { quote: true, parable: { include: { category: true } } } })`) and the one unpublished draft via `getTomorrowDigest()`. Includes `WebSite` JSON-LD (`buildWebsiteJsonLd()` in `page.tsx`) with a `SearchAction` pointing at `/search?q={search_term_string}` — the route now exists (`GET /[locale]/search`, see below), but the `q` param itself isn't read yet (no prefill), so this is still ahead of full Google sitelinks searchbox support. `generateMetadata` picks locale-specific title/description from a small `HOME_METADATA` record and builds `alternates.languages` pointing `ru`/`en` at each other's URL (not itself) plus `x-default` at `/ru`. Renders:
1. `HomeDailyDigest` — bilingual digest (switches language via context), includes `date`/`category`
2. `SituationCTA` — button linking to `/{lang}/search`
3. `TomorrowTeaser` — next-day preview, homepage-only (see "Key components" above)
4. `CTABlock` — Telegram subscription CTA (at the bottom)

### GET /[locale]/d/[slug]
SSG digest page. `revalidate = 86400`. Slug is read directly from `DailyDigest.slug` in the DB — it is generated and stored by the server at digest creation time (format: `{parable-title}-{author}-{theme}`).

`getDigestBySlug` uses `findFirst({ where: { slug, isPublished: true } })` (not `findUnique` — `isPublished` isn't part of the unique index) so an unpublished draft 404s via `notFound()` even if someone has the slug.

`generateStaticParams` returns the flat cross-join of `LOCALES × slugs` (not relying on parent/child param merging) from `prisma.dailyDigest.findMany({ select: { slug: true }, where: { slug: { not: null }, isPublished: true } })` — uses DB slugs, no runtime generation, excludes drafts.

`app/sitemap.ts` also reads slugs directly from DB (same `isPublished: true` filter) and emits both locale URLs per digest.

Server passes **both RU and EN** fields to `DigestPageContent` for all content, quotes, and related card titles (the client component still does its own `lang`-based field selection — since `lang` now always equals the route locale, that logic didn't need to change). Also passes `parable.category` (`name` + `slug`), rendered as a pill next to the date that links to `/{lang}/digests?category=[slug]`.

Includes JSON-LD `Article` schema and full OpenGraph metadata. `jsonLd` includes `author`/`publisher` (both `Organization`, publisher has a `logo` pointing at `/favicon.svg`), `image` (the digest's OG image URL), `inLanguage: locale`, and `isPartOf` (`WebSite`). `dateModified` uses `digest.createdAt` — `DailyDigest` has no `updatedAt` field in the schema, so `createdAt` is the closest available proxy.

`generateMetadata` resolves the page `<title>` via `resolveDigestTitle(digest, locale)`, which uses `lib/locale-content.ts`'s `pickLocalized()` against `digest.titleRu`/`titleEn` (AI-generated, stored in DB), falling back to the parable title. Description is built from the locale-picked quote snippet + parable moral for unique, content-rich SEO snippets per page. `buildOgImageUrl()` (local helper) builds the `/api/og` URL with `title`, `quote` (truncated to 200 chars), `author`, and `lang=${locale}` — used for both `openGraph.images` and `twitter.images`, and reused for the JSON-LD `image` field. `alternates.languages` points the current locale at itself and the other locale at its own `/d/[slug]` URL — never both at the same URL.

### GET /[locale]/digests
Paginated archive of all **published** daily digests (`?page=N`, 12 per page, `revalidate = 3600`, `isPublished: true` on both the digest list query and the category-counter query). Lists `titleRu`/`titleEn` (AI-generated, fallback to parable title) + date + category badge + a "Читать"/"Read" link, linking to `/{lang}/d/[slug]`. Linked from `Navbar` ("Архив" / "Archive") and included in `app/sitemap.ts`. Pages beyond 1 are `noindex` to avoid duplicate-content SEO issues.

Card titles use `line-clamp-2 min-h-[3rem]` — `line-clamp` alone only caps height at 2 lines but doesn't reserve that space for shorter titles, so without the explicit `min-h` cards with 1-line vs 2-line titles rendered at different heights, making the grid look uneven and shift depending on which digests were in the current filtered view. The grid container itself also carries `min-h-[300px]` (~2 rows) so categories with very few digests don't collapse the page height dramatically compared to a full page — both are mitigations for perceived layout shift when switching categories, not changes to the fixed `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` column layout (card width itself never depends on item count).

Optional `?category=[slug]` filters to one `Category` (only categories with at least one published digest are listed, via `Category.parables.some.digests.some`). `generateMetadata` builds a per-category, per-locale title/canonical when the filter is active, with `alternates.languages` pointing at the sibling locale's `/digests` URL (same query string). `DigestCategoryFilter` renders an "All" pill plus one pill per category, all prefixed with `/{lang}`; `DigestPagination` preserves the `category` param across page links, also prefixed with `/{lang}`.

### GET /[locale]/search
Server component wrapper (`revalidate = 3600`) around `SituationSearch`. Renders a static hero illustration (`public/images/search-hero.png`, via `next/image`, bilingual `alt`) and a visible `<h1>` (locale-specific `heading` in a local `SEARCH_METADATA` record — deliberately separate from `i18n.ts` since it's page-specific SEO copy, not reusable UI chrome) above the form. `generateMetadata` builds `title`/`description`/canonical + `alternates.languages` the same way `/digests` does. The form's own on-page heading (`situationHeading`, an `<h2>` inside `SituationSearch`) is phrased as a direct question ("Что вас сейчас беспокоит?"/"What's troubling you right now?") rather than a statement — deliberately, to prompt a fuller situation description, which in turn gives the embedding more signal to match against.

### POST /api/situation
Proxy to Express `/api/digest/situation`. Reads real user IP from `x-forwarded-for`, forwards it for IP-based rate limiting. `SituationSearch` always sends `includeReflection: false` — see "Rate limiting" below for what that does server-side. The Telegram bot calls the Express endpoint directly (not through this proxy) with `includeReflection: true`.

### GET /api/og
Edge runtime. Returns 1200×630 OG image. Uses `colors` from `lib/brand.ts` (CSS variables don't work in ImageResponse inline styles).

Params: `?title=...` (accepted but not rendered — reserved for future use), `?quote=...` (optional, truncated to 120 chars with `…`), `?author=...` (optional, only shown when `quote` is present), `?lang=ru|en` (default `ru`).

Background is `colors.sageLight` (light theme, not the older dark gradient). Two render modes, selected by whether `quote` is present:
- **Digest mode** (`quote` present) — brand icon + wordmark top-left, `sagewayai.com` top-right, centered italic quote (Lora, up to 3 lines) with `— author` below it (Inter italic), footer has a single right-aligned slogan ("Мудрость каждый день"/"Daily Wisdom").
- **Home mode** (no `quote`) — same header, centered "SagewayAI" + the same slogan text below it, footer shows `sagewayai.com` right-aligned.

Fonts (Inter 700/500/400-italic, Lora 400-italic) are fetched at request time from the Google Fonts CSS API (`loadGoogleFont` helper) — only the weights actually used for the current mode are fetched, scoped to the exact text being rendered via the API's `text=` param (handles Cyrillic automatically). All colors come from `lib/brand.ts` — no hardcoded hex in this file.

## Rate limiting

Applies to the `/api/situation` flow (`POST /api/situation` above). Two different limits depending on the `includeReflection` flag sent in the request body — see `server/CLAUDE.md` for the full server-side picture.

**`includeReflection: true`** (Telegram bot only — web never sends this): Express checks the `SituationRequest` table by `chatId` (24h cooldown), returns 429 with `retryAfter` ms. No client-side limit in `SituationSearch` for this path since the web UI never triggers it.

**`includeReflection: false`** (web — `SituationSearch` always sends this): no 24h DB-backed limit at all — deliberately unlimited on that axis, since there's no Claude call to protect against. Instead, a soft `express-rate-limit` cap (20 req/min per IP) guards the Voyage AI embedding call itself. `SituationSearch` has **no client-side rate limit** (the old cookie-based `swai_situation_used_at` 24h lock was removed 2026-07 — it existed because the endpoint used to always call Claude; once `includeReflection: false` stopped doing that, a client-side lock made no sense to keep). A 429 from the 20/min limiter is shown as a plain error message, same code path as any other request failure — no countdown UI.

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
- **`middleware.ts`** — 308-redirects `sagewayai.vercel.app` (Vercel's production alias) to `SITE_URL`, preserving path + query, since it was serving the same content and getting indexed as a duplicate. Doesn't touch PR preview deployment hosts.
- **GA4** — `GoogleAnalytics` in `app/[locale]/layout.tsx`, only renders when `NEXT_PUBLIC_GA_ID` is set
- **Vercel Analytics** — `Analytics` in `app/[locale]/layout.tsx`, always active on Vercel deployments
- **Speed Insights** — `SpeedInsights` in `app/[locale]/layout.tsx`, always active on Vercel deployments
- **Home page SEO** — `generateMetadata` per locale with canonical URL and OG image (`/api/og?title=SagewayAI&lang={locale}`)
- **Sitemap** — `app/sitemap.ts`, queries all digests from DB, emits both `/ru` and `/en` URLs per page/digest with reciprocal `alternates.languages`, revalidates every 24h → `https://sagewayai.com/sitemap.xml`
- **robots.txt** — `app/robots.ts`, always allows all, points to sitemap

## Deployment (Vercel)

`vercel.json`:
```json
{ "buildCommand": "prisma generate && next build" }
```
