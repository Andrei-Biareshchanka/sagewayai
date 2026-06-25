import { Router } from 'express';
import { z } from 'zod';

import { getDailyDigest, DigestWithRelations } from '../lib/dailyDigest';

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

export { digestRouter };
