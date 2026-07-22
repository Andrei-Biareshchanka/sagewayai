# Content Model Audit — Pre-Refactor (2026-07-19)

**Scope:** read-only audit ahead of the "canonical parable + secondary quote + 3-level conclusion + 3 graduated questions + Situation hub pages" refactor. No code changed. Findings only.

---

## 1. Data model (`server/prisma/schema.prisma`)

### What's there now

- **`Parable`** has `id, title, content, moral, titleRu, contentRu, moralRu, source, readTime, categoryId, createdAt, updatedAt, embedding`. **No `slug` field, no dedicated route/page.** Uniqueness is `@@unique([title, categoryId])` — not a URL-safe identifier.
- **`DailyDigest`** is the entity that owns almost everything URL/SEO-facing today: `date` (unique), `slug` (unique, nullable), `titleEn/titleRu`, `imageUrl`, `imageAltRu/En`, `conclusionEn/Ru`, `questionEn/Ru`, `isPublished`, `publishedAt`. It has FKs to exactly **one** `Parable` and **one** `Quote`.
- **`Parable ↔ DailyDigest`**: one-to-many. `@@unique([parableId, quoteId])` only prevents the *exact same* parable+quote pair from repeating — it does **not** stop a parable from being reused across many digests with *different* quotes. This is by design today (`services/digest.ts`'s cooldown + usage-penalty logic exists specifically because parables get reused).
- **Bilingual fields exist on `Parable`** (`titleRu/contentRu/moralRu`) — good, this part is already aligned with a canonical-page model. What's missing is only the URL identity (`slug`), not the language duplication.
- **`Category`** is a flat taxonomy (`name/nameRu/slug/color/parablesCount`) attached 1:1 to `Parable`. There is **no many-to-many join table** and nothing resembling "Situation" as a content entity. The closest existing thing, `SituationRequest`, is purely a rate-limit log (`ip, chatId, usedAt`) for the free-text semantic search endpoint — it has no relation to `Parable`, isn't a taxonomy, and isn't indexable content.

### Risk

- Every URL-worthy identifier today (`slug`, title, image, conclusion, question) lives on `DailyDigest`, i.e. on the **date-pairing**, not on the **parable**. There is no way to link to "this parable" independent of a specific digest occurrence. Making the parable canonical requires adding identity (`slug`) and content (deep conclusion, 3 questions) directly to `Parable`, which doesn't exist in any form yet — not even a placeholder single question field.
- `Category` has no situation/theme concept beyond `Quote.theme` (a loose nullable string on `Quote`, not a model, not attached to `Parable` at all). A `Situation` hub model would be entirely new, with no existing data to migrate from except perhaps backfilling from `Quote.theme` strings.

### What to change

- Add `Parable.slug` (unique, indexed) as the durable canonical identifier.
- Add parable-level deep-conclusion and 3-question fields (or a related 1:1 table, e.g. `ParableInsight`) — decide now whether these live directly on `Parable` or in a child table, since `DailyDigest` already shows the cost of cramming derived content onto the wrong entity.
- Introduce `Situation` as its own model with a `slug`, bilingual name, description, and a `SituationParable` (or similar) join table for the many-to-many with `Parable`.

---

## 2. Duplicate-content risk (the main concern)

### What's there now

- **Pairing pipeline:** `server/src/services/digest.ts` → `findParableForQuote(quoteId)` (line 72). It runs a raw pgvector query (`queryBestMatch`, line 55) ordering by cosine distance plus a `PARABLE_USAGE_PENALTY` (0.015/use) to discourage — but not prevent — the same "generalist" parables from winning repeatedly. Exclusion is only **temporal** (cooldown steps `[14,10,7,3,1,0]` days) and **pairwise** (a parable can never re-pair with the *same* quote id twice, via the permanent exclusion in `getPairedParableIds`). Nothing stops parable A from being paired with quote X today and quote Y in three weeks.
- **Rendering:** `web/app/[locale]/d/[slug]/page.tsx` + `DigestPageContent.tsx`/`DigestBlock.tsx` render the **full, untruncated parable body** on every digest page that uses it (per `web/CLAUDE.md`: "Shows the quote and full parable text unconditionally... no link to `/d/[slug]`" — that "no link" was a deliberate anti-duplication patch for the *related-digests* grid, but it does nothing about the parable body itself appearing verbatim on N different `/d/[slug]` pages over time).
- **Confirmed in production** (per `server/CLAUDE.md`'s diversity-penalty note, added in the branch this session started from): 34 digests observed, one parable already repeated 3× — i.e. its full body is live under 3 separate indexed, unique-slugged URLs (`/d/{slug-1}`, `/d/{slug-2}`, `/d/{slug-3}`) right now.
- **No `/pritcha/:slug` (or equivalent) page exists at all.** `web/app/[locale]/` only has `d/[slug]`, `digests`, `search`. So there's currently no *second* self-canonical page competing with the digest page — but that also means there is currently no canonical home for a reused parable's body; every reuse is a fresh full-text duplicate, each self-declaring its own canonical (`alternates.canonical` per `web/CLAUDE.md`'s `/d/[slug]` docs always points at itself).

### Risk

- This is a real, already-manifesting near-duplicate-content problem for Google: 3+ pages with ~90% identical body text (only the quote/conclusion/question differ), each self-canonical, each in the sitemap with `priority: 0.8`. Left alone, this scales linearly with reuse frequency (65% of the 80-parable pool is under-used, meaning the well-matched minority will keep recurring).
- Once a canonical `/pritcha/:slug` page exists, **it will conflict with `/d/[slug]`'s existing self-canonical unless one explicitly canonicalizes to the other.** The natural fix is: parable body appears in full only on `/pritcha/:slug` (self-canonical), and `/d/[slug]` either (a) shows a shortened parable excerpt + links to `/pritcha/:slug`, or (b) shows the full parable but sets `<link rel="canonical">` to `/pritcha/:slug` for the parable-body portion — in practice or (a), since Next.js canonical is page-level, not block-level. This is a bigger UX/rendering change than it sounds: `DigestBlock.tsx` is shared by three call sites (`HomeDailyDigest`, `DigestPageContent`, `SituationSearch`) and currently has no concept of "truncate + link".

### What to change

- Decide the source of truth for parable body rendering: full text only on `/pritcha/:slug`; every other surface (`/d/[slug]`, home, search result) shows an excerpt/summary + a link to the canonical parable page.
- `DigestBlock.tsx` needs a truncation mode + "read the full parable" link (this reverses the 2026-07 decision to remove exactly this kind of link — that decision was made in a world with no canonical parable page to link to; worth calling out explicitly so it isn't read as a regression).
- `/d/[slug]`'s `alternates.canonical` stays self-referencing (the digest pairing itself is unique content: specific quote + specific conclusion + specific question), but body duplication is resolved by not repeating the full parable text, not by cross-canonicalizing pages that also carry unique content.

---

## 3. Conclusion/question generation

### What's there now

- **Where:** `server/src/lib/anthropic.ts` exposes `generateReflection(quoteText, parableText, language)` (produces `{ conclusion, question }`) and `generateDigestTitle(...)`. Called from `server/src/lib/dailyDigest.ts`'s `buildReflections()` (line 126), which runs EN and RU generation **in parallel** (`Promise.all`, lines 128-133) alongside the two title generations.
- **Storage:** flat strings — `DailyDigest.conclusionEn/Ru`, `questionEn/Ru` (both `@db.Text`). One conclusion, one question, per digest, per language. No structure for "3 levels" or "3 graduated questions" — these are singular fields, not arrays/JSON.
- **RU/EN consistency:** not guaranteed by construction. Each language calls `generateReflection` independently with its own quote text (`quote.text` vs `quote.textRu ?? quote.text`) against the **same** `parableText` (English-only — `buildParableText` at line 80-82 always uses `parable.title/content/moral`, never the Ru fields, even when generating the Russian reflection). Two independent LLM calls with non-zero temperature can diverge in emphasis/depth between languages; the only post-hoc guard is `isWrongLanguage()` (checks for at least one Cyrillic character, retries up to 3× — a very loose language check, not a consistency check).

### Risk

- Expanding from 1 question to 3 graduated questions, and from a single conclusion to a 3-level 400–700 word structure, is a **schema + generation-function** change, not a prompt tweak: `generateReflection`'s return shape, `buildReflections()`'s destructuring, and both `DailyDigest` (or the new `Parable`-level insight table) need new fields. This is a moderate but contained change — the parallel EN/RU pattern and the per-field storage approach already generalize reasonably well to more fields.
- The RU/EN divergence risk gets worse, not better, at 400–700 words with 3 levels: more surface area for the two language calls to drift in structure (e.g. EN emphasizes level 2, RU emphasizes level 3). Worth deciding now whether to move to a single bilingual generation call (one prompt producing both languages, guaranteeing structural parity) rather than keeping two independent calls.
- Also note: since the parable body fed into `generateReflection` is always the English `parable.title/content/moral` (per `buildParableText`), the Russian reflection is currently generated *from the English parable text*, not from `contentRu`. This predates this task and isn't new duplication risk, but it's directly relevant to "guarantee RU/EN correspondence" and should be fixed alongside, not left as-is only because it wasn't asked about.

### What to change

- `server/src/lib/anthropic.ts`: extend `generateReflection` (or add a new function) to return `{ conclusionLevels: [l1, l2, l3], questions: [q1, q2, q3] }` per language, or migrate to one bilingual-output call for consistency.
- `server/src/lib/dailyDigest.ts`: `buildReflections()` needs to assemble/store the new shape; `buildParableText()` needs a RU variant so the Russian generation call is actually grounded in `contentRu`, not the English text.
- Schema: new fields (or child table) to hold the 3-level structure and 3 questions per language — decide whether these belong on `DailyDigest` (per-pairing framing) or on the new canonical `Parable`/`ParableInsight` (per-parable framing) — given the stated goal ("deep conclusion... on the canonical page"), this content likely belongs on the parable side, generated once per parable (or per parable+quote-pairing, if the quote is meant to color the conclusion) rather than regenerated identically per digest reuse.

---

## 4. SEO infrastructure

### What's there now

- **`web/app/sitemap.ts`**: includes only 3 URL families today — home (`/{locale}`), digest archive (`/{locale}/digests`), and individual digests (`/{locale}/d/{slug}`, `isPublished: true` only). **No `/pritcha` or `/situacii` entries** — they don't exist as routes yet, so naturally absent; when built, both must be added here following the existing `localeAlternates()` helper pattern (already reciprocal, already handles `x-default`-style per-locale alternates).
- **`canonical`/`hreflang`**: per-page `generateMetadata` builds `alternates.languages` pointing each locale at its *sibling* locale's URL (not itself) — confirmed correct/self-consistent on home, `/d/[slug]`, `/digests`, `/search`. Home additionally sets an explicit `x-default → /ru`. The other three page types don't set `x-default` (only reciprocal `ru`/`en`) — worth deciding if that's intentional (multi-page x-default is debatable SEO practice) or an oversight to fix uniformly once new page types exist.
- **Internal situation search**: `GET /[locale]/search` is a real, indexable, linked page (linked from `SituationCTA` on home + digest pages) with **no `robots: { index: false }`** set — unlike `/digests`, which explicitly sets `robots: { index: false, follow: true }` for `page > 1` (`web/app/[locale]/digests/page.tsx:90`). Confirmed via grep: `/search/page.tsx` has zero `robots` handling.
- **Search *results*** aren't separate URLs at all — `SituationSearch.tsx` is a client component that POSTs to `/api/situation` and renders the result in place; there is no `?q=` or result-specific URL to accidentally index. So "noindex search results" isn't a live risk today (no crawlable result URLs exist) — but note `page.tsx`'s `WebSite` JSON-LD already declares a `SearchAction` pointing at `/search?q={search_term_string}`, which implies a future intent to make `q` a real, prefillable (and crawlable) query param. If that's implemented, it becomes a real result-page duplication risk and will need `noindex` at that point.

### Risk

- `/search` itself (the static form page, not hypothetical result URLs) is currently indexable — that's probably fine as-is (it's one static page, not per-query), but flag it for a decision once `?q=` prefill/SSR of results ships, since that's the point where duplicate/near-empty result pages could get crawled and indexed.
- New `/pritcha` and `/situacii` page types must be added to `sitemap.ts` at build time — trivial mechanically (same pattern as `digestEntries`), just don't forget it; it's an easy thing to ship a new route without updating the sitemap generator.

### What to change

- `sitemap.ts`: add `pritchaEntries` (from `Parable.slug`, likely low-changing content → longer `revalidate`/lower `changeFrequency` than digests) and `situaciiEntries` (from new `Situation.slug`).
- Decide `x-default` policy once new page types exist — apply uniformly rather than only-on-home.
- Revisit `/search` `robots` policy specifically at the point `?q=` becomes a real crawlable parameter (not now).

---

## 5. Concrete intervention points

### (a) Canonical parable page (`/pritcha/:slug` or similar)
- `server/prisma/schema.prisma` — add `Parable.slug` (+ migration via `/new-migration`, mind `schema-sync-check` since this is the canonical schema copied to `web/`/`telegram-bot/`).
- `server/src/lib/slug.ts` — reuse/extend `buildDigestSlug`'s collision-suffix pattern for parable slugs.
- `web/app/[locale]/pritcha/[slug]/page.tsx` (new) + a content component (new, or a truncation-aware variant of `DigestBlock.tsx`).
- `web/app/[locale]/d/[slug]/page.tsx`, `DigestPageContent.tsx`, `components/DigestBlock.tsx`, `components/HomeDailyDigest.tsx`, `components/SituationSearch.tsx` — all currently render the full parable body inline; all need to switch to excerpt + link once the canonical page exists.
- `web/app/sitemap.ts` — add parable entries.
- `web/prisma/schema.prisma`, `telegram-bot/prisma/schema.prisma` — synced copies, via `scripts/sync-prisma-schema.js` (mechanical, per root `CLAUDE.md`).

### (b) 3-level conclusion + 3 graduated questions
- `server/prisma/schema.prisma` — new fields/table (decide `DailyDigest` vs new `Parable`/`ParableInsight` per §3).
- `server/src/lib/anthropic.ts` — `generateReflection` (or a new function) reshaped to return the 3-level/3-question structure; prompt rewritten accordingly.
- `server/src/lib/dailyDigest.ts` — `buildReflections()`, `buildParableText()` (needs a RU-aware variant), `createDigestForDate()`'s field mapping.
- `server/src/services/digest.ts` — if this content moves to be per-parable rather than per-pairing, `findParableForQuote` may need to also trigger/read insight generation rather than `dailyDigest.ts` doing it per digest.
- `web/components/DigestBlock.tsx`, `DigestPageContent.tsx`, `HomeDailyDigest.tsx` — render the expanded structure; digest surfaces likely need a condensed variant per the stated "shorter in the digest" requirement, meaning `DigestBlock` needs a display-mode prop, not just more text.
- `web/hooks/useLocalizedDigest.ts` — field selection expands beyond single `conclusion`/`question` strings.
- Any backfill scripts analogous to `server/scripts/generate-digest-titles.ts` for existing digests missing the new structure.

### (c) `Situation` model + hub pages
- `server/prisma/schema.prisma` — new `Situation` model (id, slug, bilingual name/description) + join table (`SituationParable` or similar) for the many-to-many with `Parable`.
- New migration (`/new-migration`), synced to `web/`/`telegram-bot/` schema copies.
- Data backfill/authoring path — decide whether situations are AI-generated (clustering `Quote.theme` values or parable content) or manually curated; there is no existing source data for this beyond the loose `Quote.theme` string field, which was never designed as a taxonomy.
- `web/app/[locale]/situacii/page.tsx` (index) + `web/app/[locale]/situacii/[slug]/page.tsx` (hub, new) — need their own metadata/canonical/hreflang following the `/digests` or `/d/[slug]` pattern.
- `web/app/sitemap.ts` — add situation entries.
- Possibly `server/src/routes/` — a new endpoint if situations need to be queried/managed outside direct Prisma access from `web/` (web currently reads `DailyDigest`/related models directly via its own Prisma client, so this may not need a new Express route at all, consistent with existing `web/CLAUDE.md` architecture).

---

## Prioritized plan

**P0 — stop the duplicate-content bleeding, without new content types yet**
1. Add `Parable.slug` to `server/prisma/schema.prisma` + migration + schema sync (server/web/telegram-bot).
2. Build `/pritcha/:slug` canonical page (self-canonical, full parable body lives here only).
3. Update `DigestBlock.tsx` (and its 3 callers) to show a parable excerpt + link to `/pritcha/:slug` instead of the full body, closing the multi-URL full-text-duplication gap described in §2.
4. Add parable entries to `sitemap.ts`.

**P1 — deepen the canonical page's content**
5. Design + migrate the 3-level-conclusion / 3-question schema (decide `DailyDigest` vs `Parable`/`ParableInsight` placement per §3 first — this decision gates everything else in this phase).
6. Rework `generateReflection`/`buildReflections` to produce the new structure; fix the RU generation to use `contentRu` instead of the English parable text (existing bug, adjacent to this work).
7. Add a condensed-display mode to `DigestBlock.tsx` for the digest surface vs the full canonical-page rendering.
8. Backfill script for existing parables/digests missing the new fields.

**P2 — Situation hub pages**
9. Design `Situation` model + `SituationParable` join table; decide data-authoring approach (curated vs. derived from `Quote.theme`/embeddings).
10. Migration + schema sync.
11. Build `/situacii` index + `/situacii/:slug` hub pages, metadata/canonical/hreflang per existing page conventions.
12. Add situation entries to `sitemap.ts`; decide `x-default` policy across all indexable page types at this point rather than ad hoc.
