# Parable of the day: freeze the digest archive, stop minting new URLs

**Status:** planning done, execution not started. Production audited 2026-08-11.

**Goal:** keep every `/d/{slug}` page that already exists — live, indexed, untouched — but stop
creating new ones. From the switch date on, the daily pick is surfaced on the home page as a teaser
linking to the parable's canonical page (`/{locale}/pritcha/{slug}`), and Telegram links there too.
Selection becomes random-within-pool with a 70-day no-repeat guarantee.

---

## 1. What actually happens today (code verified 2026-08-11)

**It is still running daily.** Two independent schedules:

| When | What | Where |
|---|---|---|
| `22:00 UTC` (01:00 MSK) | `.github/workflows/publish-digest.yml` → `POST /api/admin/publish-and-prepare` — publishes UTC-today+1's draft, creates UTC-today+2's draft | `server/src/lib/dailyDigest.ts` |
| `08:00` server time | `telegram-bot` `broadcastDailyParable()` → DM to subscribers; +15 min → `publishToChannel()` to `@sagewayai` | `telegram-bot/src/lib/broadcast.ts` |

**Selection is already parable-first and already AI-free.** `createDigestForDate()`:

1. `selectDailyParable()` (`server/src/services/dailyParableSelection.ts`) — LRU by
   `MAX(DailyDigest.date)` per parable, `NULLS FIRST`, restricted to `reflectionStatus = 'REVIEWED'`,
   under `COOLDOWN_STEPS = [60, 45, 30, 21, 14, 7, 0]` (relaxes to the next window only when the
   stricter one yields zero candidates).
2. `getTimesShown(parableId)` — counts every `DailyDigest` row ever created for that parable.
3. `findQuoteForParable(parable, timesShown)` — `position = timesShown % 3` over the parable's
   3 pre-assigned `ParableQuote` rows.
4. `buildReflections()` — reads `conclusionRu/En` and `questionsRu/En` **straight off the parable**;
   `pickQuestion()` rotates the 3 questions with the same `timesShown`. Zero Claude calls.

So "a randomly picked parable of the day, no repeats for N days, published to Telegram" is ~90%
already live. What is missing: randomness inside the pool, a 70-day floor, and an end to minting one
new URL per day.

**The pages are NOT full duplicates.** `web/components/DigestBlock.tsx` already truncates both the
parable body (`PARABLE_TEASER_MAX_CHARS = 220`) and the conclusion (`CONCLUSION_TEASER_MAX_CHARS =
220`) and links out to `/pritcha/{slug}` whenever `parableCanonicalSlug` is non-null — always true
for a REVIEWED parable, and selection is REVIEWED-only. The full body renders only as a fallback for
parables with no canonical page. This was a deliberate earlier fix.

**So the problem is index bloat, not duplicate content:** one new thin URL per day whose only unique
content is the quote, one of the parable's 3 questions, and a date.

---

## 2. Production audit (read-only, 2026-08-11)

Run against the Neon prod DB (`# DATABASE_URL=` line in `server/.env`).

### Parables — pool is healthy, the 70-day floor is safe

| Metric | Prod |
|---|---|
| Total parables | 99 |
| `reflectionStatus = 'REVIEWED'` | 99 (100%) |
| REVIEWED **and** has `imageUrl` | 99 (100%) |
| REVIEWED **and** both slugs | 99 (100%) |
| Fully eligible for selection | **99** |
| Quotes | 133 |
| `ParableQuote` rows | 297 (= 99 × 3) |
| Parables without exactly 3 quotes | 0 |

**The blocker assumed by the previous draft of this plan is resolved.** 99 ≥ 70, every eligible
parable has an image and both slugs, and the quote-rotation data is complete. A 70-day cooldown holds
with room to spare.

> Note: `docs/parable-expansion-70-plan.md` still claims prod is at "85 parables / 118 quotes" with
> only 5 new parables synced. That is stale — prod is at 99/133. Worth correcting in that doc
> separately; it is not a dependency of this work.

