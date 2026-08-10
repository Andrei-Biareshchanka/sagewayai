# Manual parable backfill (no real API calls) — process

**Status:** active process, used by explicit user decision (2026-07-22) — instead of `server/scripts/backfill/backfill-parable-insights.ts` (which calls the real `generateReviewedParableInsight` through the Opus 4.8 + Haiku API and costs real money).

**Trade-off accepted here:** lenses and guardrail rules are followed manually (Claude Code follows the same prompt as the real pipeline), but the code-level checks (`findValidationIssue`) and the Haiku review gate (`reviewDeepReflection`) are either a free code-only check or not run at all unless explicitly requested. This means: there is no automatic guarantee the text would have passed the official gate — only a manual imitation of the same criteria. See `docs/audit-content-model.md` if the context behind this decision needs to be recovered.

**If the constants in `server/src/lib/anthropic.ts` change** (`ROLE_FRAME`, `DO_NOT_USE_BLOCK`, `INCLUDE_BLOCK`, `INSIGHT_LENGTH_BY_LANGUAGE`, `INSIGHT_LENSES`, `IMAGE_STYLE_*`) — this file becomes stale. Check against the source before a large batch rather than blindly copying from here.

## Step 1 — pick the next N parables

```sql
SELECT sub.title, sub."slugRu", c.name as category, sub.pos, sub.pos % 7 as lens_idx
FROM (
  SELECT p.id, p.title, p."slugRu", p."categoryId", p."reflectionStatus",
    (ROW_NUMBER() OVER (ORDER BY p.id ASC) - 1) as pos
  FROM "Parable" p
) sub
JOIN "Category" c ON c.id = sub."categoryId"
WHERE sub."reflectionStatus" = 'DRAFT'
ORDER BY sub.pos
LIMIT <N>;
```

`pos` is the parable's position among **all** 80 parables by `id ASC` (not just among DRAFT ones) — the same value as `parableIndexInDb`, which `getInsightLens()` uses in the real pipeline. It's critical to keep `id ASC` across the whole table, otherwise the lenses drift from what the real backfill would have assigned.

## Step 2 — lens by position

`lens_idx = pos % 7`, deterministic, not freely chosen:

| lens_idx | key | instruction (verbatim from `INSIGHT_LENSES`, `anthropic.ts`) |
|---|---|---|
| 0 | bodily | Anchor the second level of insight in a specific bodily or sensory sensation — what tightens, what the breath does, what the eyes catch — in the exact moment the deeper truth becomes visible. |
| 1 | relational | Anchor the insight in a specific relationship dynamic — a coworker, a parent, a partner, a stranger — rather than a general 'people'. |
| 2 | threshold | Anchor the insight in the single second BEFORE the reader's usual reaction — the pause, the hesitation, the choice point most people never notice they have. |
| 3 | paradox | Anchor the insight in a paradox: a moment where the 'virtuous' or expected response actually makes things worse, not better. |
| 4 | retrospective | Build the conclusion so it retroactively re-frames something ordinary from the reader's past week — not hypothetical, something that plausibly already happened. |
| 5 | cost | Anchor the insight in a DELAYED price — not an immediate backfire, but something that quietly costs the reader later, weeks or years down the line, because of the easy choice made now. |
| 6 | witness | Anchor the insight in being SEEN — not what the reader feels internally, but what shifts in a specific moment when another person notices what they did or didn't do. |

If the same `lens_idx` comes up twice in one batch, that's fine (not re-rolled for uniqueness) — just write it with clearly different sensory/narrative details so it doesn't read as the same essay twice (see the prompt example below).

## Step 3 — gather data for the prompt

```sql
SELECT p.title, p."titleRu", p.content, p."contentRu", p.moral, p."moralRu",
       q.text, q."textRu", q.author, q."authorRu"
FROM "Parable" p
JOIN "ParableQuote" pq ON pq."parableId" = p.id AND pq."isPrimary" = true
JOIN "Quote" q ON q.id = pq."quoteId"
WHERE p."slugRu" IN (<slugs>);
```

Slugs (`slugRu`/`slugEn`) and the 3 `ParableQuote` rows are already assigned for all 80 parables (Steps 1 and 2a were done earlier) — don't touch them, only read.

