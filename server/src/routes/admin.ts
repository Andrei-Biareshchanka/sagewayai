import type { Request, Response } from 'express';
import { Router } from 'express';

import { authenticate } from '../middleware/authenticate';
import { requireRole } from '../middleware/requireRole';
import { prisma } from '../lib/prisma';
import { getDailyParable } from '../lib/daily';
import { sendDailyParableEmail } from '../lib/email';

const adminRouter = Router();

adminRouter.post('/send-daily', async (req: Request, res: Response) => {
  const sendSecret = process.env['ADMIN_SEND_SECRET'];
  if (!sendSecret || req.headers['x-send-secret'] !== sendSecret) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const parable = await getDailyParable();

  const category = await prisma.category.findUnique({
    where: { id: parable.categoryId },
  });

  const subscribers = await prisma.emailSubscriber.findMany({
    where: { active: true },
  });

  const results = await Promise.allSettled(
    subscribers.map((sub) =>
      sendDailyParableEmail({
        to: sub.email,
        parable,
        categoryName: category?.name ?? '',
        unsubscribeToken: sub.unsubscribeToken,
      }),
    ),
  );

  const sent = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  res.json({ sent, failed, total: subscribers.length });
});

adminRouter.use(authenticate, requireRole('ADMIN'));

adminRouter.get('/parables', async (_req: Request, res: Response) => {
  const parables = await prisma.parable.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(parables);
});

export { adminRouter };
