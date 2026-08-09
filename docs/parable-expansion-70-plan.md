# Parable expansion: +70 new parables — working plan

**Status:** planning done, execution not started (2026-08-08).

**Goal:** grow the library from 80 parables (10 per category × 8 categories) to 150, adding 70 new ones that do not duplicate — in title, story, or theme — any of the existing 80, or each other.

**Why batches of 7:** 70 / 7 = exactly 10 batches. Small enough to review for quality and cross-batch duplication before moving on, large enough to not stall on process overhead.

This plan has three phases. Phases 1 runs batch-by-batch (10 iterations). Phase 2 and 3 run afterward, batched by category or another convenient grouping — not necessarily aligned to the Phase 1 batches.

---

## Phase 0 — prerequisite (done 2026-08-08, branch `chore/update-parable-commands`)

Updated `/parable-formatter` and `/new-parable` (`.claude/commands/`) to match the current `Parable` schema — they previously only handled v1 (EN-only) fields and were stale relative to what shipped in PR #189:

- Added `titleRu` / `contentRu` / `moralRu` as required fields (adaptation, not literal translation)
- Added a two-layer duplicate check: exact `title ILIKE` / `titleRu ILIKE` (as before) **plus** semantic — embed the candidate via `getEmbeddings` (`server/src/lib/voyage.ts`, same `` `${title}. ${content} ${moral}` `` text the DB uses) and compare via pgvector cosine similarity (`embedding <=>`) against all existing parables *and* against anything already accepted earlier in the same batch. Flag ≥0.85 similarity for manual review, don't auto-reject.
- **Correction from the original draft of this plan:** slugs and quotes are *not* hand-authored by these commands. `slugRu`/`slugEn` and the 3 `ParableQuote` rows are produced by existing one-time backfill scripts that already handle this for the current 80 parables:
  - `server/scripts/seed-embeddings.ts` — populates `embedding` (Voyage AI, `voyage-3`, batched with rate-limit backoff)
  - `server/scripts/backfill-parable-slugs.ts` — RU→Latin transliteration + slugify, collision-safe (`-2`, `-3`, ...)
  - `server/scripts/backfill-parable-quotes.ts` — assigns each parable 3 quotes from the **existing** `Quote` pool by nearest cosine similarity (`quote.embedding <=> parable.embedding`), not by writing new `Quote` rows
  - All three are idempotent / only touch rows missing the relevant field — safe to re-run after every batch
- Run order after seeding a batch: `npx prisma db seed` → `seed-embeddings.ts` → `backfill-parable-slugs.ts` → `backfill-parable-quotes.ts`. New rows land with `reflectionStatus: DRAFT` (schema default).

---

## Phase 1 — base content, 10 batches of 7

Repeat per batch:

