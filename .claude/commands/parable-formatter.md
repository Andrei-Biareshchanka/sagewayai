# /parable-formatter

Validate and format a new parable before it is added to the database.

## Usage

Pass a parable as raw text or JSON. Examples:
- `/parable-formatter` then paste the parable text
- `/parable-formatter { "title": "...", "content": "...", "moral": "...", "category": "wisdom" }`

## Steps

1. **Parse the input** — accept either:
   - Free-form text (extract fields from it)
   - JSON object with parable fields

2. **Validate all required fields:**

| Field | Type | Rules |
|-------|------|-------|
| `title` | string | 5–100 chars, title case, no trailing punctuation, English |
| `content` | string | 100–2000 chars, at least 2 sentences, narrative form, English |
| `moral` | string | 20–300 chars, one clear lesson, no "The moral is..." prefix, English |
| `titleRu` | string | Required — RU adaptation of `title`, not a literal translation |
| `contentRu` | string | Required — RU adaptation of `content`, natural Russian, not machine-translated |
| `moralRu` | string | Required — RU adaptation of `moral` |
| `source` | string? | Optional — real tradition or author (e.g. "Zen tradition", "Aesop", "Sufi tradition") — avoid inventing a fictitious source |
| `readTime` | number | Auto-calculated: Math.ceil(content.split(' ').length / 200) |
| `category` | string | Must be one of the 8 valid slugs (see below) |

**Valid category slugs:**
`wisdom` · `motivation` · `leadership` · `journey` · `loss` · `risk` · `trust` · `meaning`

`slugRu`/`slugEn`, `embedding`, and the 3 `ParableQuote` rows are **not** produced by this command — they're filled in afterward by existing backfill scripts (see step 6). Don't hand-author a slug or a quote here.

3. **Content quality checks (apply to both EN and RU):**
   - `content`/`contentRu` must not start with "Once upon a time" / "Жил-был" (too generic)
   - `moral`/`moralRu` must not duplicate the last sentence of `content`/`contentRu` word-for-word
   - `title`/`titleRu` must not be identical to the `moral`/`moralRu`
   - No placeholder text: "Lorem", "TODO", "example", "test"
   - `title`/`content`/`moral` must be English only (no Cyrillic); `titleRu`/`contentRu`/`moralRu` must be Russian (Cyrillic), not a mechanical transliteration of the English

4. **Check for duplicates** — two layers, both required:

   a. **Exact title match** via MCP Postgres:
      ```sql
      SELECT id, title FROM "Parable" WHERE title ILIKE '<title>' OR "titleRu" ILIKE '<titleRu>';
      ```
      If a match is found — report it and stop.

   b. **Semantic duplicate check** — a different title can still retell the same story (e.g. another "blind men and an elephant" or "two wolves" variant). Build the same embedding text the DB uses (`` `${title}. ${content} ${moral}` ``), embed it via Voyage AI (`getEmbeddings` in `server/src/lib/voyage.ts`, `input_type: "document"`, model `voyage-3`), then compare against every existing parable's stored embedding:
      ```sql
      SELECT id, title, CAST(1 - (embedding <=> '<candidate_vector>'::vector) AS float8) AS similarity
      FROM "Parable"
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> '<candidate_vector>'::vector
      LIMIT 5;
      ```
      Flag anything ≥ 0.85 similarity for manual review rather than auto-rejecting — report the matched title(s) and similarity score(s) and ask the user whether it's a real duplicate or just a thematically-related parable. Also run this same check pairwise against any other candidates already accepted earlier in the current batch, not just against the DB.

      In practice, `server/scripts/check-new-parable-similarity.ts <candidates.json>` runs this exact check (DB + within-batch) for a whole batch at once — prefer it over doing the SQL by hand when validating more than one parable.

5. **Calculate readTime** automatically if not provided:
   ```
   readTime = Math.ceil(wordCount / 200)  // 200 words per minute, based on the English content
   ```
   Minimum value: 1

6. **Output result:**

If validation passes — output the formatted JSON ready for seeding:
```json
{
  "title": "...",
  "content": "...",
  "moral": "...",
  "titleRu": "...",
  "contentRu": "...",
  "moralRu": "...",
  "source": "...",
  "readTime": 2,
  "categorySlug": "wisdom"
}
```

Then show the Prisma seed snippet:
```ts
{
  title: "...",
  content: `...`,
  moral: "...",
  titleRu: "...",
  contentRu: `...`,
  moralRu: "...",
  source: "...",       // omit if empty
  readTime: 2,
},
```

Then remind the user that after this batch is seeded, three scripts must run in order to make the new rows fully usable:
```bash
npx tsx scripts/seed-embeddings.ts        # populates embedding
npx tsx scripts/backfill-parable-slugs.ts # populates slugRu/slugEn
npx tsx scripts/backfill-parable-quotes.ts # assigns 3 ParableQuote rows via vector similarity
```

If validation fails — list every issue clearly:
```
Validation failed:

- title: too short (3 chars, minimum 5)
- moral: duplicates last sentence of content
- titleRu: missing
- category: "tales" is not a valid slug. Valid: wisdom, motivation, leadership, journey, loss, risk, trust, meaning
```

## Rules

- Never insert into the database directly — output only, user decides what to do with the result
- Always calculate readTime even if not provided
- Never hand-author `slugRu`/`slugEn` or a `Quote`/`ParableQuote` row — those come from the backfill scripts, not this command
- If the parable passes all checks, say "Ready to add to the database."
