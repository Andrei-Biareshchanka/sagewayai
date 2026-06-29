import { DailyDigest, Parable, Prisma, Quote } from '@prisma/client';
import { prisma } from './prisma';
import { getTodayDate } from './daily';
import { findParableForQuote } from '../services/digest';
import { generateReflection } from './anthropic';
import { buildDigestSlug } from './slug';

const UNIQUE_CONSTRAINT_ERROR = 'P2002';

export type DigestWithRelations = DailyDigest & { quote: Quote; parable: Parable };

async function pickNextQuote(): Promise<Quote> {
  const unusedQuotes = await prisma.quote.findMany({
    where: { digests: { none: {} } },
  });

  if (unusedQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * unusedQuotes.length);
    return unusedQuotes[randomIndex] as Quote;
  }

  const leastRecentDigest = await prisma.dailyDigest.findFirst({
    orderBy: { date: 'asc' },
    include: { quote: true },
  });

  if (!leastRecentDigest) {
    throw new Error('No quotes found in database. Please run the seed.');
  }

  return leastRecentDigest.quote;
}

function buildParableText(title: string, content: string, moral: string): string {
  return `${title}. ${content} Moral: ${moral}`;
}

async function buildReflections(quote: Quote, parable: Awaited<ReturnType<typeof findParableForQuote>>) {
  const [en, ru] = await Promise.all([
    generateReflection(quote.text, buildParableText(parable.title, parable.content, parable.moral), 'en'),
    generateReflection(
      quote.textRu ?? quote.text,
      buildParableText(parable.title, parable.content, parable.moral),
      'ru',
    ),
  ]);

  return {
    conclusionEn: en.conclusion,
    questionEn: en.question,
    conclusionRu: ru.conclusion,
    questionRu: ru.question,
  };
}

async function createDigestForToday(today: Date): Promise<DigestWithRelations> {
  const quote = await pickNextQuote();
  const parable = await findParableForQuote(quote.id);
  const reflections = await buildReflections(quote, parable);
  const slug = await buildDigestSlug(prisma, parable.title, quote.author, quote.theme ?? null);

  return prisma.dailyDigest.create({
    data: {
      date: today,
      slug,
      quoteId: quote.id,
      parableId: parable.id,
      ...reflections,
    },
    include: { quote: true, parable: true },
  });
}

function findDigestForDate(date: Date): Promise<DigestWithRelations | null> {
  return prisma.dailyDigest.findUnique({
    where: { date },
    include: { quote: true, parable: true },
  });
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === UNIQUE_CONSTRAINT_ERROR
  );
}

export async function getDailyDigest(): Promise<DigestWithRelations> {
  const today = getTodayDate();

  const existing = await findDigestForDate(today);
  if (existing) return existing;

  try {
    return await createDigestForToday(today);
  } catch (error) {
    if (!isUniqueConstraintError(error)) throw error;

    const created = await findDigestForDate(today);
    if (!created) throw error;
    return created;
  }
}
