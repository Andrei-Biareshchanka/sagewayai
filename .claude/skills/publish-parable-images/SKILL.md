---
name: publish-parable-images
description: Takes newly generated parable illustrations sitting in the project root, matches each to the correct REVIEWED-but-imageless parable by content, audits them against the parable text (same checklist as parable-consistency-audit), uploads the ones that pass, asks ONE confirmation before syncing the now-fully-ready parables to production, then deletes the source image files. Use whenever the user says "залей картинки", "картинки в корне", "проверь и залей", or drops parable illustration files at the repo root and asks to ship them.
---

# Publish parable images (audit → upload → confirm once → prod sync → cleanup)

This exists so the user drops N image files at the project root and says "go" — not one approval per parable, per upload, per prod-write. **There is exactly one confirmation point in this whole flow** (Step 6, before touching production). Everything before that (matching, auditing, local upload) runs without asking; everything after (prod sync, cleanup) only happens once the user has said yes to that single question.

## Step 1 — find the images

```bash
ls "C:/_Claude_Code_Learning/sagewayai"/*.png "C:/_Claude_Code_Learning/sagewayai"/*.jpg "C:/_Claude_Code_Learning/sagewayai"/*.jpeg "C:/_Claude_Code_Learning/sagewayai"/*.webp 2>/dev/null
```

Root only — do not descend into subdirectories, to avoid touching unrelated project assets. If nothing matches, tell the user and stop.

## Step 2 — find candidate parables (images they're waiting for)

Local dev DB only (`localhost:5433`), via `mcp__postgres__query`:

```sql
SELECT "slugRu", "slugEn", "titleRu", "imagePromptEn", "imageAltRu", "imageAltEn", "contentRu"
FROM "Parable"
WHERE "reflectionStatus" = 'REVIEWED' AND "imageUrl" IS NULL
ORDER BY "createdAt" ASC;
```

These are parables that finished Phase 2 (deep reflection reviewed) and are waiting only on an image. If there are more images than candidates, or vice versa, flag the mismatch to the user rather than guessing which ones pair up — do not silently drop or duplicate.

## Step 3 — match each image to a parable by content, not by filename or order

