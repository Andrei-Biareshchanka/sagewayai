import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../lib/prisma', () => ({
  prisma: {
    dailyDigest: {
      findMany: vi.fn(),
    },
    $queryRaw: vi.fn(),
  },
}));

import { findParableForQuote } from './digest';
import { prisma } from '../lib/prisma';

const mockPrisma = prisma as unknown as {
  dailyDigest: { findMany: ReturnType<typeof vi.fn> };
  $queryRaw: ReturnType<typeof vi.fn>;
};

const MOCK_MATCH = {
  id: 'parable-1',
  title: 'The Mountain Climber',
  content: 'A climber faced a steep ridge...',
  moral: 'Growth comes from the climb, not the summit.',
  source: null,
  readTime: 2,
  categoryId: 'category-1',
  similarity: 0.64,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('findParableForQuote', () => {
  it('returns a match when one exists outside the cooldown window', async () => {
    mockPrisma.dailyDigest.findMany
      .mockResolvedValueOnce([]) // paired parable ids for this quote
      .mockResolvedValueOnce([]); // recently used parable ids (cooldown)
    mockPrisma.$queryRaw.mockResolvedValueOnce([MOCK_MATCH]);

    const result = await findParableForQuote('quote-1');

    expect(result).toEqual(MOCK_MATCH);
    expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('falls back to only the permanent pairing exclusion when cooldown exhausts every parable', async () => {
    mockPrisma.dailyDigest.findMany
      .mockResolvedValueOnce([{ parableId: 'parable-2' }]) // paired with this quote already
      .mockResolvedValueOnce([{ parableId: 'parable-1' }, { parableId: 'parable-3' }]); // on cooldown
    mockPrisma.$queryRaw
      .mockResolvedValueOnce([]) // no candidate left once cooldown is applied
      .mockResolvedValueOnce([MOCK_MATCH]); // relaxed query ignoring cooldown succeeds

    const result = await findParableForQuote('quote-1');

    expect(result).toEqual(MOCK_MATCH);
    expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(2);
  });

  it('throws when no parable is available even after ignoring cooldown', async () => {
    mockPrisma.dailyDigest.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    mockPrisma.$queryRaw.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    await expect(findParableForQuote('quote-1')).rejects.toThrow(
      'No available parable found for quote quote-1',
    );
  });
});
