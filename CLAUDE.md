# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

SagewayAI is a curated library of parables and success stories. Users browse stories by topic, save to personal collections, share links, and submit their own stories. A weekly email digest sends one story to subscribers.

**Motto:** "The right story for this moment."

## Architecture

```
sagewayai/
├── client/          # React + Vite frontend  →  see client/CLAUDE.md
├── server/          # Express + Prisma backend  →  see server/CLAUDE.md
└── docker-compose.yml  # PostgreSQL 16 on :5432
```

Start the database before running either app:

```bash
docker-compose up -d
```

## Design concept

Editorial style — calm, warm, focused reading experience. The UI should feel like a thoughtful book or magazine, not a social feed.

- **Primary accent:** Sage green `#6B8F71`
- **Fonts:** Lora (serif, headings + story body) · Inter (sans, UI)
- **Story reader max width:** `680px` — the core reading experience
- **Page max width:** `1200px`

### Key pages

1. **Home** — topic pills, featured story, 3-column mini grid
2. **Story reader** — serif body, read time, save + share
3. **Explore** — filter by topic, search, pagination
4. **My collection** — saved stories (auth required)
5. **Add story** — submit parable or success story (Pro users)
6. **Settings** — email preferences, profile, subscription

## API contract

```
GET    /api/stories              # list: ?topic, ?type, ?search, ?page
GET    /api/stories/:id
POST   /api/stories              # Pro only
GET    /api/topics
GET    /api/stories/weekly

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh

GET    /api/me/collection
POST   /api/me/collection/:id
DELETE /api/me/collection/:id
PUT    /api/me/settings

GET    /api/admin/stories/pending
PUT    /api/admin/stories/:id
```

## Conventions

- Conventional commits: `feat:`, `fix:`, `chore:`, `test:`
- TypeScript everywhere — no `any`
- Zod for all API request validation

## MCP connections

- **Postgres:** local `sagewayai` database — inspect schema, debug queries
- **Notion:** SagewayAI workspace — update task status
- **GitHub:** sagewayai repo — branches, PRs, CI status

## Current phase

**Phase 1 — Claude Code Setup** (in progress). Check Notion for current tasks.
