# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

SagewayAI — a parable library organized by category. Every day a new random parable appears on the home page. Users can subscribe and receive it by email.

**Tagline:** "The daily parable that resonates"

## Product evolution

| Version | What |
|---|---|
| **v1** | Parables + categories + daily parable on home page |
| **v2** | Auth + email subscription + category preferences |
| **v3** | Success stories as a second content type |
| **v4** | AI search by situation (Vercel AI SDK + Groq) |

## Architecture

```
sagewayai/
├── client/          # React + Vite frontend  →  see client/CLAUDE.md
├── server/          # Express + Prisma backend  →  see server/CLAUDE.md
└── docker-compose.yml  # PostgreSQL 16 on :5432
```

```bash
docker-compose up -d  # start PostgreSQL before running the app
```

## Data models (v1)

**Parable** — `id, title, content, moral, source?, readTime, categoryId, createdAt`

**Category** — `id, name, slug, description?, color?, parablesCount`

Seed categories: `Wisdom, Motivation, Leadership, Journey, Loss, Risk, Trust, Meaning`

**DailyParable** — `id, parableId, date` (one unique parable per day)

## Design concept

Editorial style — calm, warm, focused on reading.

- **Primary accent:** Sage green `#6B8F71`
- **Fonts:** Lora (serif, headings + parable body) · Inter (sans, UI)
- **Reader max width:** `680px`
- **Page max width:** `1200px`

### Key pages (v1)

1. **Home** — daily parable hero, category pills, grid of other parables
2. **Explore** — all parables, filter by category
3. **Parable** — reader view: serif body, read time, moral

## API contract (v1)

```
GET  /api/parables              # list: ?category, ?page
GET  /api/parables/daily        # parable of the day
GET  /api/parables/:id          # single parable
GET  /api/categories            # all categories with parable counts
```

v2 adds: `/api/auth/*`, `/api/subscribe`

## Conventions

See **[CONVENTIONS.md](./CONVENTIONS.md)** for the full coding style guide.

- Conventional commits: `feat:`, `fix:`, `chore:`, `test:`
- TypeScript everywhere — no `any`
- Zod for all API request validation

## MCP connections

- **Postgres:** local `sagewayai` database — inspect schema, debug queries
- **Notion:** SagewayAI workspace — update task status
- **GitHub:** sagewayai repo — branches, PRs, CI status

## Current phase

**Phase 1 — Done. Phase 2 — next.** Check Notion for current tasks.
