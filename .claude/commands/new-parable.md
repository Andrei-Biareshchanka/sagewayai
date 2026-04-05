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
   | `title` | "Title of the parable (5–100 chars):" |
   | `content` | "The parable story (100–2000 chars):" |
   | `moral` | "The moral or lesson (20–300 chars):" |
   | `source` | "Source or tradition? (optional, press Enter to skip):" |
   | `category` | "Category slug — one of: wisdom, motivation, leadership, journey, loss, risk, trust, meaning:" |

2. **Auto-calculate readTime:**
   ```
   readTime = Math.ceil(wordCount / 200)  // minimum 1
   ```

3. **Run /parable-formatter** to validate all fields before proceeding.
   If validation fails — show the errors and stop. Do not continue until the user fixes them.

4. **Check for duplicates** using MCP Postgres:
   ```sql
   SELECT id FROM "Parable" WHERE title ILIKE '<title>';
   ```
   If found — warn the user and stop.

5. **Show preview** of the final parable:
   ```
   Title:    The Two Wolves
   Category: wisdom
   ReadTime: 2 min
   Source:   Cherokee tradition (optional)

   Content:
   <content text>

   Moral:
   <moral text>
   ```

6. **Ask for confirmation:** "Add this parable to seed.ts? (yes/no)"

7. **If confirmed** — append to `server/prisma/seed.ts`:

   Find the array for the correct category and append the new entry:
   ```ts
   {
     title: "The Two Wolves",
     content: `...`,
     moral: "...",
     source: "Cherokee tradition",  // omit line if no source
     readTime: 2,
   },
   ```

   Then remind the user to run:
   ```bash
   npx prisma db seed
   ```

## Rules

- Never write directly to the database — always go through seed.ts
- Always validate with /parable-formatter before appending
- English only — reject input containing Cyrillic characters
