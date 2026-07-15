import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../lib/prisma', () => ({
  prisma: {
    category: { findUnique: vi.fn() },
    emailSubscriber: { findMany: vi.fn() },
    parable: { findMany: vi.fn() },
    dailyParable: { findUnique: vi.fn(), create: vi.fn() },
  },
}));

vi.mock('../lib/email', () => ({
  sendDailyParableEmail: vi.fn(),
}));

vi.mock('../lib/dailyDigest', () => ({
  publishTodayAndPrepareTomorrow: vi.fn(),
}));

vi.mock('../lib/adminAlert', () => ({
  notifyAdmin: vi.fn(),
}));

process.env['ADMIN_SEND_SECRET'] = 'test-secret';
process.env['ADMIN_PUBLISH_SECRET'] = 'test-publish-secret';

import { createApp } from '../index';
import { prisma } from '../lib/prisma';
import { sendDailyParableEmail } from '../lib/email';
import { publishTodayAndPrepareTomorrow } from '../lib/dailyDigest';
import { notifyAdmin } from '../lib/adminAlert';
import { signAccessToken } from '../lib/auth';

const mockPrisma = prisma as unknown as {
  category: { findUnique: ReturnType<typeof vi.fn> };
  emailSubscriber: { findMany: ReturnType<typeof vi.fn> };
  parable: { findMany: ReturnType<typeof vi.fn> };
  dailyParable: {
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
};

const MOCK_PARABLE = {
  id: 'parable-1',
  title: 'The Empty Cup',
  content: 'A scholar came to visit a Zen master...',
  moral: 'To learn, we must first be willing to unlearn.',
  source: null,
  readTime: 2,
  categoryId: 'cat-1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const app = createApp();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/admin/send-daily', () => {
  it('sends daily parable to all active subscribers', async () => {
    mockPrisma.dailyParable.findUnique.mockResolvedValue({
      parable: MOCK_PARABLE,
    });
    mockPrisma.category.findUnique.mockResolvedValue({ name: 'Wisdom' });
    mockPrisma.emailSubscriber.findMany.mockResolvedValue([
      { email: 'a@test.com', unsubscribeToken: 'token-1' },
      { email: 'b@test.com', unsubscribeToken: 'token-2' },
    ]);
    vi.mocked(sendDailyParableEmail).mockResolvedValue(undefined);

    const res = await request(app)
      .post('/api/admin/send-daily')
      .set('x-send-secret', 'test-secret');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ sent: 2, failed: 0, total: 2 });
  });

  it('returns 401 without the secret header', async () => {
    const res = await request(app).post('/api/admin/send-daily');
    expect(res.status).toBe(401);
  });

  it('returns 401 with wrong secret', async () => {
    const res = await request(app)
      .post('/api/admin/send-daily')
      .set('x-send-secret', 'wrong-secret');
    expect(res.status).toBe(401);
  });

  it('reports partial failures when some emails fail', async () => {
    mockPrisma.dailyParable.findUnique.mockResolvedValue({
      parable: MOCK_PARABLE,
    });
    mockPrisma.category.findUnique.mockResolvedValue({ name: 'Wisdom' });
    mockPrisma.emailSubscriber.findMany.mockResolvedValue([
      { email: 'ok@test.com', unsubscribeToken: 'token-1' },
      { email: 'fail@test.com', unsubscribeToken: 'token-2' },
    ]);
    vi.mocked(sendDailyParableEmail)
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('SMTP error'));

    const res = await request(app)
      .post('/api/admin/send-daily')
      .set('x-send-secret', 'test-secret');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ sent: 1, failed: 1, total: 2 });
  });
});

describe('POST /api/admin/publish-and-prepare', () => {
  it('returns the publish/prepare result on success', async () => {
    vi.mocked(publishTodayAndPrepareTomorrow).mockResolvedValue({
      published: 'some-slug',
      prepared: 'other-slug',
    });

    const res = await request(app)
      .post('/api/admin/publish-and-prepare')
      .set('x-publish-secret', 'test-publish-secret');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ published: 'some-slug', prepared: 'other-slug' });
    expect(notifyAdmin).not.toHaveBeenCalled();
  });

  it('returns 401 without the secret header', async () => {
    const res = await request(app).post('/api/admin/publish-and-prepare');
    expect(res.status).toBe(401);
  });

  it('returns 401 with wrong secret', async () => {
    const res = await request(app)
      .post('/api/admin/publish-and-prepare')
      .set('x-publish-secret', 'wrong-secret');
    expect(res.status).toBe(401);
  });

  it('notifies the admin and returns 500 when digest creation fails', async () => {
    vi.mocked(publishTodayAndPrepareTomorrow).mockRejectedValue(
      new Error('No available parable found for quote quote-1'),
    );

    const res = await request(app)
      .post('/api/admin/publish-and-prepare')
      .set('x-publish-secret', 'test-publish-secret');

    expect(res.status).toBe(500);
    expect(notifyAdmin).toHaveBeenCalledWith(
      expect.stringContaining('No available parable found for quote quote-1'),
    );
  });
});

describe('GET /api/admin/parables', () => {
  it('returns all parables for ADMIN', async () => {
    mockPrisma.parable.findMany.mockResolvedValue([MOCK_PARABLE]);

    const token = signAccessToken('admin-1', 'ADMIN');
    const res = await request(app)
      .get('/api/admin/parables')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('returns 403 for USER role', async () => {
    const token = signAccessToken('user-1', 'USER');
    const res = await request(app)
      .get('/api/admin/parables')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
  });

  it('returns 401 without token', async () => {
    const res = await request(app).get('/api/admin/parables');
    expect(res.status).toBe(401);
  });
});
