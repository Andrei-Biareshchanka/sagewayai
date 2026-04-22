import { http, HttpResponse } from 'msw';

import type { Parable, ParablesResponse } from '@/parables/types'
import type { Category } from '@/categories/types';

export const MOCK_CATEGORY: Category = {
  id: 'cat-1',
  name: 'Wisdom',
  slug: 'wisdom',
  description: 'Timeless wisdom',
  color: undefined,
  parablesCount: 10,
};

export const MOCK_PARABLE: Parable = {
  id: 'parable-1',
  title: 'The Empty Cup',
  content: 'A scholar came to visit a Zen master...',
  moral: 'To learn, we must first be willing to unlearn.',
  source: undefined,
  readTime: 2,
  categoryId: 'cat-1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

export const MOCK_PARABLES_RESPONSE: ParablesResponse = {
  data: [MOCK_PARABLE],
  page: 1,
  limit: 20,
  total: 1,
};

export const handlers = [
  http.get('http://localhost:3001/api/parables/daily', () =>
    HttpResponse.json(MOCK_PARABLE),
  ),

  http.get('http://localhost:3001/api/parables', () =>
    HttpResponse.json(MOCK_PARABLES_RESPONSE),
  ),

  http.get('http://localhost:3001/api/categories', () =>
    HttpResponse.json([MOCK_CATEGORY]),
  ),

  // Block refresh attempts in tests — no active session
  http.post('http://localhost:3001/api/auth/refresh', () =>
    new HttpResponse(null, { status: 401 }),
  ),
];
