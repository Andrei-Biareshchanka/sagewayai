import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

const subscribeRouter = Router();

const subscribeSchema = z.object({
  email: z.string().email(),
});

subscribeRouter.post('/', async (req: Request, res: Response) => {
  const result = subscribeSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.issues[0]?.message ?? 'Invalid email' });
    return;
  }

  const { email } = result.data;

  const existing = await prisma.emailSubscriber.findUnique({ where: { email } });

  if (existing) {
    if (!existing.active) {
      await prisma.emailSubscriber.update({ where: { email }, data: { active: true } });
      res.json({ message: 'Resubscribed successfully' });
      return;
    }
    res.json({ message: 'Already subscribed' });
    return;
  }

  await prisma.emailSubscriber.create({ data: { email } });
  res.status(201).json({ message: 'Subscribed successfully' });
});

subscribeRouter.get('/unsubscribe/:token', async (req: Request, res: Response) => {
  const token = req.params['token'] as string;

  const subscriber = await prisma.emailSubscriber.findUnique({
    where: { unsubscribeToken: token },
  });

  if (!subscriber) {
    res.status(404).send('Invalid unsubscribe link.');
    return;
  }

  await prisma.emailSubscriber.update({
    where: { unsubscribeToken: token },
    data: { active: false },
  });

  res.send(`
    <html><body style="font-family:sans-serif;text-align:center;padding:60px 20px;">
      <h2 style="color:#1A1A1A;">You've been unsubscribed.</h2>
      <p style="color:#6B7280;">You won't receive daily parables anymore.</p>
      <a href="${process.env['CLIENT_URL'] ?? 'http://localhost:5173'}" style="color:#6B8F71;">← Back to Sageway</a>
    </body></html>
  `);
});

export { subscribeRouter };
