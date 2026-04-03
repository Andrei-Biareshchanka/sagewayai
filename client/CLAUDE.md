# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the **client** (frontend) of SagewayAI.

> Coding style, naming, component structure, and TypeScript conventions: see **[CONVENTIONS.md](../CONVENTIONS.md)**.

## Stack

- React 19 + Vite 8 + TypeScript 5.9
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- React Query v5 (`@tanstack/react-query`) for server state
- Zustand v5 for UI state
- React Router v7
- Axios for HTTP requests
- Vitest + Testing Library + MSW for tests

## Commands

```bash
npm run dev          # dev server on :5173
npm run build        # tsc -b && vite build
npm run lint         # eslint
npm test             # vitest run (single pass)
npm run test:watch   # vitest watch mode

# Single test file
npx vitest run src/path/to/test.tsx
```

## Path aliases

`@/` maps to `src/`. Always use `@/` for absolute imports within the project.

```ts
import { Button } from '@/components/Button';
```

## Tailwind v4 notes

No config file. Customise via CSS variables in `src/index.css` using `@theme`:

```css
@theme {
  --color-sage: #6B8F71;
}
```

Arbitrary values and all v4 utilities work as usual.

## Design system

CSS variables defined in `src/index.css`:

| Variable | Value | Usage |
|---|---|---|
| `--color-sage` | `#6B8F71` | Primary accent |
| `--color-sage-light` | `#F0F4F0` | Background tints |
| `--color-sage-pill` | `#E8F0E8` | Topic pill bg |
| `--color-sage-pill-text` | `#3D6142` | Topic pill text |
| `--color-text` | `#1A1A1A` | Body text |
| `--color-text-secondary` | `#6B7280` | Secondary text |

Fonts: **Lora** (serif, headings + story body) · **Inter** (sans, UI)

## Component conventions

- One exported component per file, filename matches component name
- Named exports preferred over default exports
- Feature-based folder structure under `src/` (e.g. `src/stories/`, `src/auth/`)
- Custom hooks alongside their component in the same feature folder
- Keep components focused on rendering — extract logic into hooks

## React Query usage

All API calls go through React Query. Define query/mutation functions separately from the hook:

```ts
// src/parables/parablesApi.ts
export const fetchParables = (params) => axios.get('/api/parables', { params });

// src/parables/useParables.ts
export const useParables = (params) => useQuery({
  queryKey: ['parables', params],
  queryFn: () => fetchParables(params),
});
```

## Testing

- Test files: `*.test.tsx` colocated with the component
- Setup file: `src/test/setup.ts` (imports `@testing-library/jest-dom`)
- Use MSW for mocking API responses in tests — never mock axios directly
- `globals: true` is set — no need to import `describe`, `it`, `expect`
