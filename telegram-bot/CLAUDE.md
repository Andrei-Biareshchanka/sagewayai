# CLAUDE.md — Telegram Bot

Telegram bot for SagewayAI. Delivers a daily digest (quote + parable + AI reflection) to subscribers. Second client to the main SagewayAI backend — contains no business logic of its own.

## Stack

- **grammY** — TypeScript Telegram bot framework
- **Prisma** — database access (shared PostgreSQL with main server)
- **Zod** — API response validation
- **Vitest** — unit tests

## Architecture

```
telegram-bot/          ← this project (grammY, polling mode)
    ↕ HTTP
server/ (port 3001)    ← Express + Prisma backend
    ↕
PostgreSQL             ← shared DB: DailyDigest, Quote, Parable, TelegramSubscriber
    +
pgvector               ← cosine similarity for quote→parable matching
    +
Claude Sonnet 4.6      ← generates reflection + question (once/day, cached in DB)
```

**Deploy:** Railway (polling mode, not webhook)

## Key files

| File | Purpose |
|---|---|
| `src/index.ts` | Bot entry point — registers commands, callbacks, starts polling |
| `src/commands/daily.ts` | `/digest` command handler |
| `src/commands/start.ts` | `/start` — onboarding vs returning user |
| `src/commands/onboarding.ts` | New user flow: language → subscribe offer → first digest |
| `src/commands/subscribe.ts` | `/subscribe` and `/unsubscribe` handlers |
| `src/commands/settings.ts` | `/settings` — show language + subscription status |
| `src/commands/stats.ts` | `/stats` — admin-only subscriber analytics |
| `src/commands/situation.ts` | "🎯 For my situation" button — rate-limit check, prompt, text handler |
| `src/lib/digestApi.ts` | HTTP client to `GET /api/digest/daily?lang=` and `POST /api/digest/situation` |
| `src/lib/formatDigest.ts` | Formats digest as MarkdownV2 with spoiler on reflection |
| `src/lib/broadcast.ts` | Daily broadcast to all active subscribers |
| `src/lib/keyboard.ts` | Reply keyboard + share inline keyboard |
| `src/lib/syncCommands.ts` | Per-user dynamic slash menu via `setMyCommands` |
| `src/lib/i18n.ts` | All EN/RU strings — single source of truth |
| `src/lib/botInfo.ts` | Stores bot username after `bot.init()` |
| `src/lib/subscriber.ts` | DB helpers for TelegramSubscriber |
| `src/lib/markdown.ts` | `escapeMarkdown()` for MarkdownV2 |

## Commands

| Command | Visibility | What it does |
|---|---|---|
| `/digest` | Public | Daily digest with share button |
| `/settings` | Public | Shows language and subscription status |
| `/language` | Public | Change language EN/RU |
| `/subscribe` | Public | Subscribe to daily digest |
| `/unsubscribe` | Public | Unsubscribe |
| `/help` | Public | Shows all commands |
| `/stats` | Admin only | Subscriber analytics (requires `ADMIN_CHAT_ID` env) |

## Keyboard buttons

| Button | What it does |
|---|---|
| 📖 Daily digest / Дайджест дня | Same as `/digest` |
| 🎯 For my situation / Под мою ситуацию | Prompts user to describe their situation, then returns a digest tailored to it via `POST /api/digest/situation`. Rate-limited to 1 request per 24h per user. |

## Digest format (MarkdownV2)

```
💬 _quote text_
— Author

📖 *Parable Title*

parable content

👇 Tap blurred text to reveal the reflection

*💡 Reflection*
||hidden conclusion — spoiler||

*❓ Question*
visible question

[🔗 Share]  ← inline button, opens Telegram share sheet
```

- Reflection is hidden with Telegram spoiler tags (`||text||`)
- Question is always visible
- Share button includes quote + parable + question (no reflection) + bot link

## i18n

All user-facing strings live in `src/lib/i18n.ts`. Always add both EN and RU keys together. Use `t(language, 'key')` — TypeScript enforces valid keys.

## Dynamic slash menu

After subscribe/unsubscribe/language change, `syncUserCommands()` calls `bot.api.setMyCommands()` with `scope: { type: 'chat', chat_id }` to show only the relevant command:
- Not subscribed → `/subscribe` in menu
- Subscribed → `/unsubscribe` in menu

## Broadcast

Runs daily at 8:00 server time via `setTimeout` + `setInterval` in `src/index.ts`. Digest is cached in `DailyDigest` DB table — Claude API called only once per day regardless of subscriber count.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | From @BotFather |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SAGEWAYAI_API_URL` | Yes | Main server URL (default: `http://localhost:3001`) |
| `ADMIN_CHAT_ID` | No | Your Telegram chat ID — enables `/stats` command |

## What's been built (as of 2026-06-27)

- [x] Daily digest: quote + parable + spoiler reflection + visible question
- [x] Onboarding flow: language → subscribe offer → first digest
- [x] `/settings` command
- [x] Subscribe/unsubscribe via slash commands only (not keyboard buttons)
- [x] Dynamic per-user slash menu
- [x] Share button with digest preview (quote + parable + question)
- [x] EN/RU bilingual — all content and UI
- [x] `/stats` admin command
- [x] Daily broadcast to all active subscribers
- [x] "🎯 For my situation" button — situation-based digest, rate-limited 1/day

## Potential next features

- Referral tracking (`?start=ref_{userId}` in share link)
- Digest reactions (❤️ 💡 🙏) — needs `DigestReaction` table
- Timezone preferences for broadcast delivery
- Category preferences — filter parable categories
