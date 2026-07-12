import { Router } from 'express';
import { z } from 'zod';

import { getDailyParable } from '../lib/daily';
import { prisma } from '../lib/prisma';
import { searchParablesBySemantic } from '../services/search';
import { pickLocalized, type Lang } from '../lib/locale-content';

const parablesRouter = Router();

const langSchema = z.enum(['en', 'ru']).default('en');

const listQuerySchema = z.object({
  category: z.string().optional(),
  page:     z.coerce.number().int().min(1).default(1),
  limit:    z.coerce.number().int().min(1).max(100).default(20),
});

const notFound = (msg: string) => Object.assign(new Error(msg), { status: 404 });

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
  return {
    ...rest,
    title:   pickLocalized(titleRu, parable.title, lang),
    content: pickLocalized(contentRu, parable.content, lang),
    moral:   pickLocalized(moralRu, parable.moral, lang),
  };
}

const searchBodySchema = z.object({
  query: z.string().min(1).max(500),
  k:     z.coerce.number().int().min(1).max(20).default(5),
});

// /search and /daily must be declared before /:id
parablesRouter.post('/search', async (req, res) => {
  const parsed = searchBodySchema.safeParse(req.body);
  if (!parsed.success) {
    throw Object.assign(
      new Error(parsed.error.issues[0]?.message ?? 'Invalid request body'),
      { status: 400 },
    );
  }
  const { query, k } = parsed.data;
  const results = await searchParablesBySemantic(query, k);
  res.json({ data: results, query, k });
});

parablesRouter.get('/daily', async (req, res) => {
  const langResult = langSchema.safeParse(req.query.lang);
  const lang = langResult.success ? langResult.data : 'en';
  const parable = await getDailyParable();
  res.json(localizeParable(parable as RawParable, lang));
});

parablesRouter.get('/:id', async (req, res) => {
  const langResult = langSchema.safeParse(req.query.lang);
  const lang = langResult.success ? langResult.data : 'en';
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

  const { category, page, limit } = parsed.data;
  const langResult = langSchema.safeParse(req.query.lang);
  const lang = langResult.success ? langResult.data : 'en';
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
