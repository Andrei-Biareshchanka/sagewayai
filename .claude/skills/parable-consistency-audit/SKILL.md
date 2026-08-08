---
name: parable-consistency-audit
description: Audits a batch of SagewayAI parables for content/image/translation consistency — compares contentRu vs content, the generated illustration vs the Russian text, imageAltRu/En vs what's actually in the picture, and conclusionRu/En + questionsRu/En vs what the parable actually says. Use whenever the user says "проверь притчи", "аудит притч", "следующая пачка", "картинка не совпадает с текстом", "batch N", or reports that an illustration shows the wrong person/object. Also use before regenerating any parable illustration, to rewrite imagePromptEn so gendered Russian roles survive into the English brief.
---

# Parable consistency audit

Checklist detail lives in `checklist.md` next to this file — read it before judging a batch.

## Why this exists

Found 2026-08-07: `strela-i-luk` ("The Arrow and the Bow") — RU and EN text both correctly describe a female teacher (`Учительница`/`teacher...her`), but the generated illustration shows a man, and `imageAltRu` still says "Учительница" (describes the text, not the delivered picture).

Root cause: `server/scripts/backfill-parable-insights.ts` (the image-brief call, `generateParableImageBrief`) is fed only the **English** `title`/`content`/`moral`. English role nouns (teacher, student, traveler, master) carry no gender; the Russian equivalents do. The image generator defaults to male, and alt text gets written from the brief instead of from the finished image — so both `imagePromptEn` and `imageAltRu` can be wrong even when the parable text itself is perfectly translated. This is **not** a translation bug — check RU vs EN text first and expect it to usually pass; the real yield is in image-vs-RU-text.

There is no existing automated check for this — `server/scripts/audit-manual-insights*.ts` check length/dashes/schema only, `fix-wrong-language-titles.ts` only checks language, not accuracy.

## Scope rule

**10 parables per batch, one fresh Claude Code session per batch. Never audit all 80 at once** — the images alone blow the context budget past reliable judgement (~15 images is where quality degrades). If asked for a larger batch, propose splitting it instead of complying.

## Step 1 — resolve the batch

If the user names a batch number/range, resolve it via `pos` (the same `ROW_NUMBER() OVER (ORDER BY id ASC)` ordinal used everywhere else in this project — `docs/manual-backfill-process.md`, `getInsightLens()`):

```sql
SELECT pos, id, "slugRu", "slugEn", title, "titleRu"
FROM (SELECT (ROW_NUMBER() OVER (ORDER BY id ASC)) AS pos, * FROM "Parable") p
WHERE pos BETWEEN <from> AND <to> ORDER BY pos;
```

If the user just says "batch 1" / "начни аудит" with nothing else, use the **pre-triage list** below instead of the first 10 by `pos` — it's risk-ranked, not arbitrary.

### Pre-triage query (run once, free, catches the known failure mode)

```sql
SELECT (ROW_NUMBER() OVER (ORDER BY id ASC)) AS pos, "slugRu", title
FROM "Parable"
WHERE "contentRu" ~* '(учительниц|женщин|девочк|девушк|старух|бабушк|мать|матери|дочь|дочер|сестр|хозяйк|альпинистк|странниц|она )'
  AND "imagePromptEn" !~* '\y(woman|women|girl|female|mother|daughter|sister|she|her|hers|grandmother|lady)\y'
ORDER BY pos;
```

The `\y` word boundaries are load-bearing — without them `teacher ` false-matches `her `. This is a **prioritizer**, not a verdict: it will include false positives (feminine *inanimate* Russian nouns like `река`/`бабочка` triggering `она`) — clear those in the checklist pass, don't treat every hit as confirmed.

**Batch 1 (already computed, 2026-08-07):** `son-o-babochke` (pos 6), `reka-i-kamen` (8), `borba-babochki` (11), `strela-i-luk` (16, confirmed defect), `tri-voprosa-carya` (27), `urok-reki` (36), `karta-i-mestnost` (37), `goncharnyy-krug` (45), `nezakonchennyy-most` (70), `dva-semeni` (76). Batches 2+ are the remaining parables in `pos` order, 10 at a time, skipping anything already audited (track via `docs/parable-consistency-audit.md`, see Step 6).

## Step 2 — pull the full batch data

Use `mcp__postgres__query` (local dev DB, port 5433 per `docker-compose.yml`) — **not** `mcp__sagewayai__get_parable_by_id`, whose `.mcp.json` env points at port 5432 and is unreliable for this.

```sql
SELECT id, (ROW_NUMBER() OVER (ORDER BY id ASC)) AS pos, "slugRu", "slugEn",
  title, "titleRu", content, "contentRu", moral, "moralRu",
  "imageUrl", "imageAltRu", "imageAltEn", "imagePromptEn",
  "conclusionEn", "conclusionRu", "questionsEn", "questionsRu"
FROM "Parable" WHERE "slugRu" IN (<batch slugs>);
```

Never truncate the text you pull — same rule as `digest-images` skill.

## Step 3 — download the images

```bash
SCRATCH="<session scratchpad>/parable-audit"
mkdir -p "$SCRATCH"
curl -sL -o "$SCRATCH/<slugRu>.png" "<imageUrl>"
```

Blob URLs are public, unauthenticated `GET` — no token needed to read. Download the whole batch in one Bash call, then view each with the Read tool (renders images) next to that parable's `contentRu`.

## Step 4 — judge each parable

