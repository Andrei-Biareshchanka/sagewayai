import { Category, DailyDigest, Parable, Prisma, Quote } from '@prisma/client';
import { prisma } from './prisma';
import { getTodayDate } from './daily';
import { findParableForQuote } from '../services/digest';
import { generateReflection, generateDigestTitle } from './anthropic';
import { buildDigestSlug } from './slug';

const UNIQUE_CONSTRAINT_ERROR = 'P2002';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const PARABLE_WITH_CATEGORY_INCLUDE = { category: true } as const;
type ParableWithCategory = Parable & { category: Category };

export type DigestWithRelations = DailyDigest & { quote: Quote; parable: ParableWithCategory };

function addDaysToToday(days: number): Date {
  return new Date(getTodayDate().getTime() + days * ONE_DAY_MS);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * ONE_DAY_MS);
}

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

export type TitleField = 'titleEn' | 'titleRu';
export type TitleArgs = Parameters<typeof generateDigestTitle>;
type TitleQuote = Pick<Quote, 'text' | 'textRu' | 'author' | 'authorRu' | 'theme'>;
type TitleParable = Pick<Parable, 'title' | 'moral'>;

const MAX_TITLE_ATTEMPTS = 3;

export function buildTitleArgs(
  quote: TitleQuote,
  parable: TitleParable,
  language: 'en' | 'ru',
): TitleArgs {
  return language === 'ru'
    ? [quote.textRu ?? quote.text, quote.authorRu ?? quote.author, parable.title, parable.moral, quote.theme ?? null, 'ru']
    : [quote.text, quote.author, parable.title, parable.moral, quote.theme ?? null, 'en'];
}

async function isTitleTaken(field: TitleField, title: string): Promise<boolean> {
  const where = field === 'titleEn' ? { titleEn: title } : { titleRu: title };
  const existing = await prisma.dailyDigest.findFirst({ where });
  return existing !== null;
}

const CYRILLIC_PATTERN = /[а-яА-ЯёЁ]/;

// Claude sometimes ignores the Russian instruction and answers in English —
// this is only checkable after the fact, since it's free-text LLM output.
export function isWrongLanguage(title: string, language: 'en' | 'ru'): boolean {
  return language === 'ru' && !CYRILLIC_PATTERN.test(title);
}

export async function generateUniqueTitle(field: TitleField, args: TitleArgs): Promise<string> {
  const language = args[5];
  let title = '';
  for (let attempt = 0; attempt < MAX_TITLE_ATTEMPTS; attempt++) {
    title = await generateDigestTitle(...args);
    if (isWrongLanguage(title, language)) continue;
    if (!(await isTitleTaken(field, title))) return title;
  }
  return title;
}

async function buildReflections(quote: Quote, parable: Awaited<ReturnType<typeof findParableForQuote>>) {
  const parableText = buildParableText(parable.title, parable.content, parable.moral);
  const [en, ru, titleEn, titleRu] = await Promise.all([
    generateReflection(quote.text, parableText, 'en'),
    generateReflection(quote.textRu ?? quote.text, parableText, 'ru'),
    generateUniqueTitle('titleEn', buildTitleArgs(quote, parable, 'en')),
    generateUniqueTitle('titleRu', buildTitleArgs(quote, parable, 'ru')),
  ]);

  return {
    conclusionEn: en.conclusion,
    questionEn: en.question,
    conclusionRu: ru.conclusion,
    questionRu: ru.question,
    titleEn,
    titleRu,
  };
}

export async function createDigestForDate(date: Date, isPublished: boolean): Promise<DigestWithRelations> {
  const quote = await pickNextQuote();
  const parable = await findParableForQuote(quote.id);
  const reflections = await buildReflections(quote, parable);
  const slug = await buildDigestSlug(prisma, parable.title, quote.author, quote.theme ?? null);

  return prisma.dailyDigest.create({
    data: {
      date,
      slug,
      quoteId: quote.id,
      parableId: parable.id,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
      ...reflections,
    },
    include: { quote: true, parable: { include: PARABLE_WITH_CATEGORY_INCLUDE } },
  });
}

function findDigestForDate(date: Date): Promise<DigestWithRelations | null> {
  return prisma.dailyDigest.findUnique({
    where: { date },
    include: { quote: true, parable: { include: PARABLE_WITH_CATEGORY_INCLUDE } },
  });
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === UNIQUE_CONSTRAINT_ERROR
  );
}

