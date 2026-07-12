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

## Shared data models (read here, owned across packages)

- `TelegramSubscriber.referredBy` — the referring subscriber's `chatId`, set during `/start` referral parsing (`src/commands/start.ts`). Owned by `telegram-bot/`, mirrored in `server/` and `web/` schemas for `schema-sync-check` (see root `CLAUDE.md`).
- `SituationRequest` — rate-limit table for the "🎯 For my situation" flow (`src/commands/situation.ts`). Bot requests use `chatId` (not `ip`) so each subscriber gets an independent 24h limit, since all bot requests share one Railway IP.

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
| `src/lib/broadcast.ts` | Daily broadcast to all active subscribers; also publishes the same digest to the `@sagewayai` channel |
| `src/lib/formatChannelDigest.ts` | Formats the RU digest as MarkdownV2 for the channel post — bold AI-generated title, full parable text (no truncation, no spoiler) |
| `src/lib/keyboard.ts` | `buildKeyboard()` — reply keyboard; `buildShareUrl()` — MarkdownV2-safe share link embedded by `formatDigest`; `buildChannelKeyboard()` — inline "Читать на сайте →" button for the channel post |
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

If `digest.imageUrl` is set (from `DailyDigest.imageUrl` via `/api/digest/daily`), it's sent as its own `sendPhoto` message immediately before the text below — never as a caption, since Telegram caps captions at 1024 characters while the text (especially the channel's untruncated parable) routinely exceeds that. No-ops silently if unset (most digests don't have an image yet). Situation-based digests never have one (`fetchSituationDigest` always sets `imageUrl: null` — generated on the fly, not tied to a `DailyDigest` row).

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

After broadcasting to subscribers, `broadcastDailyParable()` waits `CHANNEL_PUBLISH_DELAY_MS` (15 minutes) before calling `publishToChannel()`, which posts the same day's digest to the `@sagewayai` Telegram channel (`TELEGRAM_CHANNEL_ID` env var). The delay is a deliberate offset from the subscriber broadcast — a hedge against a 2026-07-11 incident whose exact cause (see below) was found for a *later* recurrence but never fully proven for the first one; kept in place as cheap insurance. `publishToChannel` reuses the same in-memory `digestCache` populated by the subscriber loop — no extra API call. Always publishes in Russian (`lang=ru`), since the channel's audience is RU-primary regardless of individual subscriber language preferences. Skips with a specific `reason: 'no_channel_id' | 'no_slug'` if `TELEGRAM_CHANNEL_ID` is unset or the digest has no `slug` (older digests predating the slug field) — a broadcast to subscribers should never fail because the channel post can't be built. The whole function body (including the digest fetch, not just `sendMessage`) is wrapped in try/catch, so a transient failure can't escape as an unhandled rejection out of the fire-and-forget scheduler call in `src/index.ts`.

### Observability

Every daily run ends with `notifyAdmin()` sending a plain-text report (`📣 Daily broadcast report`) to `ADMIN_CHAT_ID` — subscriber send/deactivate counts, plus the channel publish outcome (`published` with slug / `skipped (TELEGRAM_CHANNEL_ID not set` or `digest has no slug)` / `FAILED` with error). No-ops if `ADMIN_CHAT_ID` is unset. `publishToChannel` also logs to stdout/stderr on every outcome (including the skip reason) for Railway Deploy Logs as a secondary trail.

This exists because before it, nothing logged on success, making a silent failure indistinguishable from a normal run — root cause of two real missing-channel-post incidents (2026-07-11, 2026-07-12). The second one was fully diagnosed via Railway's Console (a shell attached to the live container): `TELEGRAM_CHANNEL_ID` was empty in the *running process*'s environment even though the Variables dashboard showed the correct value — Railway only injects env vars at container start, and the service hadn't restarted since the variable was last corrected. A manual restart fixed it immediately. See `.claude/docs/adr/0005-telegram-channel-publish-incidents.md` for the full investigation.

The channel post differs from the subscriber DM: no spoiler tag on the reflection (shown in full), no date header, and it leads with the digest's AI-generated title (`digest.title`) in bold. The parable title and full parable text are rendered together as a single Telegram MarkdownV2 blockquote (every line prefixed with `>`, paragraphs separated by a bare `>` line) — Telegram renders consecutive `>`-prefixed lines as one continuous quoted block. `Вывод`/`Вопрос дня` section headers are bold. An inline "Читать на сайте →" button links to `https://sagewayai.com/ru/d/{slug}` for readers who want to save or share the page.

Telegram's Bot API has no way to set a custom text/blockquote color per message — formatting color always follows each viewer's own client theme, not something the sender can override. `formatChannelDigest()` doesn't attempt to fake this.

### Backfilling channel history

`scripts/publish-history-to-channel.ts` — one-off, manual-only script to post already-published digests to the channel (e.g. to seed history right after enabling `TELEGRAM_CHANNEL_ID`). Takes the last N published `DailyDigest` records (oldest first), posts each via the same `formatChannelDigest`/`buildChannelKeyboard` as the daily broadcast, with a 2s delay between posts to stay under Telegram's rate limit. Skips records missing a `slug` instead of failing the run. Not wired into any cron.

```bash
npx tsx scripts/publish-history-to-channel.ts --limit=5   # default limit is 5
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | From @BotFather |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SAGEWAYAI_API_URL` | Yes | Main server URL (default: `http://localhost:3001`) |
| `ADMIN_CHAT_ID` | No | Your Telegram chat ID — enables `/stats` command |
| `TELEGRAM_CHANNEL_ID` | No | `@sagewayai` — public channel username. Enables daily channel publishing alongside the subscriber broadcast; broadcast still runs normally if unset |

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
- [x] Daily digest published to `@sagewayai` channel alongside the subscriber broadcast (RU, full text, inline site link)

## Potential next features

- Digest reactions (❤️ 💡 🙏) — needs `DigestReaction` table
- Timezone preferences for broadcast delivery
- Category preferences — filter parable categories
