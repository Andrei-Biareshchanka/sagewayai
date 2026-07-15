import type { Request, Response } from 'express';
import { Router } from 'express';

import { authenticate } from '../middleware/authenticate';
import { requireRole } from '../middleware/requireRole';
import { prisma } from '../lib/prisma';
import { getDailyParable } from '../lib/daily';
import { sendDailyParableEmail } from '../lib/email';
import { publishTodayAndPrepareTomorrow } from '../lib/dailyDigest';
import { pickLocalized, type Lang } from '../lib/locale-content';
import { notifyAdmin } from '../lib/adminAlert';

function isValidLang(lang: string): lang is Lang {
  return lang === 'en' || lang === 'ru';
}

function localizeParable(parable: {
  title: string; content: string; moral: string;
  titleRu: string | null; contentRu: string | null; moralRu: string | null;
}, lang: Lang) {
  return {
    title:   pickLocalized(parable.titleRu, parable.title, lang),
    content: pickLocalized(parable.contentRu, parable.content, lang),
    moral:   pickLocalized(parable.moralRu, parable.moral, lang),
  };
}

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
    subscribers.map((sub) => {
      const lang = isValidLang(sub.lang) ? sub.lang : 'en';
      const localized = localizeParable(parable, lang);
      return sendDailyParableEmail({
        to:               sub.email,
        parable:          { ...localized, id: parable.id, readTime: parable.readTime },
        categoryName:     category?.name ?? '',
        unsubscribeToken: sub.unsubscribeToken,
        lang,
      });
    }),
  );

  const sent   = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  res.json({ sent, failed, total: subscribers.length });
});

adminRouter.post('/publish-and-prepare', async (req: Request, res: Response) => {
  const publishSecret = process.env['ADMIN_PUBLISH_SECRET'];
  if (!publishSecret || req.headers['x-publish-secret'] !== publishSecret) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const result = await publishTodayAndPrepareTomorrow();
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await notifyAdmin(`⚠️ publish-and-prepare failed: ${message}`);
    throw error;
  }
});

adminRouter.use(authenticate, requireRole('ADMIN'));

adminRouter.get('/parables', async (_req: Request, res: Response) => {
  const parables = await prisma.parable.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(parables);
});

export { adminRouter };
