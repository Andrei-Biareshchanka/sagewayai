import type { Request, Response } from 'express';
import { Router } from 'express';

import { authenticate } from '../middleware/authenticate';
import { requireRole } from '../middleware/requireRole';
import { prisma } from '../lib/prisma';

const adminRouter = Router();

adminRouter.use(authenticate, requireRole('ADMIN'));

adminRouter.get('/parables', async (_req: Request, res: Response) => {
  const parables = await prisma.parable.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(parables);
});

export { adminRouter };
