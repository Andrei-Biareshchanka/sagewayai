import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Prisma } from '@prisma/client';

vi.mock('./prisma', () => ({
  prisma: {
    dailyDigest: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
    },
  },
}));

// Step 2e: createDigestForDate now goes through the parable-first pipeline
// (selectDailyParable + findQuoteForParable, services/dailyParableSelection.ts)
// instead of the old quote-first pickNextQuote + findParableForQuote. Mocking
// the whole module — same pattern the old '../services/digest' mock used —
// keeps these tests about dailyDigest.ts's own orchestration, not about
// selectDailyParable's internal cooldown/LRU SQL (that belongs in a
// dedicated dailyParableSelection.test.ts).
vi.mock('../services/dailyParableSelection', () => ({
  selectDailyParable: vi.fn(),
  findQuoteForParable: vi.fn(),
}));

vi.mock('./anthropic', () => ({
  generateReflection: vi.fn(),
  generateDigestTitle: vi.fn(),
}));

import { getDailyDigest, publishTodayAndPrepareTomorrow } from './dailyDigest';
import { prisma } from './prisma';
import { selectDailyParable, findQuoteForParable } from '../services/dailyParableSelection';
import { generateReflection, generateDigestTitle } from './anthropic';

const mockPrisma = prisma as unknown as {
  dailyDigest: {
    findUnique: ReturnType<typeof vi.fn>;
    findFirst: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    count: ReturnType<typeof vi.fn>;
  };
};

const mockSelectDailyParable = selectDailyParable as ReturnType<typeof vi.fn>;
const mockFindQuoteForParable = findQuoteForParable as ReturnType<typeof vi.fn>;
const mockGenerateReflection = generateReflection as ReturnType<typeof vi.fn>;
const mockGenerateDigestTitle = generateDigestTitle as ReturnType<typeof vi.fn>;

