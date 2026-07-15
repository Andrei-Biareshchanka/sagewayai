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

  it('degrades the cooldown window step by step before falling back to permanent-only exclusion', async () => {
    mockPrisma.dailyDigest.findMany
      .mockResolvedValueOnce([{ parableId: 'parable-2' }]) // paired with this quote already
      .mockResolvedValue([{ parableId: 'parable-1' }, { parableId: 'parable-3' }]); // on cooldown at every non-zero window
    mockPrisma.$queryRaw
      .mockResolvedValueOnce([]) // 14-day window: no candidate
      .mockResolvedValueOnce([]) // 10-day window: no candidate
      .mockResolvedValueOnce([]) // 7-day window: no candidate
      .mockResolvedValueOnce([]) // 3-day window: no candidate
      .mockResolvedValueOnce([]) // 1-day window: no candidate
      .mockResolvedValueOnce([MOCK_MATCH]); // 0 (permanent-only): succeeds

    const result = await findParableForQuote('quote-1');

    expect(result).toEqual(MOCK_MATCH);
    expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(6);
  });

  it('throws when no parable is available at any cooldown step, including permanent-only', async () => {
    mockPrisma.dailyDigest.findMany.mockResolvedValue([]);
    mockPrisma.$queryRaw.mockResolvedValue([]);

    await expect(findParableForQuote('quote-1')).rejects.toThrow(
      'No available parable found for quote quote-1',
    );
    expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(6);
  });
});
