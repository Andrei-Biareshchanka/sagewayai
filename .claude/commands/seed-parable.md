# /seed-parable

Quickly add test parables to the database for development and testing.

## Usage

- `/seed-parable` — add one generated parable to a random category
- `/seed-parable wisdom` — add one generated parable to the specified category
- `/seed-parable wisdom 3` — add 3 generated parables to the specified category

## Steps

1. **Parse arguments:**
   - First arg (optional): category slug — one of: `wisdom`, `motivation`, `leadership`, `journey`, `loss`, `risk`, `trust`, `meaning`
   - Second arg (optional): count (1–10, default 1)
   - If category is invalid — show valid options and stop

2. **Check the database first** using MCP Postgres:
   ```sql
   SELECT c.slug, c.name, c."parablesCount",
          COUNT(p.id) AS actual_count
   FROM "Category" c
   LEFT JOIN "Parable" p ON p."categoryId" = c.id
   WHERE c.slug = '<slug>'
   GROUP BY c.id;
   ```
   Show the current count so the user knows what's already there.

3. **Generate parables** — create realistic test parables with this structure:
   - `title`: short, meaningful, title case
   - `content`: a 3–5 sentence parable story fitting the category theme
   - `moral`: one clear lesson
   - `source`: "Generated for testing"
   - `readTime`: calculated from word count

   Category themes to guide generation:
   | Category | Theme |
   |----------|-------|
   | wisdom | insight, perspective, understanding |
   | motivation | perseverance, effort, growth |
   | leadership | responsibility, guidance, vision |
   | journey | path, choices, discovery |
   | loss | grief, letting go, acceptance |
   | risk | courage, uncertainty, reward |
   | trust | honesty, loyalty, faith |
   | meaning | purpose, values, legacy |

4. **Show all generated parables** for review before inserting.

5. **Ask for confirmation:**
   "Insert these N parable(s) into the database? (yes/no)"

6. **If confirmed** — insert directly via MCP Postgres:
   ```sql
   INSERT INTO "Parable" (id, title, content, moral, source, "readTime", "categoryId", "createdAt", "updatedAt")
   VALUES (gen_random_uuid(), '...', '...', '...', 'Generated for testing', 2,
           (SELECT id FROM "Category" WHERE slug = 'wisdom'),
           NOW(), NOW());
   ```

   Update the category count:
   ```sql
   UPDATE "Category"
   SET "parablesCount" = "parablesCount" + <count>
   WHERE slug = '<slug>';
   ```

7. **Confirm insertion** — show final count in the category.

## Rules

- Mark all generated parables with `source: "Generated for testing"` so they can be identified and cleaned up
- Never insert more than 10 parables at once
- This command is for development only — never use in production
