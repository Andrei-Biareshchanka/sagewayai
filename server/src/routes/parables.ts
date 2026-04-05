import { Router } from 'express';
import { z } from 'zod';

import { getDailyParable } from '../lib/daily';
import { prisma } from '../lib/prisma';

const parablesRouter = Router();

const listQuerySchema = z.object({
  category: z.string().optional(),
  page:     z.coerce.number().int().min(1).default(1),
  limit:    z.coerce.number().int().min(1).max(100).default(20),
});

const notFound = (msg: string) => Object.assign(new Error(msg), { status: 404 });

// /daily must be declared before /:id to avoid "daily" being consumed as :id
parablesRouter.get('/daily', async (_req, res) => {
  const parable = await getDailyParable();
  res.json(parable);
});

parablesRouter.get('/:id', async (req, res) => {
  const parable = await prisma.parable.findUnique({ where: { id: req.params.id } });
  if (!parable) throw notFound('Parable not found');
  res.json(parable);
});

parablesRouter.get('/', async (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw Object.assign(
      new Error(parsed.error.issues[0]?.message ?? 'Invalid query parameters'),
      { status: 400 },
    );
  }

  const { category, page, limit } = parsed.data;
  const skip = (page - 1) * limit;

  let where = {};
  if (category !== undefined) {
    const cat = await prisma.category.findUnique({ where: { slug: category } });
    if (!cat) throw notFound(`Category '${category}' not found`);
    where = { categoryId: cat.id };
  }

  const [parables, total] = await Promise.all([
    prisma.parable.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.parable.count({ where }),
  ]);

  res.json({ data: parables, page, limit, total });
});

export { parablesRouter };