### Digests — the archive is small and young

| Metric | Prod |
|---|---|
| `DailyDigest` rows | 58 |
| Published | 48 (2026-06-25 … 2026-08-11) |
| Published **with** slug | 48 (100%) |
| Unpublished drafts | **10** (2026-08-12 … 2026-08-21), **all already have slugs** |
| Slugs with a `-2`/`-3` collision suffix | 0 |
| Distinct parables used | 51 of 99 |
| Distinct quotes used | 50 of 133 |
| Digests with `imageUrl` | **17 of 58** |
| Missing `titleRu` / `titleEn` | 0 / 0 |

**The frozen archive is 48 slugs × 2 locales = 96 indexed URLs.** That is small — roughly 7 weeks of
publishing, not the "365/year" the earlier draft worried about. Freezing it costs almost nothing and
the pages are cheap to leave standing.

### Repeat history — the current cooldown has been degrading

7 parables have been shown more than once. Observed gaps between repeats:

```
32, 28, 25, 23, 22, 21, 4   (days)
```

Average gap across all repeats: 22.1 days. **The stated 60-day cooldown never actually held** — the
relaxation ladder dropped to the 21/30-day steps routinely, and once to 4 days (2026-06-29, in the
first week). Cause: at the time, the eligible REVIEWED pool on prod was far smaller than 99, so the
60- and 45-day windows kept coming back empty.

That is now fixed by data, not code: 48 of the 99 eligible parables have **never been shown**. At a
70-day window the candidate pool starts at 48+ and the ladder should never relax. This is worth
asserting in a test and worth watching for a month after launch.

---

## 3. Decision

- **Existing `/d/{slug}` pages stay.** Live, indexed, in the sitemap, in `generateStaticParams()`.
  No deletions, no redirects, no `noindex`. Whatever authority the 48 pages hold is kept.
- **No new `/d/` URLs from the switch date on.** Achieved by not writing `slug` on new `DailyDigest`
  rows — both `web/app/sitemap.ts` and `d/[slug]/page.tsx`'s `generateStaticParams()` already filter
  `where: { slug: { not: null }, isPublished: true }`, so a null slug excludes the row from both with
  zero extra code.
- **The 10 pending drafts get their slugs nulled too** (see Phase 2) — otherwise the freeze does not
  take effect for 10 more days. These drafts are unpublished, so no URL exists for them yet and
  nothing is lost.
- **`DailyDigest` rows keep being created daily.** They remain the sole source of truth for the
  cooldown (`MAX(date)` per parable) and both rotations (`getTimesShown`). They just stop having a
  public URL.
- **The home page becomes the daily surface** — it already renders the teaser correctly; its outbound
  links need repointing and its image needs a fallback.

---

## 4. Two gaps the audit surfaced

### 4.1 The home page shows the parable of the day without an image, most days

`web/app/[locale]/page.tsx` passes `imageUrl: digest.imageUrl` into `HomeDailyDigest` → `DigestBlock`.
On prod **41 of 58 digests have `imageUrl = null`**, while **99 of 99 parables have one**. So on a
typical day the daily block on the home page is imageless even though the parable it points at has a
finished illustration.

Fix (Phase 2): fall back to `digest.parable.imageUrl` / `imageAltRu` / `imageAltEn` when the digest's
own image is null. This matters more once the home page *is* the daily surface — it becomes the LCP
element and the main thing a first-time visitor sees. Same fallback belongs in the Telegram payload,
where `sendPhoto` is skipped on a null `imageUrl` for the same reason.

### 4.2 "At most one unpublished draft" is no longer true

`server/CLAUDE.md` and the comment above `getTomorrowDigest()` in `web/app/[locale]/page.tsx` both
state there is at most one unpublished draft at any time. Prod has **10** — someone ran
`server/scripts/digest/prepare-future-digests.ts`. Nothing is broken (`getTomorrowDigest()` orders by
`date ASC` and correctly returns the nearest one), but the comment is wrong and the buffer changes
how the freeze rolls out. Correct both while touching this code.

