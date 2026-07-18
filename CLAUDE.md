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
| **v4** | AI search by situation (planned: Vercel AI SDK + Groq) — not yet wired up; see `web/CLAUDE.md` for current unused/orphaned scaffolding |

## Architecture

```
sagewayai/
├── web/             # Next.js frontend (Vercel)  →  see web/CLAUDE.md
├── server/          # Express + Prisma backend  →  see server/CLAUDE.md
├── telegram-bot/    # Telegram bot
├── scripts/
│   └── sync-prisma-schema.js  # Copies server/prisma/schema.prisma (canonical) into web/ and
│                               # telegram-bot/ — see /schema-sync-check under "Custom slash commands"
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

## Language

**All files must be written in English — no exceptions.**

This includes: source code, comments, commit messages, documentation (CLAUDE.md, CONVENTIONS.md, README), Prisma schema comments, seed data descriptions, error messages, and variable names.

**Exception — bilingual user-facing content:** SagewayAI is a Russian-primary bilingual site (`html lang="ru"`). Literal Cyrillic strings are expected and allowed wherever they are actual product content meant to be read by users, crawlers, or search engines — not code. This covers (non-exhaustively):
- UI copy and labels that switch on `lang` (e.g. `DigestBlock`, `og-image.tsx` badge/tagline text)
- `web/public/llms.txt`
- JSON-LD fields describing page/site content (e.g. `description`, `headline`)
- Digest/parable content itself (titles, quotes, morals — sourced from the DB, already Cyrillic by design)

The rule still applies in full to identifiers, comments, commit messages, and docs — only literal content strings intended for end readers are exempt.

## Conventions

See **[CONVENTIONS.md](./CONVENTIONS.md)** for the full coding style guide.

- Conventional commits: `feat:`, `fix:`, `chore:`, `test:`
- TypeScript everywhere — no `any`
- Zod for all API request validation

## MCP connections

- **Postgres:** local `sagewayai` database — inspect schema, debug queries
- **Notion:** SagewayAI workspace — update task status
- **GitHub:** sagewayai repo — branches, PRs, CI status

## Custom slash commands

| Command | Purpose |
|---------|---------|
| `/sagewayai-reviewer` | Architecture-aware code review — checks TypeScript, Zod, Prisma patterns, error handling |
| `/schema-sync-check` | Verifies `web/`/`telegram-bot/`'s generated Prisma schema copies are byte-identical to what `scripts/sync-prisma-schema.js` would produce from the canonical `server/prisma/schema.prisma` — these three point at one database, so a stale copy can break or crash a service |
| `/parable-formatter` | Validate and format a new parable before adding to the database |
| `/new-parable [category]` | Scaffold a new parable interactively, validates with parable-formatter, appends to seed.ts |
| `/new-migration <name>` | Create a Prisma migration with confirmation and error guidance |
| `/seed-parable [category] [count]` | Insert generated test parables directly into the DB via MCP Postgres |

## Custom skills

Defined in `.claude/skills/` — Claude Code picks them up automatically.

| Skill | When to use |
|-------|-------------|
| `docs-maintainer` | Keeps `.claude/docs/` (`ARCHITECTURE.md`, `FOLLOWUPS.md`, `adr/`) current — living docs describe today's state and get edited in place, ADRs are one-time records of a decision or merged feature. `.claude/docs/` is gitignored (local-only); only `.claude/skills/` is committed. |
| `digest-images` | Attaches a user-provided image to a digest (site + Telegram DM + channel) — find the file, compare against the parable's literal content, write bilingual alt text, upload to Vercel Blob, link in the DB, verify, clean up. Also covers listing upcoming digests, topping up the draft buffer, and fetching full digest text. See `.claude/docs/adr/0003-digest-images.md` for the design behind it. |

## Custom MCP server

`server/src/mcp/index.ts` — exposes 3 tools Claude can call directly (no HTTP server needed):

| Tool | Description |
|------|-------------|
| `get_daily_parable` | Returns today's parable using the LRU selection strategy |
| `get_parable_stats` | Total count, per-category breakdown, last 7 days history |
| `get_parable_by_id` | Fetch a single parable by cuid |

Register locally in `.mcp.json` (gitignored):
```json
"sagewayai": {
  "type": "stdio",
  "command": "npx",
  "args": ["ts-node", "--project", "server/tsconfig.json", "server/src/mcp/index.ts"],
  "env": { "DATABASE_URL": "postgresql://postgres:postgres@localhost:5432/sagewayai" }
}
```

## Subagents

Defined in `.claude/agents/` — Claude Code picks them up automatically.

| Agent | File | When to use |
|-------|------|-------------|
| `research` | `.claude/agents/research.md` | Web search, npm version checks, docs lookup, package comparison, best practices |
| `security-reviewer` | `.claude/agents/security-reviewer.md` | Security audit — JWT misuse, data leaks, injection, cookie flags, dependency vulnerabilities. Runs automatically on every `gh pr create`. |

Never call `WebSearch` or `WebFetch` directly — delegate to the `research` agent.

The `security-reviewer` runs automatically before every PR. It blocks on critical issues (hardcoded secrets, password in response, SQL injection) and injects warnings for lesser issues (missing rate limiting, cookie flags).

## Automated hooks

Configured in `.claude/settings.json` (committed):

| Trigger | What runs |
|---------|-----------|
| Edit `server/prisma/seed.ts` | `parable-formatter` validates all parables in the file |
| `git commit` | `schema-sync-check` checks staged Prisma schema changes for drift across server/web/telegram-bot — blocks on drift |
| `git commit` | `sagewayai-reviewer` checks staged diff — blocks on violations |
| `gh pr create` | `schema-sync-check` checks branch's Prisma schema changes for drift across server/web/telegram-bot — blocks on drift |
| `gh pr create` | `sagewayai-reviewer` checks full branch diff — blocks on violations |
| `gh pr create` | `security-reviewer` scans for vulnerabilities — blocks on critical, warns on lesser issues |

## Scheduled jobs (GitHub Actions)

| Workflow | Schedule | What it does |
|---|---|---|
| `.github/workflows/send-daily.yml` | **Disabled** (`workflow_dispatch` only, no schedule) | Legacy v1 flow — emails the day's `DailyParable` to `EmailSubscriber`s via `POST /api/admin/send-daily`. Scheduled trigger removed 2026-07-08: the email template links to routes (`/parables/:id`, `/subscription/manage`) that no longer exist on the current site, so every scheduled send was 404-ing for recipients. Kept as manual-only in case it's revived with fixed links. |
| `.github/workflows/publish-digest.yml` | `22:00 UTC` daily (= `01:00` Moscow time, UTC+3, no DST — anchored to the primary RU/BY audience's clock) | Calls `POST /api/admin/publish-and-prepare`: publishes the pre-created `DailyDigest` draft for its day and pre-creates the *next* day's draft. See `server/CLAUDE.md`'s "Daily digest logic" for the full publish/bootstrap logic and why the cron time offsets dates by +1/+2 relative to UTC-today. |

Both workflows retry a Railway cold start (wake-up loop against `/api/health`, then `/api/health/db`) before calling their respective admin endpoint, and are guarded by a secret header (`x-send-secret` / `x-publish-secret`) checked against a `GitHub Actions` repo secret — not JWT/session auth, since these run outside any user session.

`schema-sync-check` exists because `server/`, `web/`, and `telegram-bot/` each deploy independently but point at the **same shared database**. `telegram-bot` runs `prisma db push` automatically on every deploy — if a shared model (e.g. `DailyDigest`) gains a field in one schema but not the others, the next push from the lagging package either drops that column or fails and takes the service down (this happened to the bot on 2026-06-30 when `slug`/`titleEn`/`titleRu` were added to `DailyDigest` in `server/` but not `telegram-bot/`).

**`server/prisma/schema.prisma` is now the single canonical source of truth** — `web/prisma/schema.prisma` and `telegram-bot/prisma/schema.prisma` are generated copies produced by `node scripts/sync-prisma-schema.js` (run it after any edit to the canonical schema, then commit all three files together). `schema-sync-check` verifies the copies are still byte-identical to what the script would produce, rather than semantically diffing fields — mechanical, not by discipline. See `.claude/commands/schema-sync-check.md`.

`telegram-bot`'s `BotEvent` model — originally created via `db push` directly, with no migration history in `server/` — was formally adopted into the canonical schema 2026-07-18 (migration `20260718000000_add_bot_event`, generated via `prisma migrate diff` against the live table shape and adopted with `prisma migrate resolve --applied` rather than actually run, since the table already existed in every environment). The sync script no longer needs a special case for it — it's just another model in the canonical schema now.

## Current phase

**Phase 1 — Done. Phase 2 — Done. Phase 3 — Done.** Check Notion for current tasks.

## Git & commit workflow

**IMPORTANT: Follow this workflow strictly on every task.**

### Branch-first rule
- Every task or feature gets its own branch: `feat/task-name`, `fix/bug-name`, `chore/topic`
- Never work directly on `main`

### Commit & PR — only on explicit user command
- **Never commit or push automatically**
- **Never create a PR automatically**
- Only commit when the user says "commit" or "make a commit"
- Only create a PR when the user says "create PR" or "make a PR"

### Suggest checkpoints proactively
After completing a logical unit of work, suggest:
> "Want to commit and create a PR? We can continue with the next step after merge."

This keeps the git history clean and incremental — one PR per meaningful step.

### PR descriptions
- **Never add** `🤖 Generated with Claude Code` footer to PR bodies
- **Never add** `Co-Authored-By: Claude` trailer to commit messages

### Diffs are always visible
- All file changes appear in the user's diff tray before any commit
- Never batch unrelated changes into one commit
- Small, focused commits — one reason to change per commit
