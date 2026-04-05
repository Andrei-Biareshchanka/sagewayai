import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from 'zod';

import { hashPassword, signAccessToken, signRefreshToken, verifyPassword, verifyRefreshToken } from '../lib/auth';
import { prisma } from '../lib/prisma';

const authRouter = Router();

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const COOKIE_NAME = 'refreshToken';
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env['NODE_ENV'] === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function setTokens(res: Response, userId: string, role: string) {
  const accessToken = signAccessToken(userId, role);
  const refreshToken = signRefreshToken(userId);
  res.cookie(COOKIE_NAME, refreshToken, COOKIE_OPTIONS);
  return accessToken;
}

authRouter.post('/register', async (req: Request, res: Response) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw Object.assign(new Error(parsed.error.issues[0]?.message ?? 'Invalid input'), { status: 400 });
  }

  const { email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already in use'), { status: 409 });

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash },
    select: { id: true, email: true, role: true },
  });

  const accessToken = setTokens(res, user.id, user.role);
  res.status(201).json({ accessToken, user });
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw Object.assign(new Error(parsed.error.issues[0]?.message ?? 'Invalid input'), { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, role: true, passwordHash: true },
  });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const accessToken = setTokens(res, user.id, user.role);
  res.json({ accessToken, user: { id: user.id, email: user.email, role: user.role } });
});

authRouter.post('/refresh', async (req: Request, res: Response) => {
  const token = req.cookies[COOKIE_NAME] as string | undefined;
  if (!token) throw Object.assign(new Error('No refresh token'), { status: 401 });

  let payload: { sub: string };
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, role: true },
  });
  if (!user) throw Object.assign(new Error('User not found'), { status: 401 });

  const accessToken = setTokens(res, user.id, user.role);
  res.json({ accessToken, user });
});

authRouter.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  res.status(204).send();
});

export { authRouter };
