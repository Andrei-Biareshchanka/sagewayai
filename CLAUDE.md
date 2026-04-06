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

## Language

**All files must be written in English — no exceptions.**

This includes: source code, comments, commit messages, documentation (CLAUDE.md, CONVENTIONS.md, README), Prisma schema comments, seed data descriptions, error messages, and variable names.

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
| `/parable-formatter` | Validate and format a new parable before adding to the database |
| `/new-parable [category]` | Scaffold a new parable interactively, validates with parable-formatter, appends to seed.ts |
| `/new-migration <name>` | Create a Prisma migration with confirmation and error guidance |
| `/seed-parable [category] [count]` | Insert generated test parables directly into the DB via MCP Postgres |

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
| `git commit` | `sagewayai-reviewer` checks staged diff — blocks on violations |
| `gh pr create` | `sagewayai-reviewer` checks full branch diff — blocks on violations |
| `gh pr create` | `security-reviewer` scans for vulnerabilities — blocks on critical, warns on lesser issues |

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

### Diffs are always visible
- All file changes appear in the user's diff tray before any commit
- Never batch unrelated changes into one commit
- Small, focused commits — one reason to change per commit
