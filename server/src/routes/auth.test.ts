import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('../lib/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../lib/auth')>();
  return {
    ...actual,
    hashPassword: vi.fn().mockResolvedValue('hashed_password'),
    verifyPassword: vi.fn(),
  };
});

import { createApp } from '../index';
import { prisma } from '../lib/prisma';
import { verifyPassword } from '../lib/auth';

const mockPrisma = prisma as unknown as {
  user: {
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
};

const MOCK_USER = {
  id: 'user-1',
  email: 'test@example.com',
  role: 'USER',
  passwordHash: 'hashed_password',
};

const app = createApp();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/auth/register', () => {
  it('creates a new user and returns access token', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({
      id: MOCK_USER.id,
      email: MOCK_USER.email,
      role: MOCK_USER.role,
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('returns 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'not-an-email', password: 'password123' });

    expect(res.status).toBe(400);
  });

  it('returns 400 for short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123' });

    expect(res.status).toBe(400);
  });

  it('returns 409 when email already in use', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(MOCK_USER);

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('Email already in use');
  });
});

describe('POST /api/auth/login', () => {
  it('returns access token on valid credentials', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(MOCK_USER);
    vi.mocked(verifyPassword).mockResolvedValue(true);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('returns 401 when user not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'unknown@example.com', password: 'password123' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('returns 401 for wrong password', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(MOCK_USER);
    vi.mocked(verifyPassword).mockResolvedValue(false);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });
});

describe('POST /api/auth/logout', () => {
  it('clears refresh token cookie and returns 204', async () => {
    const res = await request(app).post('/api/auth/logout');

    expect(res.status).toBe(204);
  });
});
