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
import { signAccessToken } from '../lib/auth';

const app = createApp();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('authenticate middleware', () => {
  it('returns 401 when Authorization header is missing', async () => {
    const res = await request(app).get('/api/me');
    expect(res.status).toBe(401);
  });

  it('returns 401 when Authorization header has wrong scheme', async () => {
    const res = await request(app).get('/api/me').set('Authorization', 'Basic sometoken');
    expect(res.status).toBe(401);
  });

  it('returns 401 for a tampered token', async () => {
    const token = signAccessToken('user-1', 'USER');
    const res = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${token}x`);
    expect(res.status).toBe(401);
  });

  it('passes through with a valid token', async () => {
    const { prisma } = await import('../lib/prisma');
    vi.mocked(prisma.user.findUniqueOrThrow).mockResolvedValue({
      id: 'user-1',
      email: 'test@example.com',
      role: 'USER',
      subscription: null,
    } as never);

    const token = signAccessToken('user-1', 'USER');
    const res = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
