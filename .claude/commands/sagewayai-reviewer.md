# /sagewayai-reviewer

Review the current changes (or specified files) against SagewayAI architecture rules and project conventions.

## Steps

1. **Identify what to review**
   - If the user passed file paths — review those files
   - Otherwise run `git diff HEAD` to get all uncommitted changes
   - If no changes — run `git diff main...HEAD` to review the full branch

2. **Read the changed files** in full to understand context

3. **Review across these dimensions:**

### Architecture & patterns

- Routes (`src/routes/`) must only: parse/validate input, call lib functions or Prisma, return JSON
- No business logic in route handlers — extract to `src/lib/` if logic is non-trivial
- Always import the shared Prisma instance: `import { prisma } from '../lib/prisma'` — never instantiate inline
- Error handler pattern: `Object.assign(new Error(msg), { status: 404 })` — no `as` casts
- `errorHandler` must stay as the last `app.use()` in `createApp()`
- Route order matters: static paths (`/daily`) before dynamic (`/:id`)

### TypeScript

- No `any` — use `unknown`, generics, or proper types
- No unnecessary type assertions (`as SomeType`) — derive types instead
- Prefer `interface` for object shapes, `type` for unions
- All function parameters and return types must be explicit

### Zod validation

- Query params on list endpoints must use `z.coerce.number()` (not `z.number()`) — query strings arrive as `string`
- Always use `.safeParse()` — never `.parse()` in route handlers (throws unformatted errors)
- Report Zod errors via `parsed.error.issues[0]?.message` (Zod 4 — not `.errors`)

### Clean code

- Functions under 20 lines; extract helpers with descriptive names
- No magic strings or numbers — use named constants
- No commented-out code, no dead code
- No `console.log` left in committed code (use proper error propagation)

### Prisma

- Use `findUnique` for single-record lookups by ID or unique field
- Use `findMany` with `skip`/`take` for pagination
- Parallel queries with `Promise.all([...])` when results are independent
- Check for `null` after `findUnique` — it returns `null`, not throws

### Security

- Never expose internal error details to the client
- Never log sensitive fields (passwords, tokens)
- Validate all external input at route boundaries with Zod

### Tests (if present)

- Mock only `src/lib/prisma` — never mock route handlers or Express itself
- Use `vi.fn()` mocks, not manual stubs
- Each test covers one scenario

4. **Report findings** grouped by severity:

```
## Review: <file or branch>

### Blockers (must fix before merge)
- ...

### Warnings (should fix)
- ...

### Suggestions (optional improvements)
- ...

### Approved
- List what looks good
```

5. **If no issues found** — say "Looks good, ready to commit." with a brief summary of what was checked.

## Rules

- Be specific: include file path and line reference for every finding
- Do not suggest changes outside the scope of the review
- Do not refactor things that weren't changed
- English only in all feedback
