import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Prisma } from '@prisma/client';

vi.mock('./prisma', () => ({
  prisma: {
    dailyParable: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    parable: {
      findMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      findFirst: vi.fn(),
    },
  },
}));

import { getDailyParable } from './daily';
import { prisma } from './prisma';

const mockPrisma = prisma as unknown as {
  dailyParable: {
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
  parable: {
    findMany: ReturnType<typeof vi.fn>;
    findUniqueOrThrow: ReturnType<typeof vi.fn>;
    findFirst: ReturnType<typeof vi.fn>;
  };
};

const MOCK_PARABLE = {
  id: 'parable-1',
  title: 'The Empty Cup',
  content: 'A scholar came to visit a Zen master...',
  moral: 'To learn, we must first be willing to unlearn.',
  titleRu: null,
  contentRu: null,
  moralRu: null,
  source: null,
  readTime: 2,
  categoryId: 'category-1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getDailyParable', () => {
  it('returns existing daily parable if one exists for today', async () => {
    mockPrisma.dailyParable.findUnique.mockResolvedValue({
      id: 'daily-1',
      date: new Date(),
      parableId: MOCK_PARABLE.id,
      parable: MOCK_PARABLE,
    });

    const result = await getDailyParable();

    expect(result).toEqual(MOCK_PARABLE);
    expect(mockPrisma.parable.findMany).not.toHaveBeenCalled();
    expect(mockPrisma.dailyParable.create).not.toHaveBeenCalled();
  });

  it('picks an unused parable when none set for today', async () => {
    mockPrisma.dailyParable.findUnique.mockResolvedValue(null);
    mockPrisma.parable.findMany.mockResolvedValue([MOCK_PARABLE]);
    mockPrisma.dailyParable.create.mockResolvedValue({});
    mockPrisma.parable.findUniqueOrThrow.mockResolvedValue(MOCK_PARABLE);

    const result = await getDailyParable();

    expect(result).toEqual(MOCK_PARABLE);
    expect(mockPrisma.dailyParable.create).toHaveBeenCalledOnce();
  });

  it('falls back to least recent parable when all parables have been used', async () => {
    mockPrisma.dailyParable.findUnique.mockResolvedValue(null);
    mockPrisma.parable.findMany.mockResolvedValue([]);
    mockPrisma.parable.findFirst = undefined as never;
    mockPrisma.parable.findFirst = vi.fn();

    const dailyParableMock = {
      ...mockPrisma.dailyParable,
      findFirst: vi.fn().mockResolvedValue({
        id: 'daily-old',
        date: new Date('2024-01-01'),
        parableId: MOCK_PARABLE.id,
        parable: MOCK_PARABLE,
      }),
    };

    (prisma as unknown as { dailyParable: typeof dailyParableMock }).dailyParable = dailyParableMock;

    mockPrisma.dailyParable.create.mockResolvedValue({});
    mockPrisma.parable.findUniqueOrThrow.mockResolvedValue(MOCK_PARABLE);

    const result = await getDailyParable();
    expect(result).toEqual(MOCK_PARABLE);
  });

  it('handles race condition (P2002) by reading the already-created record', async () => {
    mockPrisma.dailyParable.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: 'daily-race',
        date: new Date(),
        parableId: MOCK_PARABLE.id,
        parable: MOCK_PARABLE,
      });

    mockPrisma.parable.findMany.mockResolvedValue([MOCK_PARABLE]);

    const p2002 = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '7.0.0',
    });
    mockPrisma.dailyParable.create.mockRejectedValue(p2002);

    const result = await getDailyParable();

    expect(result).toEqual(MOCK_PARABLE);
    expect(mockPrisma.dailyParable.findUnique).toHaveBeenCalledTimes(2);
  });

  it('rethrows non-P2002 errors', async () => {
    mockPrisma.dailyParable.findUnique.mockResolvedValue(null);
    mockPrisma.parable.findMany.mockResolvedValue([MOCK_PARABLE]);

    const dbError = new Prisma.PrismaClientKnownRequestError('Connection lost', {
      code: 'P1001',
      clientVersion: '7.0.0',
    });
    mockPrisma.dailyParable.create.mockRejectedValue(dbError);

    await expect(getDailyParable()).rejects.toThrow('Connection lost');
  });
});
