---
name: digest-images
description: Attaches a user-provided image to a SagewayAI digest (site + Telegram DM + Telegram channel) — uploads to Vercel Blob, writes a literal bilingual alt description, links it in the DB, and cleans up. Use whenever the user says things like "добавил картинку", "вот картинка для дайджеста", "картинка для [дата/slug]", "загрузи картинку", or hands you an image file and mentions a digest/date/parable. Also use for adjacent digest-image-pipeline tasks: listing upcoming digests to prepare images for ("покажи ближайшие дайджесты", "какие дайджесты без картинки"), topping up the draft buffer ("создай дайджесты вперёд", "пополни буфер"), or fetching full untruncated quote/parable text for a digest to hand off for image-prompt writing.
---

# Digest Images

Full write-up of the design/history: `.claude/docs/adr/0003-digest-images.md` (local, gitignored). This skill is the *operational* procedure — follow it exactly, don't improvise steps.

## The workflow (image hand-off → live everywhere)

User generates an image externally (a separate chat/tool), downloads it, drops the file somewhere in the repo (almost always the repo root — that's the default drop location so far), and tells you which digest it's for (a date, a slug, or "tomorrow's parable" / "the frog one" etc.).

### 1. Find the file

```bash
find "<repo root>" -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.webp" 2>/dev/null | grep -v node_modules | grep -v ".next" | grep -v ".git" | grep -v "web/public"
```

If the user said "картинка для завтрашнего дайджеста" or similar without a slug, resolve the date to a slug first (see "List upcoming digests" below) — don't guess.

If there are multiple new candidate files and it's not obvious which is for which digest (or the user is choosing between several for the *same* digest), view all of them and compare against the parable's literal content before picking — see step 3.

### 2. Get the full digest content to compare against

Never rely on a truncated preview — always pull the untruncated quote/parable/moral for the target slug before judging fit or writing alt text:

```bash
cd web
cat > ./scratch-full-digest.ts << 'EOF'
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from './app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] ?? '' });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const d = await prisma.dailyDigest.findFirst({
    where: { slug: 'SLUG_HERE' },
    include: { parable: true, quote: true },
  });
  if (!d) { console.log('NOT FOUND'); return; }
  console.log(`Заголовок: ${d.titleRu}`);
  console.log(`Цитата: "${d.quote.textRu ?? d.quote.text}" — ${d.quote.authorRu ?? d.quote.author}`);
  console.log(`\nПритча: ${d.parable.titleRu ?? d.parable.title}`);
  console.log(d.parable.contentRu ?? d.parable.content);
  console.log(`\nМораль: ${d.parable.moralRu ?? d.parable.moral}`);
  await prisma.$disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
EOF
NEON_URL="$(grep '^# DATABASE_URL=' ../server/.env | sed 's/^# //' | cut -d= -f2-)" && timeout 30 env DATABASE_URL="$NEON_URL" npx tsx ./scratch-full-digest.ts
rm -f ./scratch-full-digest.ts
```

`DATABASE_URL` for prod (Neon) lives commented out in `server/.env` (the active `DATABASE_URL` there points at local Docker) — extract it with the `sed` pattern above rather than hardcoding it anywhere.

### 3. Judge fit, don't just accept

Compare the image against the **literal scene** of the parable — not its theme, title, or moral. A previous mistake in this project was writing alt text (and once, almost choosing an image) based on the digest's *theme* rather than what's actually depicted. Example of the distinction that matters: a parable about "letting go of imaginary burdens" is not well-served by an image of someone visibly straining under a heavy sack — that shows the *opposite* of the moral. Call this out to the user if a candidate image seems to visually contradict the story, and give a reasoned recommendation rather than silently picking one.

### 4. Write bilingual alt text — literal, not thematic

`imageAltRu` / `imageAltEn` must describe **what is physically depicted** (subjects, action, setting) — the same discipline as writing an `alt` attribute for accessibility. Do not reuse or paraphrase the digest's title/theme as alt text; that already lives elsewhere on the page and is a semantically different thing (see `.claude/docs/adr/0003-digest-images.md` for why this distinction was called out explicitly).

Good: *"Пять лягушек сидят на бревне у пруда, одна золотистая лягушка прыгает в воду, оставляя круги на поверхности."*
Bad: *"Иллюстрация к притче о нерешительности."* (describes the theme, not the image)

### 5. Upload and link

```bash
cd web
NEON_URL="$(grep '^# DATABASE_URL=' ../server/.env | sed 's/^# //' | cut -d= -f2-)"
BLOB_TOKEN="$(grep '^BLOB_READ_WRITE_TOKEN=' .env.local | cut -d= -f2- | tr -d '"')"
env DATABASE_URL="$NEON_URL" BLOB_READ_WRITE_TOKEN="$BLOB_TOKEN" npx tsx scripts/set-digest-image.ts \
  "<slug>" \
  "<path-to-image-file>" \
  "<alt на русском>" \
  "<alt in English>"
```

This uploads to Vercel Blob (`sagewayai-digest-images` store, path `digests/<slug>.<ext>`) and writes `imageUrl`/`imageAltRu`/`imageAltEn` on the matching `DailyDigest` row in one step. Re-running with the same slug **replaces** the image (`addRandomSuffix: false`), it does not duplicate.

### 6. Verify

```bash
cd web
NEON_URL="$(grep '^# DATABASE_URL=' ../server/.env | sed 's/^# //' | cut -d= -f2-)"
env DATABASE_URL="$NEON_URL" npx tsx scripts/list-upcoming-digests.ts | grep -A5 "<date>"
```

Confirm the line shows `🖼️ has image` for that date before telling the user it's done.

### 7. Clean up

Delete the original image file(s) from wherever they were dropped (repo root, typically) once successfully uploaded — they're now safely in Blob, no reason to leave them lying around as untracked files.

```bash
rm -f "<original file path>"
```

## Adjacent tasks

### List upcoming digests (what needs an image)

```bash
cd web
NEON_URL="$(grep '^# DATABASE_URL=' ../server/.env | sed 's/^# //' | cut -d= -f2-)"
env DATABASE_URL="$NEON_URL" npx tsx scripts/list-upcoming-digests.ts
```

Shows every unpublished draft (date, slug, title, quote, parable, image status). Use this to resolve "tomorrow" / "next 3 digests" / "which ones still need pictures" into concrete slugs — never guess a slug.

### Top up the draft buffer

The daily cron keeps a rolling buffer of unpublished drafts (target 10, replenishes when ≤7 remain — see `server/src/lib/dailyDigest.ts`'s `DRAFT_BUFFER_TARGET`/`DRAFT_BUFFER_REPLENISH_THRESHOLD` constants, that's also where to change those numbers if asked). To top up on demand instead of waiting:

```bash
cd server
NEON_URL="$(grep '^# DATABASE_URL=' .env | sed 's/^# //' | cut -d= -f2-)"
env DATABASE_URL="$NEON_URL" npx tsx scripts/prepare-future-digests.ts [target=10]
```

**This calls the real Claude API** (title + reflection generation) for each new draft — not free, and takes real time (roughly one Claude round-trip pair per draft). Confirm with the user before running if the target implies more than 2-3 new drafts.

## Recommended image format

**16:9 landscape.** Established after comparing options with the user: it's close to Telegram/OG's canonical link-preview ratio (1200×630 ≈ 1.91:1 — the site's fallback `/api/og` route already uses this), so custom images preview cleanly when shared. It also takes up less vertical space than a square or portrait image in the site's narrow reading column (`DigestBlock`, max-width 680px) and in Telegram's chat view. Square (1:1) is an acceptable fallback; portrait (9:16 — stories/reels format) is a poor fit for all three placements (site card, Telegram photo, OG preview) and should be discouraged if offered.

## Common mistakes to avoid (things that have actually happened)

- Using the digest's title/theme as alt text instead of describing the image literally.
- Assuming a caption/message has room without checking — Telegram's `sendPhoto` caption limit (1024 chars) is far tighter than a plain message (4096 chars); the channel format was specifically redesigned around this (drops the "Вывод" section, see `formatChannelDigestCaption` in `telegram-bot/src/lib/formatChannelDigest.ts`) — don't assume hiding text behind a spoiler (`||text||`) reduces the character count toward that limit; it doesn't, Telegram counts the full underlying string regardless of what formatting/spoiler entities are applied on top of it.
- Forgetting `DATABASE_URL` defaults to local Docker in `server/.env` — always override it with the commented Neon line for anything that should touch production data.
- Leaving the original image file uncommitted/untracked in the repo after uploading — always delete it once it's confirmed live in Blob.
