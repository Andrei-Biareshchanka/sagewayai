# /schema-sync-check

`server/prisma/schema.prisma`, `web/prisma/schema.prisma`, and `telegram-bot/prisma/schema.prisma` are three independent schema files pointing at **one shared PostgreSQL database**. None of them owns migrations exclusively — any of the three can run `prisma db push` (telegram-bot does this automatically on every Railway deploy) and rewrite shared tables based on its own, possibly stale, copy of the schema.

If one package adds/renames/removes a field on a shared model and the others aren't updated in the same change, the next `db push` from an out-of-sync package either:
- silently drops a column another service depends on (data loss), or
- fails outright and blocks deploy/startup (this took the Telegram bot down on 2026-06-30 — `slug`/`titleEn`/`titleRu` were added to `DailyDigest` in `server/` but not in `telegram-bot/`).

This command checks all three schema files for drift on shared models.

## Steps

1. **Read all three schema files in full:**
   - `server/prisma/schema.prisma`
   - `web/prisma/schema.prisma`
   - `telegram-bot/prisma/schema.prisma`

2. **Identify shared models** — any `model X { ... }` block whose name appears in 2 or more of the files.

3. **For each shared model, compare field-by-field across every file that defines it:**
   - Field present in one file but missing in another → drift (this is what causes destructive `db push` diffs)
   - Same field name but different type or nullability (`String` vs `String?`, `Int` vs `String`) → drift
   - Same field name but different `@unique` / `@default` / `@relation` attributes → drift
   - Ignore: field ordering, comments, formatting differences

4. **Report findings:**

```
## Schema sync check

### Drift found (blocker)
- DailyDigest.slug: present in server/, web/ — missing in telegram-bot/
- DailyDigest.titleEn: present in server/, web/ — missing in telegram-bot/

### In sync
- Parable, Quote, Category, DailyParable, TelegramSubscriber — consistent across all files
```

5. **If drift is found**, the fix is always to add the missing field(s) to the lagging schema file(s) — never to delete the field from the file(s) that have it, unless this is an intentional, coordinated removal across all three packages plus a manual DB migration plan.

## Rules

- Never propose `--accept-data-loss` as a fix — that flag deletes real data, it doesn't fix drift.
- A model only existing in one schema file is fine (it's not shared) — only flag models that appear in 2+ files.
- Be specific: name the exact model, field, and which file(s) have it vs. which are missing it.
