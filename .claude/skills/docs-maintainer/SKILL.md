---
name: docs-maintainer
description: Keeps this project's local documentation in .claude/docs/ accurate and current. Use this whenever the user asks to "document this", "update the docs", "check if docs are stale", "write this up", after merging a PR or finishing a feature, or when starting a session where recent git history isn't reflected in ARCHITECTURE.md. Also use when the user asks to log a decision, write an ADR, or record follow-ups. Trigger proactively at the end of any substantial coding task (new endpoint, schema change, new architectural pattern, routing change) even if the user doesn't explicitly ask — offer to update the docs rather than staying silent.
---

# Docs Maintainer

Maintains two kinds of files under `.claude/docs/` (gitignored — never commit this folder unless the user explicitly says otherwise):

1. **Living docs** — describe the CURRENT state only. Get edited in place. Never accumulate history.
   - `.claude/docs/ARCHITECTURE.md` — stack, data models, API endpoints, repo structure, env vars
   - `.claude/docs/FOLLOWUPS.md` — flat list of open items, each with a date added

2. **Log entries** — describe a DECISION or a body of work, written once, never edited afterward.
   - `.claude/docs/adr/NNNN-short-title.md` — one file per architectural decision or merged feature

The core rule: **state goes in living docs, history goes in ADRs.** If you're about to add a paragraph starting with "Previously..." or "We used to..." to ARCHITECTURE.md, stop — that belongs in an ADR instead, and ARCHITECTURE.md should just describe what's true now.

## Workflow: "document this" / after finishing a feature or PR

1. **Gather the diff.** Run `git log -p` / `git diff` against the relevant range (last N commits, or since the branch diverged from main). If the user already described the work in the conversation, use that instead of re-deriving it from git — don't make them repeat themselves.
2. **Check `.claude/docs/ARCHITECTURE.md` for staleness.** Does anything in the diff contradict what's written there (new routes, changed schema, renamed folders, new env vars, changed stack)? If yes, this is a required update, not optional — go to step 3 before writing the ADR.
3. **Update ARCHITECTURE.md in place.** Use targeted edits (find the stale section, replace it), not a full rewrite. Keep the doc describing only "what is true today" — no changelog language.
4. **Write one ADR** for the body of work, using `adr-template.md` as the shape. Number sequentially (check the highest existing number in `.claude/docs/adr/` first). Include:
   - What problem this solved and why it mattered (skip if trivial)
   - What was decided, briefly — link out to code rather than pasting large diffs
   - Alternatives considered, if any were seriously weighed
   - What was verified, and how (concrete commands/checks, not "it works")
5. **Route open items correctly.** Anything not yet done goes into `FOLLOWUPS.md` as a single line with a date — not buried in ADR prose. If the user has a task tracker (Notion Kanban, Linear, GitHub Issues) mentioned elsewhere in context, ask once whether follow-ups should go there instead; if they say yes, don't duplicate into FOLLOWUPS.md going forward.
6. **Never let an ADR exceed what actually happened.** Don't speculate about future plans inside an ADR — that belongs in FOLLOWUPS.md or the project roadmap.

## Workflow: "check if docs are stale" / start-of-session audit

1. Read `.claude/docs/ARCHITECTURE.md`.
2. Pull recent git history (e.g. `git log --oneline -30` and the diffs of anything that touches schema, routing, config, or top-level folder structure).
3. Cross-check claim by claim: stack versions, folder paths, API endpoints, data models, env vars.
4. Report a short list of concrete mismatches (not vague "seems outdated") — quote the stale line and what it should say now.
5. Ask before rewriting anything non-trivial; small factual corrections (a renamed path, a version bump) can be fixed directly.

## Creating a new project doc structure (first run in a repo)

If `.claude/docs/` doesn't exist yet:
1. Create `.claude/docs/ARCHITECTURE.md`, `.claude/docs/FOLLOWUPS.md`, `.claude/docs/adr/`.
2. Check `.gitignore` for a `.claude/docs/` entry; add one if missing (leave `.claude/skills/` and root `CLAUDE.md` untouched — those should stay committed).
3. Seed ARCHITECTURE.md from whatever the user describes or from a quick scan of the repo (package.json, prisma schema, folder layout) — don't leave it a stub.

## What NOT to do

- Don't create a new "ARCHITECTURE_v2.md" instead of editing the existing one.
- Don't put decision history inside the living doc, or current-state facts inside an ADR.
- Don't write an ADR for trivial changes (typo fixes, dependency bumps with no behavior change) — not everything needs a permanent record.
- Don't commit `.claude/docs/` contents unless the user explicitly asks to; if `git add`/`git commit` is requested elsewhere in the session, exclude this folder unless told otherwise.
