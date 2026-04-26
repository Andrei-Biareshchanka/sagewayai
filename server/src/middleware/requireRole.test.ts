import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../lib/prisma', () => ({
  prisma: {
    user: { findUnique: vi.fn(), findUniqueOrThrow: vi.fn() },
    parable: { findMany: vi.fn() },
  },
}));

import { createApp } from '../index';
import { signAccessToken } from '../lib/auth';
import { prisma } from '../lib/prisma';

const app = createApp();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('requireRole middleware', () => {
  it('returns 403 when USER tries to access ADMIN endpoint', async () => {
    const token = signAccessToken('user-1', 'USER');
    const res = await request(app)
      .get('/api/admin/parables')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it('passes through when role matches', async () => {
    vi.mocked(prisma.parable.findMany).mockResolvedValue([]);
    const token = signAccessToken('admin-1', 'ADMIN');
    const res = await request(app)
      .get('/api/admin/parables')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('returns 401 when no token is provided', async () => {
    const res = await request(app).get('/api/admin/parables');
    expect(res.status).toBe(401);
  });
});
