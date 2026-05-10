import { Router } from 'express';
import { z } from 'zod';

import { getDailyParable } from '../lib/daily';
import { prisma } from '../lib/prisma';

const parablesRouter = Router();

const langSchema = z.enum(['en', 'ru']).default('en');

const listQuerySchema = z.object({
  category: z.string().optional(),
  page:     z.coerce.number().int().min(1).default(1),
  limit:    z.coerce.number().int().min(1).max(100).default(20),
  lang:     langSchema,
});

const notFound = (msg: string) => Object.assign(new Error(msg), { status: 404 });

type Lang = 'en' | 'ru';

type RawParable = {
  id: string;
  title: string;
  content: string;
  moral: string;
  titleRu: string | null;
  contentRu: string | null;
  moralRu: string | null;
  source: string | null;
  readTime: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

function localizeParable(parable: RawParable, lang: Lang) {
  const { titleRu, contentRu, moralRu, ...rest } = parable;
  if (lang === 'ru') {
    return {
      ...rest,
      title:   titleRu   ?? parable.title,
      content: contentRu ?? parable.content,
      moral:   moralRu   ?? parable.moral,
    };
  }
  return rest;
}

// /daily must be declared before /:id to avoid "daily" being consumed as :id
parablesRouter.get('/daily', async (req, res) => {
  const lang = langSchema.parse(req.query.lang);
  const parable = await getDailyParable();
  res.json(localizeParable(parable as RawParable, lang));
});

parablesRouter.get('/:id', async (req, res) => {
  const lang = langSchema.parse(req.query.lang);
  const parable = await prisma.parable.findUnique({ where: { id: req.params.id } });
  if (!parable) throw notFound('Parable not found');
  res.json(localizeParable(parable, lang));
});

parablesRouter.get('/', async (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw Object.assign(
      new Error(parsed.error.issues[0]?.message ?? 'Invalid query parameters'),
      { status: 400 },
    );
  }

  const { category, page, limit, lang } = parsed.data;
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

  res.json({
    data: parables.map((p) => localizeParable(p, lang)),
    page,
    limit,
    total,
  });
});

export { parablesRouter };
