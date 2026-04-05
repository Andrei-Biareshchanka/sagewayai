# /new-migration

Create a Prisma migration in one command.

## Usage

`/new-migration <name>` — e.g. `/new-migration add_user_table`

## Steps

1. **Check for a migration name** — if not provided, ask:
   "Migration name (snake_case, e.g. add_user_table):"

2. **Validate the name:**
   - snake_case only: lowercase letters, digits, underscores
   - No spaces, no hyphens, no uppercase
   - 3–60 characters
   - If invalid — show the error and stop

3. **Show what will change** — read `server/prisma/schema.prisma` and summarize any pending model changes vs the last migration (if visible from context).

4. **Confirm before running:**
   ```
   About to run:
     npx prisma migrate dev --name <name>

   This will:
   - Generate a new migration SQL file
   - Apply it to the local database
   - Regenerate the Prisma client

   Proceed? (yes/no)
   ```

5. **Run the migration:**
   ```bash
   cd server && npx prisma migrate dev --name <name>
   ```

6. **After success** — show the path to the new migration file and remind:
   ```
   Migration created: server/prisma/migrations/<timestamp>_<name>/migration.sql

   Next steps:
   - Review the SQL in the migration file
   - Commit both schema.prisma and the migrations/ folder
   - Run: npx prisma generate (if client types changed)
   ```

7. **If the migration fails** — show the full error output and suggest fixes:
   - "Column already exists" → schema out of sync, run `prisma migrate resolve`
   - "relation does not exist" → check foreign key references in schema
   - Other → show raw error for investigation

## Rules

- Never run `prisma migrate reset` without explicit user confirmation — it drops all data
- Never run `prisma db push` — always use `migrate dev` to keep migration history intact
- Always run from the `server/` directory so Prisma finds the correct config
