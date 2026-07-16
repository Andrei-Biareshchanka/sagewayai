import { Router, Request } from 'express';
import { z } from 'zod';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';

import { getDailyDigest, DigestWithRelations } from '../lib/dailyDigest';
import { getEmbedding } from '../lib/voyage';
import { generateReflection } from '../lib/anthropic';
import { prisma } from '../lib/prisma';
import { pickLocalized, type Lang } from '../lib/locale-content';

const digestRouter = Router();

// Takes the LAST entry in X-Forwarded-For, not the first: Railway (the reverse proxy that
// terminates the actual TCP connection in front of this app) always appends the IP of
// whoever connected to it, so that entry can't be forged — a client can prepend arbitrary
// fake addresses before it, but not control what Railway itself observes and appends.
// Taking the first entry (the old behavior) trusted exactly the attacker-controlled part
// of the header, which let the 20 req/min limiter below be bypassed by sending a different
// fake IP on every request.
function getClientIp(req: Request): string {
  const forwardedFor = req.headers['x-forwarded-for'] as string | undefined;
  const entries = forwardedFor?.split(',').map((ip) => ip.trim()).filter(Boolean);
  return entries?.at(-1) ?? req.socket.remoteAddress ?? 'unknown';
}

// Guards the includeReflection: false path (semantic search only, no Claude call) —
// that path isn't covered by the 24h SituationRequest limit below, so without this,
// each request is an unmetered, unauthenticated Voyage AI embedding call.
const searchOnlyLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(getClientIp(req)),
  skip: (req) => req.body?.includeReflection !== false,
  handler: (_req, res) => {
    res.status(429).json({ error: 'Too many requests, please try again in a minute' });
  },
});

const langSchema = z.enum(['en', 'ru']).default('en');

function localizeQuote(quote: DigestWithRelations['quote'], lang: Lang) {
  return {
    id: quote.id,
    text: pickLocalized(quote.textRu, quote.text, lang),
    author: pickLocalized(quote.authorRu, quote.author, lang),
  };
}

function localizeParable(parable: DigestWithRelations['parable'], lang: Lang) {
  return {
    id: parable.id,
    title: pickLocalized(parable.titleRu, parable.title, lang),
    content: pickLocalized(parable.contentRu, parable.content, lang),
    moral: pickLocalized(parable.moralRu, parable.moral, lang),
    source: parable.source,
    readTime: parable.readTime,
    categoryId: parable.categoryId,
  };
}

function localizeDigest(digest: DigestWithRelations, lang: Lang) {
  return {
    date: digest.date,
    slug: digest.slug,
    imageUrl: digest.imageUrl,
    title: pickLocalized(digest.titleRu, digest.titleEn, lang),
    quote: localizeQuote(digest.quote, lang),
    parable: localizeParable(digest.parable, lang),
    categoryName: pickLocalized(digest.parable.category.nameRu, digest.parable.category.name, lang),
    conclusion: pickLocalized(digest.conclusionRu, digest.conclusionEn, lang),
    question: pickLocalized(digest.questionRu, digest.questionEn, lang),
  };
}

digestRouter.get('/daily', async (req, res) => {
  const langResult = langSchema.safeParse(req.query.lang);
  const lang = langResult.success ? langResult.data : 'en';
  const digest = await getDailyDigest();
  res.json(localizeDigest(digest, lang));
});

const situationBodySchema = z.object({
  situation: z.string().min(10).max(1000),
  lang: z.enum(['en', 'ru']).default('en'),
  chatId: z.string().optional(),
  includeReflection: z.boolean().default(true),
});

type ParableRow = { id: string; title: string; titleRu: string | null; content: string; contentRu: string | null };
type QuoteRow   = { id: string; text: string; textRu: string | null; author: string; authorRu: string | null };

digestRouter.post('/situation', searchOnlyLimiter, async (req, res) => {
  const bodyResult = situationBodySchema.safeParse(req.body);
  if (!bodyResult.success) {
    res.status(400).json({ error: bodyResult.error.issues[0]?.message });
    return;
  }
  const { situation, lang, chatId, includeReflection } = bodyResult.data;

  if (includeReflection) {
    const ip = getClientIp(req);
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const last = chatId
      ? await prisma.situationRequest.findFirst({ where: { chatId, usedAt: { gte: since } } })
      : await prisma.situationRequest.findFirst({ where: { ip, usedAt: { gte: since } } });

    if (last) {
      const msLeft = last.usedAt.getTime() + 86_400_000 - Date.now();
      const hoursLeft = Math.floor(msLeft / 3_600_000);
      const minutesLeft = Math.floor((msLeft % 3_600_000) / 60_000);
      res.status(429).json({
        error: 'rate_limited',
        message: `Следующий запрос через ${hoursLeft}ч ${minutesLeft}м`,
        retryAfter: msLeft,
      });
      return;
    }

    await prisma.situationRequest.create({ data: { ip, chatId } });
  }

  const embedding = await getEmbedding(situation, 'query');
  const vector = `[${embedding.join(',')}]`;

  const [parableRow] = await prisma.$queryRaw<ParableRow[]>`
    SELECT id, title, "titleRu", content, "contentRu"
    FROM "Parable"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vector}::vector
    LIMIT 1
  `;

  const [quoteRow] = await prisma.$queryRaw<QuoteRow[]>`
    SELECT id, text, "textRu", author, "authorRu"
    FROM "Quote"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vector}::vector
    LIMIT 1
  `;

  if (!parableRow || !quoteRow) {
    res.status(503).json({ error: 'No embeddings available' });
    return;
  }

  const parableText = pickLocalized(parableRow.contentRu, parableRow.content, lang);
  const quoteText   = pickLocalized(quoteRow.textRu, quoteRow.text, lang);

  const reflection = includeReflection
    ? await generateReflection(quoteText, parableText, lang)
    : null;

  res.json({
    quote: {
      text:   quoteText,
      author: pickLocalized(quoteRow.authorRu, quoteRow.author, lang),
    },
    parable: {
      title:   pickLocalized(parableRow.titleRu, parableRow.title, lang),
      content: parableText,
    },
    conclusion: reflection?.conclusion ?? null,
    question:   reflection?.question ?? null,
  });
});

export { digestRouter };