## Step 4 — run the Opus subagent

`Agent` tool, `model: opus`, `run_in_background: false`. The prompt is self-contained (the agent doesn't see this conversation) and must include, verbatim:

- **ROLE_FRAME**: "You are a senior essayist writing about wisdom for adult readers — not a coach, not a guru, not a motivational speaker. Write the way a thoughtful person writes, not the way a model generates."
- `conclusion` structure: continuous prose (no headings/levels), 3 ascending levels (surface lesson → paradox/hard truth → the reader's own life), with the assigned lens applied.
- **Length**: EN 400-700 words (target), hard review-gate boundary 380-720. RU 350-600 (target), boundary 330-620 — don't pad artificially, shorter and denser is better.
- **3 questions**, ascending difficulty (observational/text-based → personal experience → hard/vulnerable), question 3 stays open (not answered in the text).
- **DO NOT USE**: triads, stock phrases ("important to note"/"ultimately"/"in the end"/"resonates"/"profound", RU: "важно понимать"/"в конечном счёте"/"резонирует"/"поистине"), "dear reader", restating the moral as an ending, **no more than ONE "not X, but Y" construction per text** (this is the rule most often violated — see `docs/audit-content-model.md`'s "Bamboo Tree" incident, where 6 such constructions turned up instead of 1), mixed alphabets within a single word, more than 4-5 dashes per text (soft target ≤2).
- **INCLUDE**: direct address to the reader ("you"), at least one bodily/sensory detail, exactly one non-obvious insight, question 3 left open.
- **RU-specific dialogue formatting** (if the conclusion happens to include direct speech — unlikely for an essay, but just in case): dash-prefixed lines, not guillemets («»); a blank line only between scene changes, not between lines of the same exchange.
- **Gender agreement (RU)**: before writing, note the grammatical gender `contentRu` establishes for every named character (`учитель`/`учительница`, `мастер`/`подруга`, verb endings like `сказал`/`сказала`, `он`/`она`). `conclusionRu` and `questionsRu` must carry that same gender through every verb, short-form adjective, and pronoun referring to that character — a character who is female in the parable cannot flip to masculine verb agreement in the reflection. This is the same class of bug `.claude/skills/parable-consistency-audit` found in the image pipeline (`strela-i-luk` — correctly-gendered RU text, wrongly-gendered downstream artifact); here the downstream artifact is the reflection text, not an image. **Image brief must carry the same gender too** — write the scene with the RU-established gender explicit (e.g. "an old female teacher", not "a teacher") so `imagePromptEn` doesn't default to male, the actual root cause found in that skill's audit.
- **Image brief**: scene (3-5 sentences, EN, **1-2 characters max** — Nano Banana doesn't generate more reliably than that), plus `imageAltEn`/`imageAltRu` (<125 characters, literally what's in the picture, not the moral), plus the final assembly `imagePromptEn` = `{IMAGE_STYLE_PREFIX} {scene} {IMAGE_STYLE_PALETTE} {IMAGE_STYLE_FORMAT}` — constants below, verbatim.

```
IMAGE_STYLE_PREFIX = "Flat, soft illustration in the style of a children's parable book — not a photograph, no photorealism, but with simple, warm, distinguishable character faces (eyes, eyebrows, gentle expression). Skin and clothing in soft warm neutral tones. Near-black (#1A1A1A) used only as a thin outline, never as a fill. No text, letters, writing, or lettering anywhere in the image."

IMAGE_STYLE_PALETTE = "Palette (use as a base, not literally): background/sky: warm near-white (#FAFAF8); midground surfaces, structures: muted sage green (#5C9E65), shadows in dark sage (#3E7048); light planes: (#EBF5EC), (#DFF0E1); warm accent (light source): muted ochre/amber (#E8A33D), soft variant (#FBF0DF); outlines on faces and figures: near-black (#1A1A1A), used sparingly; background/haze/distance: warm neutral gray (#6B7280). No acid, neon, or cool blue tones. Exactly one warm light accent."

IMAGE_STYLE_FORMAT = "Format: 16:9, 2K (2048x1152)."
```

## Step 5 — objective check (the code itself, don't trust the agent's self-report)

A Python script (in scratchpad) counts, per language:
- word count (`str.split()`), checked against the review-gate boundaries (EN 380-720, RU 330-620)
- dashes (`[—–]`), must be ≤5 (soft target ≤2)
- mixed Latin/Cyrillic within a single word (regex)
- scan against the list of forbidden phrases (stock phrases/meaning-inflation)

Checked by eye (code doesn't catch this): no more than 1 "not X, but Y" construction per text — read manually, this turned out to be the most frequently violated rule in past batches.

## Step 5.5 — gender agreement check (also by eye, code doesn't catch this)

For every named human character in `contentRu`, re-derive their grammatical gender from the source text (verb endings, short-form adjectives, explicit nouns like `учительница`/`мастер`), then re-read `conclusionRu` and `questionsRu` end to end checking every verb/adjective/pronoun referring to that character still agrees. Also check `imagePromptEn`: the scene must state the character's gender explicitly in English (e.g. "an old woman", "her students") rather than a gender-neutral role noun ("a teacher") that an image model will default to male — this is the exact root cause documented in `.claude/skills/parable-consistency-audit/SKILL.md`. Flag and fix before Step 6, not after — this is cheaper to catch here than as a later image-audit finding.

## Step 5.6 — RU naturalness check: awkward negation (also by eye, code doesn't catch this)

Found 2026-08-10 in a `Situation` intro (`zavist-i-sravnenie`): "Сравнение почти никогда не честное." — grammatically valid, but stylistically clunky because it stacks a near-negator ("почти никогда") with a split negated short-form adjective ("не честное") instead of just stating the positive antonym ("Сравнение почти всегда нечестное."). The rewritten version says the same thing with one less negation to parse.

Read every RU sentence that combines a frequency-hedge word (`почти`, `едва ли`, `вряд ли`) with `не` + adjective/verb, and ask: does a plain positive-antonym phrasing exist and read more naturally? If yes, rewrite. A quick grep pass to surface candidates before the manual read (not a substitute for it — this only flags, it can't judge naturalness):

```js
const pattern = /(почти\s+(никогда|нигде|ничего)\s+не\s+\S+|не\s+совсем\s+не|вовсе\s+не\s*\S*\s*не)/gi;
```

**Applies to `Situation.introRu`/`metaDescriptionRu` too** — those are written ad hoc (no dedicated pipeline doc exists for them, unlike parable reflections above), but the same by-eye RU style checks (this one, the gender check in Step 5.5, and the "not X, but Y" limit in Step 5) apply before writing any bilingual essay-style copy to the DB, parable or Situation.

## Step 6 — write to the DB

SQL `UPDATE "Parable" SET conclusionEn=..., conclusionRu=..., questionsEn=...::jsonb, questionsRu=...::jsonb, imageAltEn=..., imageAltRu=..., imagePromptEn=..., reflectionStatus='REVIEWED', reflectionUpdatedAt=now() WHERE slugRu=...` — via `docker exec -i sagewayai-postgres-1 psql -U postgres -d sagewayai < file.sql`, dollar-quoting (`$tagN$...$tagN$`) for text containing quotes. **Local dev DB only** (`localhost:5433`), never prod directly.

## Step 7 — verify on the page

`npx tsx` type-check (`cd web && npm run type-check`), then `curl -s -o /dev/null -w "%{http_code}"` against `/ru/pritcha/<slugRu>` and `/en/pritcha/<slugEn>` for each new parable — must return 200.

## Step 8 — images (optional, separate)

Hand the user the finished `imagePromptEn` as text. Once they send back the generated files — match them to the scene by content (not just by order!), upload via `web/scripts/set-parable-image.ts <slugRu> <path> <altRu> <altEn>` (adapted from `set-digest-image.ts` for the `Parable` table, see `web/CLAUDE.md`).

## Optional later re-check

Three scripts in `server/scripts/` (written 2026-07-22, take slugs as arguments, default to all REVIEWED):
- `audit-manual-insights-metrics.ts` — free, length + dashes.
- `audit-manual-insights-codeonly.ts` — free, `findValidationIssue` (schema, tool-call artifacts, mixed alphabet).
- `audit-manual-insights.ts` — **real Haiku API call** (cheap, but not free), full `reviewDeepReflection`. Only run on explicit user request.