const MOCK_QUOTE = {
  id: 'quote-1',
  text: 'Difficulties strengthen the mind, as labor does the body.',
  textRu: 'Трудности закаляют разум, как труд закаляет тело.',
  author: 'Seneca',
  authorRu: 'Сенека',
  theme: 'stoic-resilience',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const MOCK_PARABLE_MATCH = {
  id: 'parable-1',
  title: 'The Mountain Climber',
  content: 'A climber faced a steep ridge...',
  moral: 'Growth comes from the climb, not the summit.',
  source: null,
  readTime: 2,
  categoryId: 'category-1',
};

const MOCK_DIGEST_ROW = {
  id: 'digest-1',
  date: new Date(),
  quoteId: MOCK_QUOTE.id,
  parableId: MOCK_PARABLE_MATCH.id,
  conclusionEn: 'EN conclusion',
  conclusionRu: 'RU conclusion',
  questionEn: 'EN question?',
  questionRu: 'RU question?',
  isPublished: true,
  publishedAt: new Date(),
  createdAt: new Date(),
  quote: MOCK_QUOTE,
  parable: MOCK_PARABLE_MATCH,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getDailyDigest', () => {
  it('returns existing digest if one exists for today', async () => {
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(MOCK_DIGEST_ROW);

    const result = await getDailyDigest();

    expect(result).toEqual(MOCK_DIGEST_ROW);
    expect(mockSelectDailyParable).not.toHaveBeenCalled();
    expect(mockPrisma.dailyDigest.create).not.toHaveBeenCalled();
  });

  it('builds a new digest when none exists for today', async () => {
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(null);
    mockPrisma.dailyDigest.findFirst.mockResolvedValue(null);
    mockSelectDailyParable.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockFindQuoteForParable.mockResolvedValue(MOCK_QUOTE);
    mockGenerateReflection
      .mockResolvedValueOnce({ conclusion: 'EN conclusion', question: 'EN question?' })
      .mockResolvedValueOnce({ conclusion: 'RU conclusion', question: 'RU question?' });
    mockGenerateDigestTitle.mockResolvedValue('Тестовый заголовок');
    mockPrisma.dailyDigest.create.mockResolvedValue(MOCK_DIGEST_ROW);

    const result = await getDailyDigest();

    expect(result).toEqual(MOCK_DIGEST_ROW);
    expect(mockSelectDailyParable).toHaveBeenCalled();
    expect(mockFindQuoteForParable).toHaveBeenCalledWith(MOCK_PARABLE_MATCH);
    expect(mockGenerateReflection).toHaveBeenCalledTimes(2);
    expect(mockGenerateDigestTitle).toHaveBeenCalledTimes(2);
    expect(mockPrisma.dailyDigest.create).toHaveBeenCalledOnce();
  });

  it('regenerates a title that already exists on another digest', async () => {
    // titleEn and titleRu are generated concurrently (Promise.all), so this mock is keyed
    // by the actual arguments each call receives rather than call order, which would be
    // nondeterministic across the two concurrent retry loops.
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(null);
    mockSelectDailyParable.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockFindQuoteForParable.mockResolvedValue(MOCK_QUOTE);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });
    mockPrisma.dailyDigest.create.mockResolvedValue(MOCK_DIGEST_ROW);

    let enAttempts = 0;
    mockGenerateDigestTitle.mockImplementation((...args: unknown[]) => {
      const language = args[5];
      if (language !== 'en') return Promise.resolve('Заголовок РУ');
      enAttempts += 1;
      return Promise.resolve(enAttempts === 1 ? 'Taken Title' : 'Fresh Title');
    });
    mockPrisma.dailyDigest.findFirst.mockImplementation(({ where }: { where: { titleEn?: string } }) =>
      Promise.resolve(where.titleEn === 'Taken Title' ? MOCK_DIGEST_ROW : null),
    );

    await getDailyDigest();

    expect(mockPrisma.dailyDigest.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ titleEn: 'Fresh Title', titleRu: 'Заголовок РУ' }),
      }),
    );
  });

  it('regenerates a titleRu that came back in English instead of Russian', async () => {
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(null);
    mockPrisma.dailyDigest.findFirst.mockResolvedValue(null); // nothing is a duplicate
    mockSelectDailyParable.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockFindQuoteForParable.mockResolvedValue(MOCK_QUOTE);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });
    mockPrisma.dailyDigest.create.mockResolvedValue(MOCK_DIGEST_ROW);

    let ruAttempts = 0;
    mockGenerateDigestTitle.mockImplementation((...args: unknown[]) => {
      const language = args[5];
      if (language !== 'ru') return Promise.resolve('English Title');
      ruAttempts += 1;
      return Promise.resolve(ruAttempts < 2 ? 'English Title Instead Of Russian' : 'Русский заголовок');
    });

    await getDailyDigest();

    expect(ruAttempts).toBe(2);
    expect(mockPrisma.dailyDigest.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ titleRu: 'Русский заголовок' }) }),
    );
  });

  it('gives up after max attempts and keeps the last generated title', async () => {
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(null);
    mockPrisma.dailyDigest.findFirst.mockResolvedValue(MOCK_DIGEST_ROW); // always "taken"
    mockSelectDailyParable.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockFindQuoteForParable.mockResolvedValue(MOCK_QUOTE);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });
    mockGenerateDigestTitle.mockResolvedValue('Всегда занято');
    mockPrisma.dailyDigest.create.mockResolvedValue(MOCK_DIGEST_ROW);

    await getDailyDigest();

    // 3 attempts per language (titleEn + titleRu)
    expect(mockGenerateDigestTitle).toHaveBeenCalledTimes(6);
    expect(mockPrisma.dailyDigest.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ titleEn: 'Всегда занято' }) }),
    );
  });

  it('handles race condition (P2002) by reading the already-created record', async () => {
    mockPrisma.dailyDigest.findUnique
      .mockResolvedValueOnce(null)          // findDigestForDate: no digest yet
      .mockResolvedValueOnce(null)          // buildDigestSlug: base slug not taken
      .mockResolvedValueOnce(MOCK_DIGEST_ROW); // findDigestForDate retry after P2002

    mockPrisma.dailyDigest.findFirst.mockResolvedValue(null);
    mockSelectDailyParable.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockFindQuoteForParable.mockResolvedValue(MOCK_QUOTE);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });
    mockGenerateDigestTitle.mockResolvedValue('Тестовый заголовок');

    const p2002 = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '7.0.0',
    });
    mockPrisma.dailyDigest.create.mockRejectedValue(p2002);

    const result = await getDailyDigest();

    expect(result).toEqual(MOCK_DIGEST_ROW);
    expect(mockPrisma.dailyDigest.findUnique).toHaveBeenCalledTimes(3);
  });

  it('rethrows non-P2002 errors', async () => {
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(null);
    mockPrisma.dailyDigest.findFirst.mockResolvedValue(null);
    mockSelectDailyParable.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockFindQuoteForParable.mockResolvedValue(MOCK_QUOTE);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });
    mockGenerateDigestTitle.mockResolvedValue('Тестовый заголовок');

    const dbError = new Prisma.PrismaClientKnownRequestError('Connection lost', {
      code: 'P1001',
      clientVersion: '7.0.0',
    });
    mockPrisma.dailyDigest.create.mockRejectedValue(dbError);

    await expect(getDailyDigest()).rejects.toThrow('Connection lost');
  });

  it('auto-publishes an existing unpublished digest (cron missed its run)', async () => {
    const draft = { ...MOCK_DIGEST_ROW, isPublished: false, publishedAt: null };
    const published = { ...draft, isPublished: true, publishedAt: new Date() };
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(draft);
    mockPrisma.dailyDigest.update.mockResolvedValue(published);

    const result = await getDailyDigest();

    expect(mockPrisma.dailyDigest.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: draft.id },
        data: expect.objectContaining({ isPublished: true }),
      }),
    );
    expect(result).toEqual(published);
  });

  it('does not call update when the existing digest is already published', async () => {
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(MOCK_DIGEST_ROW);

    await getDailyDigest();

    expect(mockPrisma.dailyDigest.update).not.toHaveBeenCalled();
  });
});

