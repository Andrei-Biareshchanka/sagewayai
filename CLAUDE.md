# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

SagewayAI is a curated library of parables and success stories. Users browse stories by topic, save to personal collections, share links, and submit their own stories. A weekly email digest sends one story to subscribers. Built as a learning project to master Claude Code, full-stack development, testing, and CI/CD.

**Motto:** "The right story for this moment."

---

## Architecture

```
sagewayai/
├── client/          # React + Vite frontend
├── server/          # Express + Prisma + PostgreSQL backend
├── CLAUDE.md        # This file
└── docker-compose.yml
```

### Client (`/client`)

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **State:** React Query (server state) + Zustand (UI state)
- **Routing:** React Router v6
- **Testing:** Vitest + Playwright + MSW
- **AI:** Vercel AI SDK (Phase 7)

### Server (`/server`)

- **Runtime:** Node.js + Express
- **ORM:** Prisma
- **Database:** PostgreSQL (local via Docker)
- **Auth:** JWT (access + refresh tokens) + bcrypt
- **Email:** Resend + React Email
- **Testing:** Vitest
- **AI:** Vercel AI SDK + Groq API (Phase 7)

---

## Design system

### Visual concept

Variant C — Editorial style. Calm, warm, focused reading experience.
The UI should feel like a thoughtful book or magazine, not a social feed.

### Color palette

- **Primary accent:** Sage green `#6B8F71`
- **Light sage bg:** `#F0F4F0`
- **Pill/badge bg:** `#E8F0E8`, text `#3D6142`
- **Page background:** warm off-white, never pure white
- **Text:** near-black `#1A1A1A`, secondary `#6B7280`
- **Borders:** very subtle, `0.5px`, `rgba(0,0,0,0.08)`

### Typography

- **Headings:** serif font (Lora or Playfair Display), medium weight
- **Body:** clean sans-serif (Inter), 16px, line-height 1.7
- **Reading content:** serif, 18px, max-width 680px, generous padding
- **Labels/tags:** uppercase, letter-spacing 0.5px, 11px

### Layout principles

- Max content width: `1200px`, centered
- Story reader max width: `680px` (book-like column)
- Featured story takes full width with large title
- Topic pills in a horizontal scrollable row
- Cards: subtle border, no heavy shadows, rounded corners `12px`
- Generous whitespace — never crowded

### Key pages

1. **Home** — eyebrow "Wisdom library", large italic headline, topic pills, featured story card, 3-column mini grid below
2. **Story reader** — serif body, estimated read time, topic tags, save button, share link
3. **Explore** — full library with topic filter, search bar, pagination
4. **My collection** — saved stories grid (auth required)
5. **Add story** — form to submit new parable or success story (Pro users)
6. **Settings** — email preferences, profile, subscription status

---

## Data models

### Story

```
id, title, content, type (parable | success_story), readTime,
authorId, tags[], status (published | pending | rejected),
createdAt, updatedAt, savesCount, viewsCount
```

### Tag / Topic

```
id, name, slug, description, color, storiesCount
```

Seed topics: Purpose, Leadership, Resilience, Risk, Path, Loss, Trust, Change, Gratitude, Courage

### User

```
id, email, name, role (user | pro | admin),
emailSubscribed, createdAt
```

### Collection (saved stories)

```
id, userId, storyId, savedAt
```

---

## API structure

```
GET    /api/stories              # list with filters: topic, type, search, page
GET    /api/stories/:id          # single story
POST   /api/stories              # submit new story (Pro)
GET    /api/topics               # all topics with counts
GET    /api/stories/weekly       # story of the week

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh

GET    /api/me/collection        # saved stories (auth)
POST   /api/me/collection/:id    # save story (auth)
DELETE /api/me/collection/:id    # unsave story (auth)
PUT    /api/me/settings          # update email prefs (auth)

GET    /api/admin/stories/pending  # stories awaiting review (admin)
PUT    /api/admin/stories/:id      # approve/reject story (admin)
```

---

## Development workflow

### Start local dev

```bash
# Start PostgreSQL
docker-compose up -d

# Server
cd server && npm run dev

# Client
cd client && npm run dev
```

### Database

```bash
cd server
npx prisma migrate dev --name <migration-name>
npx prisma studio          # visual DB browser
npx prisma db seed         # seed topics and sample stories
```

### Tests

```bash
# All unit tests
cd server && npm test
cd client && npm test

# Single test file
cd server && npx vitest run src/path/to/test.ts
cd client && npx vitest run src/path/to/test.ts

# Watch mode (single file)
cd server && npx vitest src/path/to/test.ts

# E2E tests
cd client && npx playwright test

# Single E2E spec
cd client && npx playwright test e2e/path/to/spec.ts
```

### Lint & type-check

```bash
cd server && npx tsc --noEmit
cd client && npx tsc --noEmit
```

---

## Coding conventions

- **TypeScript** everywhere — no `any` types
- **Async/await** — no raw Promises
- **Error handling** — always wrap async routes with try/catch
- **Validation** — use Zod for API request validation
- **Naming:** camelCase variables, PascalCase components, kebab-case files
- **Imports:** absolute paths in client (`@/components/...`), relative in server
- **Commits:** conventional commits (`feat:`, `fix:`, `chore:`, `test:`)

---

## Environment variables

### Server (`server/.env`)

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sagewayai
JWT_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
RESEND_API_KEY=re_...
GROQ_API_KEY=gsk_...        # Phase 7
PORT=3001
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env`)

```
VITE_API_URL=http://localhost:3001
```

---

## MCP connections

- **Postgres:** connects to local `sagewayai` database — use to inspect schema, debug queries
- **Notion:** connects to SagewayAI project workspace — use to update task status
- **GitHub:** connects to sagewayai repo — use to create branches, PRs, check CI status

---

## Current phase

**Phase 1 — Claude Code Setup** (in progress)

Check Notion for current tasks: https://notion.so (SagewayAI workspace)

---

## Notes for Claude

- Always check existing Prisma schema before suggesting new models
- Prefer editing existing files over creating new ones when extending features
- When writing tests, focus on business logic not implementation details
- For UI components, follow the design system — sage green accent, editorial feel
- The reading experience is the core product — prioritise story reader UX
