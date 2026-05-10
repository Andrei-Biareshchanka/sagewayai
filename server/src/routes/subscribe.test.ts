import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../lib/prisma', () => ({
  prisma: {
    emailSubscriber: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

import { createApp } from '../index';
import { prisma } from '../lib/prisma';

const mockPrisma = prisma as unknown as {
  emailSubscriber: {
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };
};

const MOCK_SUBSCRIBER = {
  id: 'sub-1',
  email: 'test@example.com',
  active: true,
  lang: 'en',
  unsubscribeToken: 'token-abc-123',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const app = createApp();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/subscribe', () => {
  it('creates a new subscriber and returns 201', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(null);
    mockPrisma.emailSubscriber.create.mockResolvedValue(MOCK_SUBSCRIBER);

    const res = await request(app)
      .post('/api/subscribe')
      .send({ email: 'test@example.com' });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Subscribed successfully');
  });

  it('saves lang when provided', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(null);
    mockPrisma.emailSubscriber.create.mockResolvedValue({ ...MOCK_SUBSCRIBER, lang: 'ru' });

    await request(app)
      .post('/api/subscribe')
      .send({ email: 'test@example.com', lang: 'ru' });

    expect(mockPrisma.emailSubscriber.create).toHaveBeenCalledWith({
      data: { email: 'test@example.com', lang: 'ru' },
    });
  });

  it('defaults lang to en when not provided', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(null);
    mockPrisma.emailSubscriber.create.mockResolvedValue(MOCK_SUBSCRIBER);

    await request(app)
      .post('/api/subscribe')
      .send({ email: 'test@example.com' });

    expect(mockPrisma.emailSubscriber.create).toHaveBeenCalledWith({
      data: { email: 'test@example.com', lang: 'en' },
    });
  });

  it('returns 400 for invalid lang value', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .send({ email: 'test@example.com', lang: 'fr' });

    expect(res.status).toBe(400);
  });

  it('returns 200 when already subscribed and active', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(MOCK_SUBSCRIBER);

    const res = await request(app)
      .post('/api/subscribe')
      .send({ email: 'test@example.com' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Already subscribed');
  });

  it('reactivates inactive subscriber and updates lang', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue({ ...MOCK_SUBSCRIBER, active: false });
    mockPrisma.emailSubscriber.update.mockResolvedValue({ ...MOCK_SUBSCRIBER, active: true, lang: 'ru' });

    const res = await request(app)
      .post('/api/subscribe')
      .send({ email: 'test@example.com', lang: 'ru' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Resubscribed successfully');
    expect(mockPrisma.emailSubscriber.update).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
      data: { active: true, lang: 'ru' },
    });
  });

  it('returns 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .send({ email: 'not-an-email' });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/subscribe/manage/:token', () => {
  it('returns subscriber info for valid token', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(MOCK_SUBSCRIBER);

    const res = await request(app).get('/api/subscribe/manage/token-abc-123');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ email: 'test@example.com', lang: 'en', active: true });
    expect(mockPrisma.emailSubscriber.findUnique).toHaveBeenCalledWith({
      where: { unsubscribeToken: 'token-abc-123' },
      select: { email: true, lang: true, active: true },
    });
  });

  it('returns 404 for invalid token', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/api/subscribe/manage/bad-token');

    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
  });
});

describe('PATCH /api/subscribe/manage/:token', () => {
  it('updates subscriber lang', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(MOCK_SUBSCRIBER);
    mockPrisma.emailSubscriber.update.mockResolvedValue({ ...MOCK_SUBSCRIBER, lang: 'ru' });

    const res = await request(app)
      .patch('/api/subscribe/manage/token-abc-123')
      .send({ lang: 'ru' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Language updated');
    expect(mockPrisma.emailSubscriber.update).toHaveBeenCalledWith({
      where: { unsubscribeToken: 'token-abc-123' },
      data: { lang: 'ru' },
    });
  });

  it('returns 404 for invalid token', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .patch('/api/subscribe/manage/bad-token')
      .send({ lang: 'en' });

    expect(res.status).toBe(404);
  });

  it('returns 400 for invalid lang value', async () => {
    const res = await request(app)
      .patch('/api/subscribe/manage/token-abc-123')
      .send({ lang: 'de' });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/subscribe/unsubscribe/:token', () => {
  it('deactivates subscriber with valid token', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(MOCK_SUBSCRIBER);
    mockPrisma.emailSubscriber.update.mockResolvedValue({ ...MOCK_SUBSCRIBER, active: false });

    const res = await request(app).get('/api/subscribe/unsubscribe/token-abc-123');

    expect(res.status).toBe(200);
    expect(res.text).toContain("You've been unsubscribed.");
    expect(mockPrisma.emailSubscriber.update).toHaveBeenCalledWith({
      where: { unsubscribeToken: 'token-abc-123' },
      data: { active: false },
    });
  });

  it('returns 404 for invalid token', async () => {
    mockPrisma.emailSubscriber.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/api/subscribe/unsubscribe/bad-token');

    expect(res.status).toBe(404);
  });
});