describe('publishTodayAndPrepareTomorrow', () => {
  it('publishes an unpublished draft for digestDateToPublish and creates digestDateToPrepare when missing', async () => {
    const draftToPublish = { ...MOCK_DIGEST_ROW, id: 'digest-publish', slug: 'publish-slug', isPublished: false };
    const published = { ...draftToPublish, isPublished: true, publishedAt: new Date() };
    const prepared = { ...MOCK_DIGEST_ROW, id: 'digest-prepare', slug: 'prepare-slug', isPublished: false };

    mockPrisma.dailyDigest.findUnique
      .mockResolvedValueOnce(draftToPublish)  // findDigestForDate(digestDateToPublish) — existing draft
      .mockResolvedValueOnce(null)            // findDigestForDate(digestDateToPrepare)
      .mockResolvedValueOnce(null);            // buildDigestSlug: base slug not taken
    mockPrisma.dailyDigest.update.mockResolvedValue(published);
    mockPrisma.dailyDigest.findFirst.mockResolvedValue(null);
    mockSelectDailyParable.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockFindQuoteForParable.mockResolvedValue(MOCK_QUOTE);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });
    mockGenerateDigestTitle.mockResolvedValue('Тестовый заголовок');
    mockPrisma.dailyDigest.create.mockResolvedValue(prepared);
    mockPrisma.dailyDigest.count.mockResolvedValue(8); // above the replenish threshold — no buffer top-up

    const result = await publishTodayAndPrepareTomorrow();

    expect(result).toEqual({ published: draftToPublish.slug, prepared: prepared.slug });
    expect(mockPrisma.dailyDigest.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ isPublished: false, publishedAt: null }) }),
    );
  });

  it('is a no-op when digestDateToPublish is already published and digestDateToPrepare already exists', async () => {
    mockPrisma.dailyDigest.findUnique
      .mockResolvedValueOnce(MOCK_DIGEST_ROW) // findDigestForDate(digestDateToPublish) — already published
      .mockResolvedValueOnce(MOCK_DIGEST_ROW); // findDigestForDate(digestDateToPrepare) — already exists
    mockPrisma.dailyDigest.count.mockResolvedValue(8); // above the replenish threshold — no buffer top-up

    const result = await publishTodayAndPrepareTomorrow();

    expect(result).toEqual({ published: null, prepared: null });
    expect(mockPrisma.dailyDigest.update).not.toHaveBeenCalled();
    expect(mockPrisma.dailyDigest.create).not.toHaveBeenCalled();
  });

  it('bootstrap: creates and publishes digestDateToPublish directly when no draft exists at all', async () => {
    const publishedFromScratch = { ...MOCK_DIGEST_ROW, id: 'digest-publish', slug: 'publish-slug', isPublished: true };
    const prepared = { ...MOCK_DIGEST_ROW, id: 'digest-prepare', slug: 'prepare-slug', isPublished: false };

    mockPrisma.dailyDigest.findUnique
      .mockResolvedValueOnce(null) // findDigestForDate(digestDateToPublish) — nothing exists yet
      .mockResolvedValueOnce(null) // buildDigestSlug: base slug not taken (for the publish-step create)
      .mockResolvedValueOnce(null) // findDigestForDate(digestDateToPrepare)
      .mockResolvedValueOnce(null); // buildDigestSlug: base slug not taken (for the prepare-step create)
    mockPrisma.dailyDigest.findFirst.mockResolvedValue(null);
    mockSelectDailyParable.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockFindQuoteForParable.mockResolvedValue(MOCK_QUOTE);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });
    mockGenerateDigestTitle.mockResolvedValue('Тестовый заголовок');
    mockPrisma.dailyDigest.create
      .mockResolvedValueOnce(publishedFromScratch)
      .mockResolvedValueOnce(prepared);
    mockPrisma.dailyDigest.count.mockResolvedValue(8); // above the replenish threshold — no buffer top-up

    const result = await publishTodayAndPrepareTomorrow();

    expect(result).toEqual({ published: publishedFromScratch.slug, prepared: prepared.slug });
    expect(mockPrisma.dailyDigest.create).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ data: expect.objectContaining({ isPublished: true }) }),
    );
    expect(mockPrisma.dailyDigest.create).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ data: expect.objectContaining({ isPublished: false, publishedAt: null }) }),
    );
    expect(mockPrisma.dailyDigest.update).not.toHaveBeenCalled();
  });

  it('tops up the draft buffer to 10 when it drops to the replenish threshold', async () => {
    const draftToPublish = { ...MOCK_DIGEST_ROW, id: 'digest-publish', slug: 'publish-slug', isPublished: false };
    const published = { ...draftToPublish, isPublished: true, publishedAt: new Date() };
    const prepared = { ...MOCK_DIGEST_ROW, id: 'digest-prepare', slug: 'prepare-slug', isPublished: false };

    // Default fallback for buildDigestSlug's uniqueness checks — without this, once the
    // two queued values below are consumed, the mock falls through to whatever a *prior*
    // test in this file left as findUnique's base implementation (clearAllMocks() only
    // resets call history, not mockResolvedValue defaults), which can be truthy and send
    // buildDigestSlug's `while (true)` uniqueness loop spinning forever.
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(null);
    mockPrisma.dailyDigest.findUnique
      .mockResolvedValueOnce(draftToPublish) // findDigestForDate(digestDateToPublish) — existing draft
      .mockResolvedValueOnce(null);          // findDigestForDate(digestDateToPrepare)
    mockPrisma.dailyDigest.update.mockResolvedValue(published);
    // furthest-date lookup for ensureDraftBuffer also goes through findFirst — same mock
    // used for slug-uniqueness checks, so just resolve every findFirst call to null/no-match.
    mockPrisma.dailyDigest.findFirst.mockResolvedValue(null);
    mockSelectDailyParable.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockFindQuoteForParable.mockResolvedValue(MOCK_QUOTE);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });
    mockGenerateDigestTitle.mockResolvedValue('Тестовый заголовок');
    mockPrisma.dailyDigest.create.mockResolvedValue(prepared);
    // 6 remaining drafts (≤ threshold of 7) → ensureDraftBuffer(10) should create 4 more.
    mockPrisma.dailyDigest.count.mockResolvedValue(6);

    await publishTodayAndPrepareTomorrow();

    // 1 create for prepareDraftForDate(digestDateToPrepare) + 4 for the buffer top-up.
    expect(mockPrisma.dailyDigest.create).toHaveBeenCalledTimes(5);
  });
});
