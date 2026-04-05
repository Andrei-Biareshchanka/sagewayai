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
| `title` | string | 5–100 chars, title case, no trailing punctuation |
| `content` | string | 100–2000 chars, at least 2 sentences, narrative form |
| `moral` | string | 20–300 chars, one clear lesson, no "The moral is..." prefix |
| `source` | string? | Optional — author or tradition (e.g. "Zen tradition", "Aesop") |
| `readTime` | number | Auto-calculated: Math.ceil(content.split(' ').length / 200) |
| `category` | string | Must be one of the 8 valid slugs (see below) |

**Valid category slugs:**
`wisdom` · `motivation` · `leadership` · `journey` · `loss` · `risk` · `trust` · `meaning`

3. **Content quality checks:**
   - `content` must not start with "Once upon a time" (too generic)
   - `moral` must not duplicate the last sentence of `content` word-for-word
   - `title` must not be identical to the `moral`
   - No placeholder text: "Lorem", "TODO", "example", "test"
   - English only — no Cyrillic or other non-Latin characters

4. **Check for duplicates** — use MCP Postgres to verify title uniqueness:
   ```sql
   SELECT id FROM "Parable" WHERE title ILIKE '<title>';
   ```
   If a match is found — report it and stop.

5. **Calculate readTime** automatically if not provided:
   ```
   readTime = Math.ceil(wordCount / 200)  // 200 words per minute
   ```
   Minimum value: 1

6. **Output result:**

If validation passes — output the formatted JSON ready for seeding:
```json
{
  "title": "...",
  "content": "...",
  "moral": "...",
  "source": "...",
  "readTime": 2,
  "categorySlug": "wisdom"
}
```

Then show the Prisma seed snippet:
```ts
await prisma.parable.create({
  data: {
    title: "...",
    content: "...",
    moral: "...",
    source: "...",       // omit if empty
    readTime: 2,
    category: { connect: { slug: "wisdom" } },
  },
});
```

If validation fails — list every issue clearly:
```
Validation failed:

- title: too short (3 chars, minimum 5)
- moral: duplicates last sentence of content
- category: "tales" is not a valid slug. Valid: wisdom, motivation, leadership, journey, loss, risk, trust, meaning
```

## Rules

- Never insert into the database directly — output only, user decides what to do with the result
- Always calculate readTime even if not provided
- If the parable passes all checks, say "Ready to add to the database."
