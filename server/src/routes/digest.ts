import { Router } from 'express';
import { z } from 'zod';

import { getDailyDigest, DigestWithRelations } from '../lib/dailyDigest';
import { getEmbedding } from '../lib/voyage';
import { generateReflection } from '../lib/anthropic';
import { prisma } from '../lib/prisma';
import { pickLocalized, type Lang } from '../lib/locale-content';

const digestRouter = Router();

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
});

type ParableRow = { id: string; title: string; titleRu: string | null; content: string; contentRu: string | null };
type QuoteRow   = { id: string; text: string; textRu: string | null; author: string; authorRu: string | null };

digestRouter.post('/situation', async (req, res) => {
  const bodyResult = situationBodySchema.safeParse(req.body);
  if (!bodyResult.success) {
    res.status(400).json({ error: bodyResult.error.issues[0]?.message });
    return;
  }
  const { situation, lang, chatId } = bodyResult.data;

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
    req.socket.remoteAddress ??
    'unknown';

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

  const reflection = await generateReflection(quoteText, parableText, lang);

  res.json({
    quote: {
      text:   quoteText,
      author: pickLocalized(quoteRow.authorRu, quoteRow.author, lang),
    },
    parable: {
      title:   pickLocalized(parableRow.titleRu, parableRow.title, lang),
      content: parableText,
    },
    conclusion: reflection.conclusion,
    question:   reflection.question,
  });
});

export { digestRouter };
