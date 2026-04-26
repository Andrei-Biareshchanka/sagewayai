import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../lib/prisma', () => ({
  prisma: {
    user: { findUniqueOrThrow: vi.fn() },
    subscription: { upsert: vi.fn() },
    favorite: { findMany: vi.fn(), count: vi.fn(), upsert: vi.fn(), deleteMany: vi.fn() },
    parable: { findUnique: vi.fn() },
  },
}));

import { createApp } from '../index';
import { prisma } from '../lib/prisma';
import { signAccessToken } from '../lib/auth';

const mockPrisma = prisma as unknown as {
  user: { findUniqueOrThrow: ReturnType<typeof vi.fn> };
  subscription: { upsert: ReturnType<typeof vi.fn> };
  favorite: {
    findMany: ReturnType<typeof vi.fn>;
    count: ReturnType<typeof vi.fn>;
    upsert: ReturnType<typeof vi.fn>;
    deleteMany: ReturnType<typeof vi.fn>;
  };
  parable: { findUnique: ReturnType<typeof vi.fn> };
};

const MOCK_USER = {
  id: 'user-1',
  email: 'test@example.com',
  role: 'USER',
  subscription: null,
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

function authHeader(userId = 'user-1', role = 'USER') {
  return `Bearer ${signAccessToken(userId, role)}`;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/me', () => {
  it('returns current user profile', async () => {
    mockPrisma.user.findUniqueOrThrow.mockResolvedValue(MOCK_USER);

    const res = await request(app).get('/api/me').set('Authorization', authHeader());

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 'user-1', email: 'test@example.com', role: 'USER' });
  });

  it('returns 401 without token', async () => {
    const res = await request(app).get('/api/me');
    expect(res.status).toBe(401);
  });
});

describe('PUT /api/me/settings', () => {
  it('upserts subscription settings and returns result', async () => {
    const subscription = { userId: 'user-1', active: true, categoryPreferences: ['wisdom'] };
    mockPrisma.subscription.upsert.mockResolvedValue(subscription);

    const res = await request(app)
      .put('/api/me/settings')
      .set('Authorization', authHeader())
      .send({ active: true, categoryPreferences: ['wisdom'] });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ active: true, categoryPreferences: ['wisdom'] });
    expect(mockPrisma.subscription.upsert).toHaveBeenCalledOnce();
  });

  it('returns 400 for missing required fields', async () => {
    const res = await request(app)
      .put('/api/me/settings')
      .set('Authorization', authHeader())
      .send({ active: true });

    expect(res.status).toBe(400);
  });

  it('returns 400 when active is not a boolean', async () => {
    const res = await request(app)
      .put('/api/me/settings')
      .set('Authorization', authHeader())
      .send({ active: 'yes', categoryPreferences: [] });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/me/favorites', () => {
  it('returns paginated favorites for the current user', async () => {
    mockPrisma.favorite.findMany.mockResolvedValue([{ parable: MOCK_PARABLE }]);
    mockPrisma.favorite.count.mockResolvedValue(1);

    const res = await request(app).get('/api/me/favorites').set('Authorization', authHeader());

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ data: [MOCK_PARABLE], page: 1, limit: 20, total: 1 });
  });

  it('passes pagination params to prisma', async () => {
    mockPrisma.favorite.findMany.mockResolvedValue([]);
    mockPrisma.favorite.count.mockResolvedValue(0);

    await request(app).get('/api/me/favorites?page=2&limit=5').set('Authorization', authHeader());

    expect(mockPrisma.favorite.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 5, take: 5 }),
    );
  });

  it('returns 400 for limit > 100', async () => {
    const res = await request(app)
      .get('/api/me/favorites?limit=101')
      .set('Authorization', authHeader());
    expect(res.status).toBe(400);
  });
});

describe('POST /api/me/favorites/:parableId', () => {
  it('adds a parable to favorites and returns 201', async () => {
    mockPrisma.parable.findUnique.mockResolvedValue(MOCK_PARABLE);
    mockPrisma.favorite.upsert.mockResolvedValue({});

    const res = await request(app)
      .post('/api/me/favorites/parable-1')
      .set('Authorization', authHeader());

    expect(res.status).toBe(201);
    expect(mockPrisma.favorite.upsert).toHaveBeenCalledOnce();
  });

  it('returns 404 when parable does not exist', async () => {
    mockPrisma.parable.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/me/favorites/nonexistent')
      .set('Authorization', authHeader());

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Parable not found');
  });
});

describe('DELETE /api/me/favorites/:parableId', () => {
  it('removes a parable from favorites and returns 204', async () => {
    mockPrisma.favorite.deleteMany.mockResolvedValue({ count: 1 });

    const res = await request(app)
      .delete('/api/me/favorites/parable-1')
      .set('Authorization', authHeader());

    expect(res.status).toBe(204);
    expect(mockPrisma.favorite.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'user-1', parableId: 'parable-1' },
    });
  });
});
