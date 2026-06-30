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
PostgreSQL             ← shared DB: DailyDigest, Quote, Parable, TelegramSubscriber, BotEvent
    +
pgvector               ← cosine similarity for quote→parable matching
    +
Claude Sonnet 4.6      ← generates reflection + question (once/day, cached in DB)
```

**Deploy:** Railway (polling mode, not webhook). On each deploy `prisma db push` runs automatically before the bot starts.

## Key files

| File | Purpose |
|---|---|
| `src/index.ts` | Bot entry point — registers commands, callbacks, starts polling |
| `src/commands/daily.ts` | `/digest` command handler |
| `src/commands/start.ts` | `/start` — onboarding vs returning user, referral parsing |
| `src/commands/onboarding.ts` | New user flow: language → subscribe offer → first digest |
| `src/commands/subscribe.ts` | `/subscribe` and `/unsubscribe` handlers |
| `src/commands/settings.ts` | `/settings` — language, subscription status, referral count |
| `src/commands/stats.ts` | `/stats` — admin-only analytics dashboard |
| `src/commands/situation.ts` | "🎯 For my situation" button — rate-limit check, prompt, text handler |
| `src/lib/analytics.ts` | `trackEvent()` — fire-and-forget event tracking to BotEvent table |
| `src/lib/digestApi.ts` | HTTP client to `GET /api/digest/daily?lang=` and `POST /api/digest/situation` |
| `src/lib/formatDigest.ts` | Formats digest as MarkdownV2 with spoiler on reflection |
| `src/lib/broadcast.ts` | Daily broadcast to all active subscribers |
| `src/lib/keyboard.ts` | `buildKeyboard()` — reply keyboard; `buildShareUrl()` — MarkdownV2-safe share link embedded by `formatDigest` |
| `src/lib/syncCommands.ts` | Per-user dynamic slash menu via `setMyCommands` |
| `src/lib/i18n.ts` | All EN/RU strings — single source of truth |
| `src/lib/botInfo.ts` | Stores bot username after `bot.init()` |
| `src/lib/subscriber.ts` | DB helpers for TelegramSubscriber |
| `src/lib/markdown.ts` | `escapeMarkdown()` for MarkdownV2 |

## Commands

| Command | Visibility | What it does |
|---|---|---|
| `/digest` | Public | Daily digest with share button |
| `/settings` | Public | Shows language, subscription status, referral count |
| `/language` | Public | Change language EN/RU |
| `/subscribe` | Public | Subscribe to daily digest |
| `/unsubscribe` | Public | Unsubscribe |
| `/help` | Public | Shows all commands |
| `/stats` | Admin only | Full analytics dashboard (requires `ADMIN_CHAT_ID` env) |

## Keyboard buttons

| Button | What it does |
|---|---|
| 🎯 For my situation / Под мою ситуацию | Prompts user to describe their situation (with examples), returns a digest tailored to it via `POST /api/digest/situation`. Rate-limited to 1 request per 24h per user. |

**Keyboard sync strategy:** `buildKeyboard` is attached to every bot reply that does not already use an `InlineKeyboard`. The broadcast digest is sent daily to all subscribers with `reply_markup: buildKeyboard` — this auto-refreshes the keyboard for all users without any action on their part. Future keyboard changes propagate automatically.

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

[📤 Share](https://t.me/share/url?...)  ← inline text link inside message
```

- Reflection is hidden with Telegram spoiler tags (`||text||`)
- Question is always visible
- Share link is embedded as a MarkdownV2 inline link (not an InlineKeyboard button) so the `reply_markup` slot stays free for `buildKeyboard`
- Share link includes quote + parable + question (no reflection) + referral bot link

## Analytics

All events are tracked in the `BotEvent` table via `trackEvent()` in `src/lib/analytics.ts`. Always fire-and-forget — never blocks the main flow.

### Event types (`BotEventType`)

| Event | Trigger | Meta |
|---|---|---|
| `start` | New user ran `/start` | `{ source: 'organic' \| 'referral' \| string }` |
| `digest_opened` | User received a digest (command or broadcast) | — |
| `situation_used` | Tapped "🎯 For my situation" button | — |
| `situation_result` | Received situation digest successfully | — |
| `subscribe` | Subscribed via `/subscribe` or onboarding | — |
| `unsubscribe` | Unsubscribed via `/unsubscribe` | — |
| `language_changed` | Changed language | `{ from: string, to: string }` |
| `referral` | Credited to referrer when new user joins via their share link | `{ newUserId: string }` |

### Referral system

Share button embeds `?start=ref_{chatId}` in the bot link. When a new user opens the bot via that link, `/start ref_{chatId}` is sent — the bot stores `referredBy` on the new subscriber and fires a `referral` event crediting the original sharer. Users see their referral count in `/settings`.

### /stats dashboard (admin only)

```
📊 Bot stats

👥 Total: N
✅ Active: N
❌ Inactive: N
🆕 New this week: N

🌐 By language:
  EN: N
  RU: N

📊 Activity (last 7 days):
  — digests opened: N
  — situation searches: N
  — new subscriptions: N
  — unsubscriptions: N

🔄 Retention:
  — D1: N%
  — D7: N%

📥 New user sources (this week):
  — organic: N
  — referral: N
```

**D1** — users who started yesterday, active today.
**D7** — users who started 7 days ago, active in the last 7 days.

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
- [x] Onboarding flow: language → subscribe offer → first digest + situation button hint
- [x] `/settings` command with referral count
- [x] Subscribe/unsubscribe via slash commands
- [x] Dynamic per-user slash menu
- [x] Share button with referral link (`?start=ref_{chatId}`)
- [x] EN/RU bilingual — all content and UI
- [x] `/stats` admin dashboard — subscribers, activity, retention, sources
- [x] Daily broadcast to all active subscribers
- [x] "🎯 For my situation" button — situation-based digest, rate-limited 1/day
- [x] Event tracking — BotEvent table, 8 event types, fire-and-forget
- [x] Referral system — share link → referredBy stored → credited in /stats and /settings

## Potential next features

- Digest reactions (❤️ 💡 🙏) — needs `DigestReaction` table
- Timezone preferences for broadcast delivery
- Category preferences — filter parable categories