Read each image file (the Read tool renders it). For each one, compare what's actually depicted against every candidate's `imagePromptEn`/`contentRu` and pick the best content match — same rule `docs/manual-backfill-process.md` Шаг 8 and `.claude/skills/digest-images` use ("match them to the scene by content, not just by order"). Filenames like `Generated Image <date> - <time>.png` carry no reliable ordering signal (generation order isn't upload/review order).

If two images look equally plausible for the same parable, or one image doesn't clearly match any candidate, stop and ask the user to disambiguate rather than guessing.

## Step 4 — audit each matched pair against the parable text

Full method: `.claude/skills/parable-consistency-audit/checklist.md`, sections A (skip — text-only, not relevant here) through D. In short, re-derive the scene from `contentRu` cold (RU is authoritative — do this *before* re-reading the existing `imageAltRu`, so the alt text doesn't prime the judgment), then check the delivered image against it:

1. Gender of every depicted human vs. RU nouns/verb endings
2. Age bracket vs. RU
3. Role plausibility
4. Character count vs. RU text (max 1-2 expected per the image-brief convention)
5. The specific object the parable turns on (not just "something roughly right")
6. Action/pose matches the described moment
7. Setting matches
8. No contradiction of the moral
9. No invented character/object/detail
10. No text/lettering baked into the image

Also verify `imageAltRu`/`imageAltEn` describe what's **actually in the delivered image**, not just what the brief asked for — rewrite them on the spot if they've drifted (this is normal, not a failure — an alt written from the brief before generation can end up slightly off from what was actually rendered).

**Do not flag**: art style, palette, ethnicity, clothing, background architecture detail — only factual mismatches per the list above.

Report the full batch verdict before doing anything else with any of them:

```
| Parable | Match | Verdict |
|---|---|---|
| master-chaya-i-ronin | file: Generated...11_12PM.png | ok |
| telenok-i-byk | file: Generated...10_39AM.png | ok |
```

## Step 5 — upload the ones that passed (local dev DB, no confirmation needed)

For each parable that passed Step 4 cleanly:

```bash
cd web && npx tsx scripts/set-parable-image.ts <slugRu> "<path-to-image>" "<altRu>" "<altEn>"
```

This resizes to 1600px + converts to WebP (quality 82) and uploads to the real Vercel Blob, then writes `imageUrl`/`imageAltRu`/`imageAltEn` on the **local dev DB** row only. Safe to do without asking — it doesn't touch production.

For any parable that failed Step 4: do not upload it. Report what's wrong and ask whether to hand the user a rewritten `imagePromptEn` for regeneration (Class A/C fix per `parable-consistency-audit`'s fix-class table) or skip it for now. Leave its source image file in place (don't delete unresolved ones in Step 8).

## Step 6 — the one confirmation

After Step 5, every parable that now has `reflectionStatus: REVIEWED` + `imageUrl` + both slugs in the **local dev DB** is fully ready. List them and ask exactly once:

> "N parable(s) are now fully ready in dev: [list]. Sync them to production?"

Do not proceed past this point without an explicit yes. If the user says no or doesn't respond yet, stop here — the local upload already happened and isn't undone.

## Step 7 — sync to production (only after yes)

```bash
cd server
export PROD_DATABASE_URL=$(grep '^# DATABASE_URL=' .env | sed 's/^# //' | cut -d= -f2-)
npx ts-node --project tsconfig.json scripts/sync-parables-to-prod.ts --dry-run <slug1> <slug2> ...
# review the dry-run output, then:
npx ts-node --project tsconfig.json scripts/sync-parables-to-prod.ts <slug1> <slug2> ...
```

`sync-parables-to-prod.ts` (checked in, not a scratch file):
- Refuses to run without `PROD_DATABASE_URL` set — never hardcode the prod connection string anywhere, including in this skill or in scratch scripts. Always extract it fresh from `server/.env`'s commented-out line.
- Refuses any parable that isn't `reflectionStatus: REVIEWED` with a non-null `imageUrl` and both slugs — a safety check independent of whatever this skill already verified.
- Idempotent — skips (doesn't error) any parable whose title already exists in prod, so re-running after a partial failure or a repeat invocation is safe.
- Upserts referenced `Quote` rows by `(text, author)`, resolving to prod's own id afterward (a quote can already exist in prod under a different id than dev's) — never assumes dev and prod ids match.
- One transaction for the whole batch — all requested parables land together or none do (`ROLLBACK` on any error, logged clearly).
- Bumps `Category.parablesCount` for affected categories.

Verify after commit (quick prod read, same shape as the dry-run check): each synced parable has `reflectionStatus: REVIEWED`, non-null `imageUrl`/embedding, and exactly 3 `ParableQuote` rows.

## Step 8 — clean up

Only delete image files that were successfully matched, uploaded, **and** synced to prod in this run:

```bash
rm "C:/_Claude_Code_Learning/sagewayai/<matched-and-synced-image-filename>"
```

Leave in place: any image that failed the Step 4 audit, was ambiguous in Step 3, or whose parable the user declined to sync in Step 6.

## Step 9 — final report

One summary: what shipped to prod (slugs), what was uploaded to dev only (if the user said no in Step 6), what was skipped and why, current prod parable/quote counts (`SELECT count(*) FROM "Parable"`, same for `"Quote"`), and which image files (if any) are still sitting at the project root and why.

## Rules

- Never touch production before Step 6's explicit yes — Steps 1-5 are dev-only and reversible.
- Never guess an image-to-parable match when ambiguous — ask.
- Never delete an image file that wasn't both uploaded and synced.
- Never hardcode or persist the production connection string anywhere — always re-extract from `server/.env` at use time.
- Root-only image scan — never recurse into subdirectories.