Full checklist in `checklist.md`. Order per parable:
1. RU ↔ EN text agreement
2. Image ↔ RU text (**RU is authoritative** — site is `lang="ru"` first)
3. Alt text ↔ image (not ↔ brief, not ↔ theme)
4. `imagePromptEn` ↔ RU text (flag even if the delivered image happens to be correct — otherwise the bug reappears on the next regeneration)
5. Conclusion/questions ↔ actual parable content (grounding, not craft — craft is already covered by `audit-manual-insights-*.ts`)

Rules:
- Look at the image **before** re-reading the alt text, so the alt doesn't prime the judgement.
- Don't flag style, palette, ethnicity, clothing, or background detail — only factual mismatches (gender, age, role, object, count, action, setting) and moral-contradicting compositions.
- If unsure, mark `?` and show the user the image rather than silently passing or failing it.

## Step 5 — report

Report the **whole batch first**, then fix — don't interleave, image regeneration is a human round-trip that would blow the batch's context budget if done mid-review.

```
## Batch 1 (pos 6–76, triage-selected) — 10 parables

| pos | slug | RU↔EN | image↔RU | alt↔image | prompt | reflection | verdict |
|----|------|-------|----------|-----------|--------|-----------|---------|
| 16 | strela-i-luk | ok | ✗ MAN vs учительница | ✗ | ✗ neutral | ok | FIX |
| 8  | reka-i-kamen | ok | ok | ok | ok | ok | clean |
```

Then per flagged parable, a short before/after block: RU quote, EN quote, what the image actually shows, what the alt says, what the prompt says, fix class (see below), and — for class A — a proposed rewritten `imagePromptEn` scene the user can hand to the external image generator.

## Step 6 — fix only what the user confirms

Authority rule (state once, don't relitigate per parable): **`contentRu` is authoritative for the image and `imageAltRu`.** **The parable text itself is authoritative over everything derived from it** (image, alt, prompt, conclusion, questions) — changing the text is the last resort, not the first.

| Class | Symptom | Fix |
|---|---|---|
| **A** | Image contradicts RU text | Rewrite the scene in `imagePromptEn` with explicit gender/age/count, hand to the user per `docs/manual-backfill-process.md` Шаг 8, then `npx tsx web/scripts/set-parable-image.ts <slugRu> <path> <altRu> <altEn>` — re-uploads to Blob and rewrites both alts in one step. Same Blob path (`addRandomSuffix: false, allowOverwrite: true`) so the URL is stable — verify with a cache-busting query string (`/pritcha/[slug]` has `revalidate = 86400`). |
| **B** | Alt text wrong, image fine | `UPDATE "Parable" SET "imageAltRu"=…, "imageAltEn"=… WHERE "slugRu"=…` — local dev DB first, then a `docs/prod-sync-*.sql` file against Neon, same pattern as existing prod-sync files. |
| **C** | `imagePromptEn` wrong/genderless, current image happens to be right anyway | Update `imagePromptEn` only — cheap, prevents recurrence on the next regeneration. Do this alongside every class-A fix too. |
| **D** | RU text diverges from EN text | **Do not auto-fix.** Present both, let the user decide which is right. Warn: editing `content`/`contentRu` invalidates the derived `conclusion*`/`questions*` and the parable's search embedding — `server/scripts/seed-embeddings.ts` needs a rerun after. |
| **E** | Conclusion/questions contradict the parable | Rewrite via `docs/manual-backfill-process.md` Шаг 4 (Opus subagent, **same lens** as originally used — `pos % 7`, don't reroll it), then its free objective checks. Keep `reflectionStatus = 'REVIEWED'`. |

Both writes are ordered **local dev DB first, then a `docs/prod-sync-<batch>.sql` file** applied to Neon (`DATABASE_URL` for prod is the commented-out line in `server/.env` — extract with `grep '^# DATABASE_URL=' server/.env | sed 's/^# //' | cut -d= -f2-`, never hardcode it). Blob is shared between local and prod — an image fix (class A) lands in prod the moment it's uploaded, *before* any DB sync — only regenerate images you're prepared to ship immediately.

Cost note: this audit itself is **zero paid API calls** — SQL, curl, and the session's own eyes. Only class E touches a subagent (Opus, manual per `docs/manual-backfill-process.md`), and only class A costs the user an external image generation.

After fixes land, append a row per confirmed finding to `docs/parable-consistency-audit.md` (create it on first use, same tone/language as `docs/manual-backfill-process.md`): `pos | slug | defect | fix class | status`. That file is the resume point for the next batch.

## Step 7 — clean up

```bash
rm -rf "$SCRATCH"
```

## Common mistakes to avoid (things that have actually happened)

- Treating this as a translation-review task — check RU↔EN, but the actual defect found so far is entirely in the image/alt/prompt layer, not the text.
- Writing alt text from `imagePromptEn` (the brief) instead of the delivered image — that's exactly how `strela-i-luk`'s wrong alt happened.
- Using the `\y`-less version of the triage regex — `teacher` false-matches the `her` fragment without word boundaries.
- Querying via `mcp__sagewayai__get_parable_by_id` — its `.mcp.json` env is pinned to port 5432, which doesn't match `docker-compose.yml`'s 5433 mapping.
- Fixing text (class D) unprompted — always a user decision, never silent.
- Auditing more than ~10–12 parables' images in one sitting — judgement quality degrades before token limits do.

## Long-term fix (not part of a single audit batch)

`server/scripts/backfill-parable-insights.ts`'s call to `generateParableImageBrief()` should pass the Russian fields (or both languages, with explicit gender/age instructions) instead of English-only — otherwise every newly added parable reintroduces this exact bug. Flag this to the user as a follow-up; don't silently patch the generation pipeline mid-audit.