// Publishes on read if it isn't already — a safety net for when the publish-and-prepare
// cron hasn't run yet (e.g. it failed or the day's digest was only ever pre-created as
// tomorrow's draft). Without this, a missed cron run would make today's digest
// unreachable via GET /api/digest/daily until the next cron tick.
async function publishDigest(digest: DigestWithRelations): Promise<DigestWithRelations> {
  if (digest.isPublished) return digest;
  return prisma.dailyDigest.update({
    where: { id: digest.id },
    data: { isPublished: true, publishedAt: new Date() },
    include: { quote: true, parable: { include: PARABLE_WITH_CATEGORY_INCLUDE } },
  });
}

export async function getDailyDigest(): Promise<DigestWithRelations> {
  const today = getTodayDate();

  const existing = await findDigestForDate(today);
  if (existing) return publishDigest(existing);

  try {
    const created = await createDigestForDate(today, true);
    return created;
  } catch (error) {
    if (!isUniqueConstraintError(error)) throw error;

    const created = await findDigestForDate(today);
    if (!created) throw error;
    return publishDigest(created);
  }
}

export type PublishAndPrepareResult = {
  published: string | null;
  prepared: string | null;
};

// Bootstrap: on the very first run there is no pre-existing draft for `date`
// (nothing has ever run before), so it's created and published in one step
// instead of only publishing an existing draft — otherwise that day would
// never get a digest at all.
async function publishDraftForDate(date: Date): Promise<string | null> {
  const digest = await findDigestForDate(date);
  if (!digest) {
    const created = await createDigestForDate(date, true);
    return created.slug;
  }
  if (!digest.isPublished) {
    const updated = await publishDigest(digest);
    return updated.slug;
  }
  return null;
}

async function prepareDraftForDate(date: Date): Promise<string | null> {
  const existing = await findDigestForDate(date);
  if (existing) return null;
  const created = await createDigestForDate(date, false);
  return created.slug;
}

// Keeps a rolling buffer of unpublished future drafts so there's always enough
// lead time to manually attach images before each digest publishes. Tops up to
// `target` by creating drafts for consecutive dates past whatever the furthest
// existing digest (of any status) is — never creates a date that's already taken.
export async function ensureDraftBuffer(target: number): Promise<number> {
  const existingDrafts = await prisma.dailyDigest.count({ where: { isPublished: false } });
  const needed = target - existingDrafts;
  if (needed <= 0) return 0;

  const furthest = await prisma.dailyDigest.findFirst({
    orderBy: { date: 'desc' },
    select: { date: true },
  });
  let cursor = furthest ? new Date(furthest.date) : getTodayDate();

  for (let i = 0; i < needed; i++) {
    cursor = addDays(cursor, 1);
    await createDigestForDate(cursor, false);
  }
  return needed;
}

const DRAFT_BUFFER_TARGET = 10;
const DRAFT_BUFFER_REPLENISH_THRESHOLD = 7;

// Called by the publish-digest cron, scheduled at 22:00 UTC = 01:00 Moscow time
// (UTC+3, no DST) — deliberately anchored to MSK, the primary RU/BY audience's clock.
// At that moment `getTodayDate()` (UTC) is still "today" — UTC midnight hasn't rolled
// over yet — but it's already the start of MSK's *next* calendar day. So the digest
// this run is responsible for publishing is dated UTC-today + 1, not UTC-today (that
// one was already published by the previous run); the one to pre-create as a draft
// is UTC-today + 2.
export async function publishTodayAndPrepareTomorrow(): Promise<PublishAndPrepareResult> {
  const published = await publishDraftForDate(addDaysToToday(1));
  const prepared = await prepareDraftForDate(addDaysToToday(2));

  // Beyond the standing 1-day-ahead draft above, keep a deeper buffer topped up
  // so there's always several days of lead time to manually prepare digest images.
  const remainingDrafts = await prisma.dailyDigest.count({ where: { isPublished: false } });
  if (remainingDrafts <= DRAFT_BUFFER_REPLENISH_THRESHOLD) {
    await ensureDraftBuffer(DRAFT_BUFFER_TARGET);
  }

  return { published, prepared };
}
