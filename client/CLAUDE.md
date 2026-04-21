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

## Folder architecture

```
src/
├── lib/               # Infrastructure only — axios instance, no UI or React deps
├── shared/
│   ├── hooks/         # Hooks used by 2+ feature folders (useCategoryMap, useDocumentTitle)
│   ├── types/         # All shared TypeScript types (index.ts)
│   └── ui/            # UI components used by 2+ feature folders (LoadingSpinner, PaginationControls, ErrorBoundary)
├── auth/              # Login, register, auth state, auth hooks
├── categories/        # Category API and hooks
├── collection/        # Favorites page and hooks
├── explore/           # Explore page
├── home/              # Home page, subscribe form, hero
├── layout/            # Navbar, Footer, ScrollToTop
└── parables/          # Everything parable-related: API, hooks, components, pages
```

**The rule:** if a hook or component is used in 2+ feature folders → it goes to `shared/`. If it belongs to one feature only → it stays inside that feature folder.

**One export per file.** Filename matches the exported name. Named exports only.

Keep components focused on rendering — extract all logic and API calls into hooks.

## React Query usage

All API calls go through React Query. Never use raw `api.post/get` directly in components.

```ts
// src/parables/parablesApi.ts  — HTTP function
export const fetchParables = (params) => api.get('/parables', { params });

// src/parables/useParables.ts  — one hook per file
export const useParables = (params) => useQuery({
  queryKey: ['parables', params],
  queryFn: () => fetchParables(params),
  staleTime: 1000 * 60 * 5,
});
```

Mutations follow the same pattern — extract the API function, wrap in `useMutation`.

## Testing

- Test files: `*.test.tsx` colocated with the component
- Setup file: `src/test/setup.ts` (imports `@testing-library/jest-dom`)
- Use MSW for mocking API responses in tests — never mock axios directly
- `globals: true` is set — no need to import `describe`, `it`, `expect`
