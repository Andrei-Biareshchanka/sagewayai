# /commit

Review changes and commit them one logical unit at a time.

## Steps

1. **Run `git status`** — list all changed and untracked files.

2. **Run `git diff`** — show full diff of unstaged changes. For new files use `git diff --cached` after staging.

3. **Group the changes** into logical units. Each group = one commit. Examples:
   - One new component + its types + its hook → one commit
   - A bug fix in one file → one commit
   - Docs update → separate commit from code changes

4. **Show the user a commit plan:**
   ```
   Proposed commits:
   1. feat(home): add StoryMiniCard component — StoryMiniCard.tsx, storyTypes.ts
   2. fix(client): correct import order in App.tsx — App.tsx
   ```

5. **Wait for approval.** Do not proceed until the user says "go", "ok", "yes" or similar.

6. **Commit one by one:**
   - Stage only the files for that commit: `git add <file1> <file2>`
   - Commit with the proposed message
   - Show result, then move to the next group

7. **After all commits** — ask if the user wants to push: `git push`.

## Rules

- Never use `git add .` or `git add -A` unless the user explicitly asks
- Never commit `.env` files or `settings.local.json`
- Build must pass before committing (`npm run build` or `npx tsc --noEmit`)
- If the user wants to change the commit message or grouping — adjust before proceeding
- If there's nothing to commit — say so clearly

## Conventional commit types

| Type | When |
|---|---|
| `feat` | New feature or component |
| `fix` | Bug fix |
| `docs` | CLAUDE.md, CONVENTIONS.md, README |
| `chore` | Config, tooling, dependencies |
| `refactor` | Restructure without behaviour change |
| `test` | Tests only |
| `style` | Formatting, no logic change |