1. **Source candidates.** Pick 7 parables adapted from real public-domain traditions (Zen, Sufi, Hasidic, Aesop, Native American, Jataka/Buddhist, Taoist, Talmudic, African folktale, Desert Fathers, etc.), matched to whichever categories still need more. Cross-check theme against the existing 80 titles (already inventoried — see below) and against every parable added in prior batches, to avoid re-telling the same story under a new name (e.g. don't add another blind-men, bamboo/oak, or two-wolves variant — those already exist).
2. **Duplicate check.** Title ILIKE + semantic embedding similarity (Phase 0 tooling) against the full DB and against this batch's own drafts.
3. **Write EN + RU versions** for each: `title`, `content`, `moral`, `source` (real tradition name), plus one `Quote` (EN+RU, with author).
4. **Validate** via the updated `/parable-formatter`.
5. **Insert** into `server/prisma/seed.ts`, run `seed-embeddings.ts`, assign `slugRu`/`slugEn`. Rows land with `reflectionStatus: DRAFT` (schema default) — Phase 2 fields stay empty for now.
6. **Commit + PR** for the batch (small, reviewable diff — one PR per batch per project convention).

### Category target (rough, adjust as sourcing allows)

| Category | Current | Target after Phase 1 |
|---|---|---|
| wisdom | 10 | ~19 |
| motivation | 10 | ~19 |
| leadership | 10 | ~18 |
| journey | 10 | ~18 |
| loss | 10 | ~18 |
| risk | 10 | ~18 |
| trust | 10 | ~18 |
| meaning | 10 | ~18 |

### Batch tracker

- [x] Batch 1 (7) — done 2026-08-08: Tea Master and the Ronin (wisdom), Calf and the Bull (motivation), North Wind and the Sun (leadership), Farmer's Lost Horse (journey), Borrowed Jewels (loss), Gordian Knot (risk), Tie Your Camel (trust). DB at 87.
- [x] Batch 2 (7) — done 2026-08-08: Useless Tree (wisdom), Stutterer's Pebbles (motivation), Farmer Who Ruled Rome (leadership), Thread Through the Labyrinth (journey), Pearl at the Bottom of the Sea (risk), Elder Who Chased the Thief (trust), King's Ring (meaning). DB at 94.
- [x] Batch 3 (7) — done 2026-08-08: Triple Filter (wisdom), Ten Thousand Ways That Don't Work (motivation), Odysseus and the Sirens (journey), Selkie's Return + Zhuangzi's Drum (loss), Diogenes and the Emperor's Shadow + Obituary Read Too Soon (meaning). DB at 101.
- [x] Batch 4 (7) — done 2026-08-08: Salt Doll and the Ocean (wisdom), Four-Minute Mile (motivation), Captain Who Lost His Ship (leadership, Shackleton), Merchant No One Recognized (journey, Marco Polo), Hannibal's Elephants (risk), Father Who Ran (trust, prodigal son), Two Vast and Trunkless Legs of Stone (meaning, Ozymandias). DB at 108.
- [x] Batch 5 (7) — done 2026-08-08: Elephant and the Rope + Fox Without a Tail (wisdom), Emperor's New Clothes (leadership), Frog in the Slowly Warming Pot (risk), Camel in the Tent + Scorpion and the Frog (trust), Two Brothers and the Sheaves of Wheat (meaning). DB at 115.
- [x] Batch 6 (7) — done 2026-08-08: Wounded Healer of the Talmud (wisdom), Carpenter's Last House (motivation), King Who Commanded the Tide (leadership, Canute), Prince and the Four Sights (journey, Buddha), Woodcutter's Wish + God Every Living Thing Wept For (loss, Aesop + Baldr), Man Condemned to Push the Stone (meaning, Sisyphus). DB at 122.
- [x] Batch 7 (7) — done 2026-08-08: Physician Who Treated the Cause (wisdom), General Who Ate Last + Bridge of the Ten Thousand (leadership, Xenophon), Golden Bridge + One Unguarded Heel + Oracle's Ambiguous Answer (risk, Sun Tzu/Achilles/Croesus), Widow's Two Coins (meaning). DB at 129.
- [x] Batch 8 (7) — done 2026-08-08: Sculptor Who Only Removed + Two Frogs in the Cream (motivation), Unfinished Shroud (journey, Penelope), Boy Who Cried Wolf + Long Spoons + Debtor Who Was Forgiven (trust), Fisherman and the Businessman (meaning). DB at 136.
- [x] Batch 9 (7) — done 2026-08-08: Reluctant King Who Hid Among the Baggage + Three Hundred at the Narrow Pass (leadership, Saul/Thermopylae), Long Road to Ithaca + Sailor Who Would Not Look Back (journey, Cavafy/Lot's wife), Weeping of Rachel + Terracotta Army + Death of Enkidu (loss). DB at 143.
- [x] Batch 10 (7) — done 2026-08-08: Composer Who Could Not Hear + Runner Who Finished Last + Cut From the Team (motivation, Beethoven/Akhwari/Jordan), Man Who Sailed West Anyway (journey, Columbus), Wire Between the Towers + Aviator Who Flew Alone + Flight That Never Landed (risk, Petit/Lindbergh/Earhart). **DB at 150 — Phase 1 complete.**

Final category counts: wisdom 18, motivation 20, leadership 19, journey 19, loss 18, risk 20, trust 18, meaning 18. All 150 parables have `embedding`, `slugRu`/`slugEn`, and 3 `ParableQuote` rows each. All new rows are `reflectionStatus: DRAFT` — Phase 2 (conclusions/questions/image prompts) not started yet.

---

## Quotes expansion: +85 new quotes (added 2026-08-08, separate from the 70-parable plan above)

**Goal:** grow `Quote` from 114 to 199, adding 85 real, correctly-attributed quotes (public-domain authors only, same rule as `server/scripts/generate-quotes.ts`) under 5 new themes — one per parable category that didn't already have an aligned quote theme:

| New theme | Aligned parable category | Target count |
|---|---|---|
| `motivation-and-perseverance` | motivation | 17 |
| `leadership-and-service` | leadership | 17 |
| `journey-and-change` | journey | 17 |
| `trust-and-connection` | trust | 17 |
| `purpose-and-meaning` | meaning | 17 |

(Existing themes `wisdom-and-self-knowledge` → wisdom, `loss-and-acceptance` → loss, `courage-and-fear` → risk already align; `stoic-resilience`/`stoic-virtue-and-character` don't map to a category and are left alone.)

**Process per batch:** draft real quotes (EN + idiomatic RU rendering, not literal translation) → run `server/scripts/check-new-quote-similarity.ts <file.json>` (exact-text check + pgvector cosine similarity vs DB and within-batch, flags ≥0.9) → append to `server/scripts/data/quotes-generated.json` → `npx ts-node --project tsconfig.json scripts/seed-quotes.ts` → `npx ts-node --project tsconfig.json scripts/seed-quote-embeddings.ts` (re-embeds all quotes each run, fast — no rate-limit backoff needed unlike the parable embedding script).

**Real-source discipline is stricter here than for parables** — a quote must be an actual real quote from a real (public-domain) person, not an adaptation. The existing DB already covers a lot of the well-known Stoic/Confucian/Emerson corpus densely, so duplicate/near-duplicate hits during the similarity check are common and expected — check each flagged one by hand (`SELECT text FROM "Quote" WHERE author = '<name>'` to see what's already there) rather than trusting the similarity score alone, since two different real quotes by the same philosopher on a similar theme will legitimately score high.

### Quote batch tracker

- [x] Batch 1 — `motivation-and-perseverance` (17) — done 2026-08-08 (Seneca, Marcus Aurelius, Nietzsche, Confucius, Lao Tzu, Franklin, Edison, Emerson, Coolidge, Rumi, Samuel Johnson, Japanese proverb). DB at 131 quotes.
- [x] Batch 2 — `leadership-and-service` (17) — done 2026-08-08 (Lao Tzu, Sun Tzu, Confucius, Plato, Aristotle, Washington, Lincoln, Theodore Roosevelt, Machiavelli, Booker T. Washington, Frederick Douglass, Cicero). DB at 148 quotes.
- [x] Batch 3 — `journey-and-change` (17) — done 2026-08-08 (Heraclitus, Ovid, Lao Tzu, Marcus Aurelius, Seneca, Ecclesiastes, Tennyson, Whitman, Dante, Cervantes, Stevenson, Thoreau, Confucius, Augustine). DB at 165 quotes (embedding backfill hit Voyage 429 rate limit mid-run — no retry logic in `seed-quote-embeddings.ts`, unlike the parable version; re-run manually until it completes).
- [x] Batch 4 — `trust-and-connection` (17) — done 2026-08-08 (Cicero, Aristotle, George MacDonald, Booker T. Washington, Samuel Johnson, Emerson, Thoreau, Jane Austen, Shakespeare, Book of Proverbs, Confucius, Montaigne, Elbert Hubbard, Helen Keller). DB at 182 quotes.
- [x] Batch 5 — `purpose-and-meaning` (18, one extra to land on exactly 200) — done 2026-08-08 (Marcus Aurelius, Tolstoy, Ecclesiastes, Aristotle, Kant, Pascal, Goethe, Dostoevsky, Cicero, William James, Buddha, Seneca, Emerson, Helen Keller, Montaigne). **DB at 200 quotes total — quote expansion complete.**

**Rate-limit fix applied:** `server/scripts/seed-quote-embeddings.ts` had no retry/backoff (unlike the parable version) and kept hitting Voyage's 3 RPM free-tier cap mid-run. Added the same `BATCH_DELAY_MS` + retry-with-backoff pattern already used in `seed-embeddings.ts` — now self-recovers instead of needing manual re-runs.

**Important: new quotes were NOT automatically attached to existing parables.** `backfill-parable-quotes.ts` only fills *missing* `ParableQuote` positions — since all 150 parables already had all 3 positions filled from the original 114-quote pool, re-running it was a no-op. Wrote `server/scripts/recompute-parable-quotes.ts` (new, not a modification of the one-time backfill script) to force a full re-match: for every parable, delete its 3 existing `ParableQuote` rows and reassign the top-3 nearest quotes from the *full* 200-quote pool. Run once, 2026-08-08 — 111/150 parables got at least one new quote (129 distinct quotes now in use across all `ParableQuote` rows, up from a smaller working set before). Safe to re-run after any future quote-pool expansion — it's idempotent (a no-op for parables whose top-3 doesn't change).

### Existing 80 titles (for overlap checks — do not re-derive, just consult)

See `SELECT c.slug, p.title FROM "Parable" p JOIN "Category" c ON c.id = p."categoryId" ORDER BY c.slug, p.title;` for the live list. As of 2026-08-08 it includes (by category): journey (Fork in the Road, Long Way Home, Lost Key, Map and the Territory, Pilgrim and the Dust, Returning Traveler, River's Lesson, Shore and the Deep, Wanderer's Question, Two Monks and a River); leadership (Bamboo and the Oak, Candle and the Wind, Captain and the Storm, Gardener's Secret, General and the Cook, General's Humility, King's Three Questions, Lighthouse Keeper, Orchestra Conductor, Shepherd Who Became King); loss (Autumn Leaves, Broken Vase, Empty Nest, Fading Star, Last Letter, Melting Candle, Mustard Seed, Open Hand, Potter's Wheel, Willow Tree); meaning (Empty Throne, Forgotten Artist, King Who Asked Why, Lantern Carrier, Last Lesson, Name Carved in Stone, River's Purpose, Stonecutters, Two Seeds, Wanderer and the Stars); motivation (Arrow and the Bow, Bamboo Tree, Broken Violin, Burning Ships, Butterfly Struggle, Diamond Under Pressure, Mountain Climber, Second Try, Sleeping Giant, Starfish Thrower); risk (Eagle and the Cliff, Leap of the Frog, Locked Garden, Parachute, River Crossing, Seed and the Dark, Tightrope Walker, Two Doors, Unfinished Painting, Unopened Gift); trust (Blind Traveler, Borrowed Light, Bridge Builder, Captain's Word, Delayed Train, Hidden Roots, Seed and the Farmer, Tightrope and the Net, Unfinished Bridge, Village Well); wisdom (Blind Men and the Elephant, Butterfly Dream, Cracked Pot, Empty Cup, River and the Stone, Salt in the Water, Second Arrow, Sword of Discernment, Two Wolves, Weight of Resentment).

---

## Phase 2 — reflections (conclusions, questions, image prompts)

Run after Phase 1 is fully done (all 70 base parables in the DB), batched by category or another convenient grouping — does not need to follow the Phase 1 batch boundaries.

Follow `docs/manual-backfill-process.md` exactly (lens rotation by `pos % 7` over `id ASC` across the *whole* table, ROLE_FRAME, DO_NOT_USE_BLOCK, length gates, etc.). **2026-08-08 addition:** a gender-agreement check (Step 5.5) was added to the process doc — every named character's grammatical gender in `contentRu` must be preserved consistently through `conclusionRu`/RU questions and made explicit in the English image scene, same bug class `.claude/skills/parable-consistency-audit` found in the image pipeline.

- [x] Batch 1 (7, pos 80-86 — the same 7 parables as Phase 1's batch 1): `master-chaya-i-ronin`, `telenok-i-byk`, `severnyy-veter-i-solnce`, `propavshiy-kon-starika`, `odolzhennye-dragocennosti`, `gordiev-uzel`, `privyazhi-svoego-verblyuda` — done 2026-08-08 via one Opus subagent call. All 7 passed the objective checks (length, dashes, forbidden phrases, "not X but Y" count, mixed-script) and the manual gender-agreement check (notably: the wife in `odolzhennye-dragocennosti` stayed feminine throughout, `Солнце`/Sun stayed grammatically neuter — not masculine — in `severnyy-veter-i-solnce`). All 7 now `reflectionStatus: REVIEWED`. **Not yet verified visually** — local dev server wasn't running this session; `curl` the `/ru/pritcha/<slugRu>` and `/en/pritcha/<slugEn>` URLs (expect 200) before trusting this batch fully done.
- [x] Batch 2 (7, pos 87-93) — done 2026-08-08: `bespoleznoe-derevo`, `kameshki-zaiki`, `zemledelec-kotoryy-pravil-rimom`, `nit-skvoz-labirint`, `zhemchuzhina-na-dne-morya`, `starec-dognavshiy-vora`, `kolco-carya`. Gender check passed (tree stayed neuter, Ariadne stayed feminine throughout). 3 of 7 RU conclusions landed slightly under the 330-word soft floor (316-328) — left as-is per user decision rather than padding artificially; all still comfortably clear every other objective check. All 7 now `reflectionStatus: REVIEWED`. Still not visually verified (dev server not running this session).
- [ ] Batch 3 (7, pos 94-100)
- [ ] Batch 4 (7, pos 101-107)
- [ ] Batch 5 (7, pos 108-114)
- [ ] Batch 6 (7, pos 115-121)
- [ ] Batch 7 (7, pos 122-128)
- [ ] Batch 8 (7, pos 129-135)
- [ ] Batch 9 (7, pos 136-142)
- [ ] Batch 10 (7, pos 143-149)

---

## Phase 3 — images (after user generates them)

- [x] Batch 1 images (5 of 7 — 2 still pending): `master-chaya-i-ronin`, `telenok-i-byk`, `severnyy-veter-i-solnce`, `propavshiy-kon-starika`, `odolzhennye-dragocennosti` — done 2026-08-09. User generated via Nano Banana, images reviewed against `contentRu` per the `parable-consistency-audit` checklist (gender/role/object/count/moral all matched, no invented details), uploaded via `web/scripts/set-parable-image.ts`, compressed 1.5-1.7MB PNG → 35-58KB WebP. All 5 now have `imageUrl` + `reflectionStatus: REVIEWED` + both slugs — **fully render-ready in local dev DB only, not yet in production** (see below).
- [ ] `gordiev-uzel`, `privyazhi-svoego-verblyuda` (remaining 2 of batch 1)
- [ ] Hand off remaining `imagePromptEn` values to the user
- [ ] User generates images externally, sends files back
- [ ] Match each file to its parable by content (not by order)
- [ ] Upload via `web/scripts/set-parable-image.ts <slugRu> <path> <altRu> <altEn>`
- [ ] Verify `/ru/pritcha/<slugRu>` and `/en/pritcha/<slugEn>` return 200 for all 70
- [ ] Update `Category.parablesCount` for all 8 categories
- [ ] Update `.claude/docs/ARCHITECTURE.md` / `FOLLOWUPS.md` via the `docs-maintainer` skill once everything lands

## Production sync

**First 5 fully-ready parables synced to prod 2026-08-09** (Neon, via `server/.env`'s commented-out `DATABASE_URL` line): `master-chaya-i-ronin`, `telenok-i-byk`, `severnyy-veter-i-solnce`, `propavshiy-kon-starika`, `odolzhennye-dragocennosti`. Done via a one-off Node script (`pg` Client, transactional, `--dry-run` verified first) rather than a `docs/prod-sync-*.sql` file — synced: the 5 `Parable` rows in full (content, RU fields, slugs, embedding, image, conclusion/questions, `reflectionStatus: REVIEWED`), their 14 unique referenced `Quote` rows (upserted by `(text, author)` — one already existed in prod under a different id, requiring a dev-id→prod-id resolution step after upsert, not a straight id copy), 15 `ParableQuote` join rows, and `Category.parablesCount` bumped for the 5 affected categories (all +1). Prod now at 85 parables / 118 quotes (was 80/114). Verified post-commit: all 5 have `reflectionStatus: REVIEWED`, non-null image/embedding, and exactly 3 `ParableQuote` rows each. **These 5 are now live and visible on the production site** at `/ru/pritcha/<slugRu>` / `/en/pritcha/<slugEn>` (not separately curl-verified this session, but the same `REVIEWED` + both-slugs-non-null gate that governs `/pritcha/[slug]`'s `generateStaticParams` is satisfied).

**Everything else from Phases 1-3 (the remaining 145 parables, 82 quotes, and 65 not-yet-reflected parables) is still local-dev-only.** Repeat the same sync approach for future batches once their images land — a reusable version of the one-off script (not committed, was `server/scripts/_scratch_prod_sync.js`, deleted after use) would be worth writing properly if this becomes routine rather than re-deriving it each time.