---

## 5. Phased plan

### Phase 1 — random-within-pool selection (server only, no URL changes)

Branch: `feat/parable-of-the-day-selection`

`server/src/services/dailyParableSelection.ts`:

- `COOLDOWN_STEPS = [70, 60, 45, 30, 21, 14, 7, 0]`. 70 is safe — prod has 99 eligible parables and
  48 never shown.
- Per step: build the pool of every REVIEWED parable whose last-shown date is older than the window
  (or never shown), and pick **at random** from it rather than taking the single least-recently-shown.
- Preserve the never-shown bias: if the never-shown subset is non-empty, draw from it first. A newly
  reviewed parable should not wait behind a random draw.
- Keep the relaxation ladder, the guaranteed termination at `0`, and the throw when no REVIEWED
  parable exists.
- **Log which cooldown step actually produced the pick.** The audit shows the old ladder was
  degrading silently for weeks; a one-line log (or an `notifyAdmin()` when the step is below 70) makes
  the next occurrence visible instead of only discoverable by SQL archaeology.

Tests (Vitest, `server/`): a parable shown inside the active window is never returned; relaxation
fires only when a window is empty; never-shown parables win; throws with an empty REVIEWED set.

Ships independently — nothing user-visible changes.

### Phase 2 — stop minting URLs + repoint links + image fallback (one PR, all three packages)

Branch: `feat/freeze-digest-archive`

These changes **must ship together**. Splitting them silently breaks the Telegram channel.

**`server/`**

- `src/lib/dailyDigest.ts` `createDigestForDate()`: stop calling `buildDigestSlug()`; leave
  `DailyDigest.slug` null on new rows. Keep the function and the column — the column holds every
  historical slug the frozen archive depends on.
- `GET /api/digest/daily`: add `parableSlugRu` / `parableSlugEn`, and make `imageUrl` fall back to the
  parable's image when the digest has none (see 4.1). Keep returning `slug` (now null on new rows) for
  one release so an un-redeployed bot doesn't break on a missing field, then drop it.
- One-off: null the `slug` of the 10 unpublished drafts.
  ```sql
  UPDATE "DailyDigest" SET slug = NULL WHERE NOT "isPublished";
  ```
  Safe — unpublished rows are excluded from the sitemap and from `generateStaticParams()` by the
  `isPublished` filter, so none of these slugs has ever been served as a URL. Run **after** the web
  deploy, so no build is mid-flight expecting them.

**`telegram-bot/`** — this is the trap:

- `src/lib/broadcast.ts:42` currently does `if (!digest.slug) return { status: 'skipped', reason:
  'no_slug' }`. With slugs gone, **the channel post stops silently, every day.** Change the guard to
  check the parable's locale slug, and rename the reason to `no_parable_slug`.
- `src/lib/broadcast.ts:47`: build the button URL as
  `${CHANNEL_BASE_URL}/ru/pritcha/{parableSlugRu}?utm_source=telegram&utm_medium=social&utm_campaign=channel_post`.
- `src/lib/keyboard.ts` `buildShareUrl()` and `src/lib/formatDigest.ts`: same repoint for the DM
  share link.
- `src/lib/broadcast.ts:78-80`: update the admin report wording for the renamed skip reason.
- `scripts/publish-history-to-channel.ts`: reuses the formatters — verify it still builds URLs for the
  historical slugged rows.

**`web/`**

- `app/[locale]/page.tsx`: select `parable.imageUrl` / `imageAltRu` / `imageAltEn` and fall back to
  them when `digest.imageUrl` is null (4.1). Fix the stale one-draft comment above
  `getTomorrowDigest()` (4.2).
