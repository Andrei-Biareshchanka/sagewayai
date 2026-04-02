# Coding Conventions

These conventions apply to the entire SagewayAI codebase. Claude must follow them on every task.

---

## File naming

| What | Convention | Example |
|---|---|---|
| React component | `PascalCase.tsx` | `StoryCard.tsx` |
| Custom hook | `camelCase.ts` | `useStories.ts` |
| API/service | `camelCase.ts` | `storiesApi.ts` |
| Types file | `camelCase.ts` | `storyTypes.ts` |
| Utility | `camelCase.ts` | `formatDate.ts` |
| Test | same name + `.test` | `StoryCard.test.tsx` |

One exported component per file. File name must match the component name.

---

## Functions

Use arrow functions everywhere **except** top-level React components:

```ts
// Top-level component — use function declaration (better stack traces, HMR)
function StoryCard({ title, author }: StoryCardProps) {
  return <div>{title}</div>;
}

// Everything else — arrow functions
const formatReadTime = (minutes: number): string => `${minutes} min read`;

const useStories = () => {
  const fetchStories = async () => { ... };
  return { fetchStories };
};
```

---

## TypeScript

### No prefixes on types

No `I`, `T`, or `E` prefixes. Just descriptive names:

```ts
// Bad
interface IUser { ... }
type TStoryStatus = 'published' | 'pending';

// Good
interface User { ... }
type StoryStatus = 'published' | 'pending';
```

### interface vs type

- `interface` — for object shapes (extendable, used for component props and data models)
- `type` — for unions, intersections, utility types, and computed types

```ts
// Object shape → interface
interface Story {
  id: string;
  title: string;
  type: StoryType;
}

// Union → type
type StoryType = 'parable' | 'success_story';
type StoryStatus = 'published' | 'pending' | 'rejected';

// Component props → interface with Props suffix
interface StoryCardProps {
  story: Story;
  onSave: (id: string) => void;
}
```

### Naming suffixes

| Suffix | Usage | Example |
|---|---|---|
| `Props` | Component prop types | `StoryCardProps` |
| `State` | Zustand store shape | `AuthState` |
| `Params` | Function/query parameters | `FetchStoriesParams` |
| `Response` | API response shapes | `StoriesResponse` |
| `Config` | Configuration objects | `QueryConfig` |

### Strict rules

- No `any` — use `unknown`, generics, or proper types
- No `as` type assertions unless absolutely unavoidable — prefer type guards
- Derive types from data where possible: `typeof`, `ReturnType<>`, `Parameters<>`
- Mark truly immutable data with `readonly`

---

## Modules

- **Client:** ESM only (`import`/`export`) — Vite handles this
- **Server:** TypeScript with `"module": "commonjs"` in tsconfig, but always write `import`/`export` syntax — never `require()`

### Import order (both client and server)

1. External libraries
2. Absolute paths (`@/`)
3. Relative paths (`./`, `../`)

Blank line between each group:

```ts
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { StoryCard } from '@/stories/StoryCard';
import { useStories } from '@/stories/useStories';

import { formatReadTime } from './formatReadTime';
```

---

## Components

### When to extract

Extract into a separate component when:
- The JSX subtree has its own state or data fetching logic
- The same UI is rendered in 2+ places
- The component file exceeds ~150 lines
- A section can be named clearly and independently

### Structure within a file

Always in this order:

```ts
// 1. Types
interface StoryCardProps { ... }

// 2. Hook (if logic is complex enough to name)
function useStoryCard(story: Story) { ... }

// 3. Component
function StoryCard({ story, onSave }: StoryCardProps) {
  const { isSaved, handleSave } = useStoryCard(story);
  return ( ... );
}

// 4. Export
export { StoryCard };
```

### Keep components focused

Component body should only contain: hooks, derived values, event handlers, and JSX. Move everything else out:

```ts
// Bad — business logic inside component
function StoryCard({ story }: StoryCardProps) {
  const [saved, setSaved] = useState(false);
  const handleSave = async () => {
    await fetch(`/api/me/collection/${story.id}`, { method: 'POST' });
    setSaved(true);
  };
  const minutes = Math.ceil(story.content.split(' ').length / 200);
  ...
}

// Good — logic extracted
function StoryCard({ story }: StoryCardProps) {
  const { isSaved, handleSave } = useSaveStory(story.id);
  const readTime = formatReadTime(story.content);
  ...
}
```

---

## Avoiding prop drilling

**Rule:** No prop drilling beyond 2 levels deep.

Prefer in this order:
1. **Composition** — pass `children` or render slots instead of data
2. **Context** — for cross-cutting concerns (auth, theme, current user)
3. **Colocate state** — lift only as high as necessary, not higher

```ts
// Bad — drilling authorName 3 levels deep
<StoryList stories={stories} authorName={authorName} />
  <StoryCard story={story} authorName={authorName} />
    <AuthorTag name={authorName} />

// Good — composition
<StoryCard story={story}>
  <AuthorTag name={story.author.name} />
</StoryCard>
```

---

## Custom hooks

- Extract all non-trivial logic from components into hooks
- One hook = one concern
- Name describes what the hook **does**, not what it **is**: `useStoryFilters`, not `useFiltersState`
- Hooks live in the same feature folder as the component that uses them

```ts
// src/stories/useStoryFilters.ts
export const useStoryFilters = () => {
  const [topic, setTopic] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const reset = () => {
    setTopic(null);
    setSearch('');
  };

  return { topic, search, setTopic, setSearch, reset };
};
```

---

## Exports

Always named exports. Never default exports (exception: lazy-loaded route components).

```ts
// Bad
export default StoryCard;

// Good
export { StoryCard };
```

---

## Constants

`UPPER_SNAKE_CASE` for module-level constants:

```ts
const MAX_STORY_LENGTH = 10_000;
const DEFAULT_PAGE_SIZE = 20;
const TOPICS = ['purpose', 'leadership', 'resilience'] as const;
```

---

## Server-specific

- Every async Express handler must be wrapped in try/catch
- All request bodies validated with Zod before reaching service layer
- Never instantiate `PrismaClient` inline — always import from `src/lib/prisma.ts`
