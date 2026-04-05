import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../lib/prisma', () => ({
  prisma: {
    parable: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
    },
    category: {
      findUnique: vi.fn(),
    },
    dailyParable: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

import { createApp } from '../index';
import { prisma } from '../lib/prisma';

const mockPrisma = prisma as unknown as {
  parable: {
    findMany: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
    count: ReturnType<typeof vi.fn>;
  };
  category: {
    findUnique: ReturnType<typeof vi.fn>;
  };
  dailyParable: {
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
};

const MOCK_CATEGORY = {
  id: 'cat-1',
  name: 'Wisdom',
  slug: 'wisdom',
  description: null,
  color: null,
  parablesCount: 10,
};

const MOCK_PARABLE = {
  id: 'parable-1',
  title: 'The Empty Cup',
  content: 'A scholar came to visit a Zen master...',
  moral: 'To learn, we must first be willing to unlearn.',
  source: null,
  readTime: 2,
  categoryId: 'cat-1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const app = createApp();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/parables', () => {
  it('returns paginated list with defaults', async () => {
    mockPrisma.parable.findMany.mockResolvedValue([MOCK_PARABLE]);
    mockPrisma.parable.count.mockResolvedValue(1);

    const res = await request(app).get('/api/parables');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ data: [MOCK_PARABLE], page: 1, limit: 20, total: 1 });
  });

  it('filters by category slug', async () => {
    mockPrisma.category.findUnique.mockResolvedValue(MOCK_CATEGORY);
    mockPrisma.parable.findMany.mockResolvedValue([MOCK_PARABLE]);
    mockPrisma.parable.count.mockResolvedValue(1);

    const res = await request(app).get('/api/parables?category=wisdom');

    expect(res.status).toBe(200);
    expect(mockPrisma.category.findUnique).toHaveBeenCalledWith({ where: { slug: 'wisdom' } });
    expect(mockPrisma.parable.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { categoryId: 'cat-1' } }),
    );
  });

  it('returns 404 when category slug not found', async () => {
    mockPrisma.category.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/api/parables?category=nonexistent');

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it('returns 400 for invalid page param (page=0)', async () => {
    const res = await request(app).get('/api/parables?page=0');
    expect(res.status).toBe(400);
  });

  it('returns 400 for limit > 100', async () => {
    const res = await request(app).get('/api/parables?limit=101');
    expect(res.status).toBe(400);
  });
});

describe('GET /api/parables/:id', () => {
  it('returns parable by id', async () => {
    mockPrisma.parable.findUnique.mockResolvedValue(MOCK_PARABLE);

    const res = await request(app).get('/api/parables/parable-1');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 'parable-1', title: 'The Empty Cup' });
  });

  it('returns 404 when id not found', async () => {
    mockPrisma.parable.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/api/parables/nonexistent');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Parable not found');
  });
});
