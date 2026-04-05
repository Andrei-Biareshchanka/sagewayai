import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from 'zod';

import { authenticate } from '../middleware/authenticate';
import { prisma } from '../lib/prisma';

const meRouter = Router();

meRouter.use(authenticate);

meRouter.get('/', async (req: Request, res: Response) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: req.user!.id },
    select: { id: true, email: true, role: true, subscription: true },
  });
  res.json(user);
});

const settingsSchema = z.object({
  active: z.boolean(),
  categoryPreferences: z.array(z.string()),
});

meRouter.put('/settings', async (req: Request, res: Response) => {
  const parsed = settingsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw Object.assign(new Error(parsed.error.issues[0]?.message ?? 'Invalid input'), { status: 400 });
  }

  const subscription = await prisma.subscription.upsert({
    where: { userId: req.user!.id },
    create: { userId: req.user!.id, ...parsed.data },
    update: parsed.data,
  });
  res.json(subscription);
});

const listQuerySchema = z.object({
  page:  z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

meRouter.get('/favorites', async (req: Request, res: Response) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw Object.assign(new Error(parsed.error.issues[0]?.message ?? 'Invalid query'), { status: 400 });
  }

  const { page, limit } = parsed.data;
  const skip = (page - 1) * limit;

  const [favorites, total] = await Promise.all([
    prisma.favorite.findMany({
      where: { userId: req.user!.id },
      include: { parable: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.favorite.count({ where: { userId: req.user!.id } }),
  ]);

  res.json({ data: favorites.map((f) => f.parable), page, limit, total });
});

meRouter.post('/favorites/:parableId', async (req: Request, res: Response) => {
  const parableId = req.params['parableId'] as string;

  const parable = await prisma.parable.findUnique({ where: { id: parableId } });
  if (!parable) throw Object.assign(new Error('Parable not found'), { status: 404 });

  await prisma.favorite.upsert({
    where: { userId_parableId: { userId: req.user!.id, parableId } },
    create: { userId: req.user!.id, parableId },
    update: {},
  });
  res.status(201).send();
});

meRouter.delete('/favorites/:parableId', async (req: Request, res: Response) => {
  const parableId = req.params['parableId'] as string;

  await prisma.favorite.deleteMany({
    where: { userId: req.user!.id, parableId },
  });
  res.status(204).send();
});

export { meRouter };
