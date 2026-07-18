# /schema-sync-check

`server/prisma/schema.prisma` is the canonical schema for the shared PostgreSQL database that `server/`, `web/`, and `telegram-bot/` all point at. `web/prisma/schema.prisma` and `telegram-bot/prisma/schema.prisma` are **generated copies**, produced by `scripts/sync-prisma-schema.js` — the only intentional differences are each package's `generator client { ... }` block and one documented bot-only model (`BotEvent`, appended for `telegram-bot/` since it isn't in the canonical schema's migration history yet).

Before this existed, the three files were hand-copied and drifted twice in production:
- 2026-06-30 — `slug`/`titleEn`/`titleRu` added to `DailyDigest` in `server/` but not `telegram-bot/`. `telegram-bot` runs `prisma db push` automatically on every Railway deploy — the next deploy from the stale copy took the bot down.
- 2026-07-10 — similar drift on `imageUrl` caused a Vercel build failure and a near-collision between `telegram-bot`'s `db push` and `server`'s `migrate deploy` applying the same column at once.

This command checks that the copies are still byte-identical to what the sync script would produce right now — mechanically, not by semantic field comparison.

## Steps

1. Run: `node scripts/sync-prisma-schema.js --check`
2. If it exits `0` — report: "Schema copies are in sync with server/prisma/schema.prisma."
3. If it exits non-zero — report which package(s) are stale (from the script's stderr) and the fix:
   ```
   node scripts/sync-prisma-schema.js
   ```
   then stage and commit the regenerated `web/prisma/schema.prisma` / `telegram-bot/prisma/schema.prisma`.

## Rules

- Never hand-edit `web/prisma/schema.prisma` or `telegram-bot/prisma/schema.prisma` directly — both start with a `// GENERATED FILE` header for exactly this reason. Edit `server/prisma/schema.prisma` and re-run the sync script.
- Never propose `--accept-data-loss` as a fix for anything this check reports — that flag deletes real data, it doesn't fix drift.
- If `telegram-bot`'s `BotEvent` model needs to change, edit it in `scripts/sync-prisma-schema.js`'s `BOT_EVENT_MODEL` constant (not in the generated file directly) until it's formally adopted into `server/`'s canonical schema and migration history.
