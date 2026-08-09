# /new-parable

Scaffold a new parable with the correct structure for SagewayAI.

## Usage

`/new-parable [category]` — optionally specify a category slug.

Examples:
- `/new-parable` — prompts for all fields interactively
- `/new-parable wisdom` — pre-fills the category

## Steps

1. **Collect fields** — ask the user for each required field if not already provided:

   | Field | Prompt |
   |-------|--------|
   | `title` | "Title of the parable, English (5–100 chars):" |
   | `content` | "The parable story, English (100–2000 chars):" |
   | `moral` | "The moral or lesson, English (20–300 chars):" |
   | `titleRu` | "Title of the parable, Russian:" |
   | `contentRu` | "The parable story, Russian:" |
   | `moralRu` | "The moral or lesson, Russian:" |
   | `source` | "Source or tradition? (optional, press Enter to skip):" |
   | `category` | "Category slug — one of: wisdom, motivation, leadership, journey, loss, risk, trust, meaning:" |

2. **Auto-calculate readTime:**
   ```
   readTime = Math.ceil(wordCount / 200)  // minimum 1, based on the English content
   ```

3. **Run /parable-formatter** to validate all fields before proceeding — this includes the exact-title duplicate check and the semantic (embedding-similarity) duplicate check against the existing parables and against anything else already accepted earlier in the current session's batch.
   If validation fails — show the errors and stop. Do not continue until the user fixes them.

4. **Show preview** of the final parable:
   ```
   Title:    The Two Wolves / Два волка
   Category: wisdom
   ReadTime: 2 min
   Source:   Cherokee tradition (optional)

   Content (EN):
   <content text>

   Content (RU):
   <contentRu text>

   Moral (EN):
   <moral text>

   Moral (RU):
   <moralRu text>
   ```

5. **Ask for confirmation:** "Add this parable to seed.ts? (yes/no)"

6. **If confirmed** — append to `server/prisma/seed.ts`:

   Find the array for the correct category and append the new entry:
   ```ts
   {
     title: "The Two Wolves",
     content: `...`,
     moral: "...",
     titleRu: "Два волка",
     contentRu: `...`,
     moralRu: "...",
     source: "Cherokee tradition",  // omit line if no source
     readTime: 2,
   },
   ```

   Then remind the user to run, in order:
   ```bash
   npx prisma db seed
   npx tsx scripts/seed/seed-embeddings.ts
   npx tsx scripts/backfill/backfill-parable-slugs.ts
   npx tsx scripts/backfill/backfill-parable-quotes.ts
   ```
   The new parable lands with `reflectionStatus: DRAFT` (schema default) — `conclusion`/`questions`/`imageUrl` are a separate, later step (see `docs/manual-backfill-process.md`), not part of this command.

## Rules

- Never write directly to the database — always go through seed.ts
- Always validate with /parable-formatter before appending
- Both `title`/`content`/`moral` (English) and `titleRu`/`contentRu`/`moralRu` (Russian) are required — reject a submission missing either language
- Never hand-author `slugRu`/`slugEn` or a `Quote`/`ParableQuote` row here — those come from the backfill scripts run after seeding
