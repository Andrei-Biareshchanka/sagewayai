import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Prisma } from '@prisma/client';

vi.mock('./prisma', () => ({
  prisma: {
    dailyDigest: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    quote: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock('../services/digest', () => ({
  findParableForQuote: vi.fn(),
}));

vi.mock('./anthropic', () => ({
  generateReflection: vi.fn(),
}));

import { getDailyDigest } from './dailyDigest';
import { prisma } from './prisma';
import { findParableForQuote } from '../services/digest';
import { generateReflection } from './anthropic';

const mockPrisma = prisma as unknown as {
  dailyDigest: {
    findUnique: ReturnType<typeof vi.fn>;
    findFirst: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
  quote: {
    findMany: ReturnType<typeof vi.fn>;
  };
};

const mockFindParableForQuote = findParableForQuote as ReturnType<typeof vi.fn>;
const mockGenerateReflection = generateReflection as ReturnType<typeof vi.fn>;

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
  similarity: 0.64,
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
    expect(mockPrisma.quote.findMany).not.toHaveBeenCalled();
    expect(mockPrisma.dailyDigest.create).not.toHaveBeenCalled();
  });

  it('builds a new digest when none exists for today', async () => {
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(null);
    mockPrisma.quote.findMany.mockResolvedValue([MOCK_QUOTE]);
    mockFindParableForQuote.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockGenerateReflection
      .mockResolvedValueOnce({ conclusion: 'EN conclusion', question: 'EN question?' })
      .mockResolvedValueOnce({ conclusion: 'RU conclusion', question: 'RU question?' });
    mockPrisma.dailyDigest.create.mockResolvedValue(MOCK_DIGEST_ROW);

    const result = await getDailyDigest();

    expect(result).toEqual(MOCK_DIGEST_ROW);
    expect(mockFindParableForQuote).toHaveBeenCalledWith(MOCK_QUOTE.id);
    expect(mockGenerateReflection).toHaveBeenCalledTimes(2);
    expect(mockPrisma.dailyDigest.create).toHaveBeenCalledOnce();
  });

  it('handles race condition (P2002) by reading the already-created record', async () => {
    mockPrisma.dailyDigest.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(MOCK_DIGEST_ROW);

    mockPrisma.quote.findMany.mockResolvedValue([MOCK_QUOTE]);
    mockFindParableForQuote.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });

    const p2002 = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '7.0.0',
    });
    mockPrisma.dailyDigest.create.mockRejectedValue(p2002);

    const result = await getDailyDigest();

    expect(result).toEqual(MOCK_DIGEST_ROW);
    expect(mockPrisma.dailyDigest.findUnique).toHaveBeenCalledTimes(2);
  });

  it('rethrows non-P2002 errors', async () => {
    mockPrisma.dailyDigest.findUnique.mockResolvedValue(null);
    mockPrisma.quote.findMany.mockResolvedValue([MOCK_QUOTE]);
    mockFindParableForQuote.mockResolvedValue(MOCK_PARABLE_MATCH);
    mockGenerateReflection.mockResolvedValue({ conclusion: 'c', question: 'q?' });

    const dbError = new Prisma.PrismaClientKnownRequestError('Connection lost', {
      code: 'P1001',
      clientVersion: '7.0.0',
    });
    mockPrisma.dailyDigest.create.mockRejectedValue(dbError);

    await expect(getDailyDigest()).rejects.toThrow('Connection lost');
  });
});
