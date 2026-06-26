import { Router } from 'express';
import { z } from 'zod';

import { getDailyDigest, DigestWithRelations } from '../lib/dailyDigest';
import { getEmbedding } from '../lib/voyage';
import { generateReflection } from '../lib/anthropic';
import { prisma } from '../lib/prisma';

const digestRouter = Router();

const langSchema = z.enum(['en', 'ru']).default('en');

type Lang = 'en' | 'ru';

function localizeQuote(quote: DigestWithRelations['quote'], lang: Lang) {
  return {
    id: quote.id,
    text: lang === 'ru' ? quote.textRu ?? quote.text : quote.text,
    author: lang === 'ru' ? quote.authorRu ?? quote.author : quote.author,
  };
}

function localizeParable(parable: DigestWithRelations['parable'], lang: Lang) {
  return {
    id: parable.id,
    title: lang === 'ru' ? parable.titleRu ?? parable.title : parable.title,
    content: lang === 'ru' ? parable.contentRu ?? parable.content : parable.content,
    moral: lang === 'ru' ? parable.moralRu ?? parable.moral : parable.moral,
    source: parable.source,
    readTime: parable.readTime,
    categoryId: parable.categoryId,
  };
}

function localizeDigest(digest: DigestWithRelations, lang: Lang) {
  return {
    date: digest.date,
    quote: localizeQuote(digest.quote, lang),
    parable: localizeParable(digest.parable, lang),
    conclusion: lang === 'ru' ? digest.conclusionRu : digest.conclusionEn,
    question: lang === 'ru' ? digest.questionRu : digest.questionEn,
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
});

type ParableRow = { id: string; title: string; titleRu: string | null; content: string; contentRu: string | null };
type QuoteRow   = { id: string; text: string; textRu: string | null; author: string; authorRu: string | null };

digestRouter.post('/situation', async (req, res) => {
  const bodyResult = situationBodySchema.safeParse(req.body);
  if (!bodyResult.success) {
    res.status(400).json({ error: bodyResult.error.issues[0]?.message });
    return;
  }
  const { situation, lang } = bodyResult.data;

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

  const parableText = lang === 'ru' ? parableRow.contentRu ?? parableRow.content : parableRow.content;
  const quoteText   = lang === 'ru' ? quoteRow.textRu ?? quoteRow.text : quoteRow.text;

  const reflection = await generateReflection(quoteText, parableText, lang);

  res.json({
    quote: {
      text:   quoteText,
      author: lang === 'ru' ? quoteRow.authorRu ?? quoteRow.author : quoteRow.author,
    },
    parable: {
      title:   lang === 'ru' ? parableRow.titleRu ?? parableRow.title : parableRow.title,
      content: parableText,
    },
    conclusion: reflection.conclusion,
    question:   reflection.question,
  });
});

export { digestRouter };
