import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

import { createApp } from '../index';
import { prisma } from '../lib/prisma';

vi.mock('../lib/prisma', () => ({
  prisma: {
    category: {
      findMany: vi.fn(),
    },
  },
}));

const app = createApp();

const mockCategories = [
  { id: '1', name: 'Wisdom', slug: 'wisdom', color: '#6B8F71', parablesCount: 10 },
  { id: '2', name: 'Motivation', slug: 'motivation', color: '#8B6F8F', parablesCount: 8 },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/categories', () => {
  it('returns all categories', async () => {
    vi.mocked(prisma.category.findMany).mockResolvedValue(mockCategories as never);

    const res = await request(app).get('/api/categories');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].name).toBe('Wisdom');
  });

  it('returns empty array when no categories exist', async () => {
    vi.mocked(prisma.category.findMany).mockResolvedValue([]);

    const res = await request(app).get('/api/categories');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