- `components/HomeDailyDigest.tsx:32`: `shareUrl` is built from `data.slug` and points at `/d/`. With
  a null slug the share button disappears entirely. Rebuild from the canonical parable slug:
  `${SITE_URL}/${lang}/pritcha/${parableCanonicalSlug}?utm_source=share&utm_medium=social`.
- `components/DigestBlock.tsx:109`: the category pill links to `/{lang}/digests?category={slug}`.
  Repoint to `/{lang}/pritcha?category={slug}` — same filter, and that catalog keeps growing.
- **No changes to `sitemap.ts` or `d/[slug]/page.tsx`** — the null-slug filter handles exclusion by
  itself, and the 48 existing pages must keep rendering.

Verification before merge:

- `server/scripts/digest/create-tomorrow-test.ts` → new draft lands with `slug = null`
- `/sitemap.xml` still lists exactly the 48 historical digest URLs per locale, and no new one
- Home page renders the daily block **with an image**, a working share link, and a working link to
  `/pritcha/{slug}`
- `publishToChannel()` builds a `/ru/pritcha/...` URL and does not hit the skip path
- Spot-check 3 old `/d/{slug}` URLs still return 200 in both locales

### Phase 3 — post-launch checks

- Confirm the 48 old `/d/` URLs still return 200 and remain in `sitemap.xml`. A regression here is the
  single biggest risk of this change.
- Re-run the repeat-gap query after ~30 days; the minimum gap should be > 70:
  ```sql
  SELECT MIN(gap) FROM (
    SELECT date - LAG(date) OVER (PARTITION BY "parableId" ORDER BY date) AS gap
    FROM "DailyDigest") g WHERE gap IS NOT NULL AND gap IS NOT NULL;
  ```
  (Restrict to rows created after the switch date — historical gaps of 4–32 days will otherwise mask
  the result.)
- Search Console: `/d/*` impressions should stay flat, not fall. `/pritcha/*` should rise.
- GA4: `channel_post` UTM traffic lands on `/pritcha/*`.
- Run `docs-maintainer` for `.claude/docs/ARCHITECTURE.md`; write an ADR for the decision.
- Update `CLAUDE.md` (root), `web/CLAUDE.md`, `server/CLAUDE.md`, `telegram-bot/CLAUDE.md` — all four
  describe `/d/{slug}` as an actively growing content type. Also correct the stale prod counts in
  `docs/parable-expansion-70-plan.md`.

---

## 6. Explicitly out of scope

- **Deleting `DailyDigest` rows or the `/d/` pages.** The rows drive the cooldown and both rotations;
  the pages are deliberately kept indexed.
- **Redirects or `noindex` on the archive.** Reversible later — a `canonical` pointing at the parable
  page is a one-line change in `d/[slug]/page.tsx`'s `generateMetadata`, applicable any time without
  deleting anything.
- **Dropping the `slug` column or renaming `DailyDigest`.** No user-visible gain; a rename would touch
  all three Prisma schema copies plus the sync script.
- **The `/digests` archive listing.** Keeps working off the 48 historical slugged rows. Listings rarely
  rank, and it is date-sorted while `/pritcha` is category-sorted — weak overlap.
- **Backfilling `DailyDigest.imageUrl` for the 41 imageless rows.** The runtime fallback in 4.1 solves
  the display problem without a data migration.
- **`POST /api/digest/situation`** and **`send-daily.yml`** — unaffected / already disabled.

---

## 7. Open decisions

1. **When to null the 10 draft slugs** — immediately with the deploy (freeze effective at once) or let
   them publish out over 10 days (10 more URLs, gentler rollout). Plan assumes immediately.
2. **Whether the frozen `/d/` pages eventually get `canonical` → parable.** Not now. Revisit in
   ~3 months on Search Console data about whether those 48 pages earn impressions of their own.
3. **Whether to alert on cooldown degradation** or only log it. Plan assumes `notifyAdmin()` below 70,
   reusing the existing `src/lib/adminAlert.ts` path.
