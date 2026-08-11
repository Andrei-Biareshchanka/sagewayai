import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../lib/prisma', () => ({
  prisma: {
    dailyDigest: {
      findMany: vi.fn(),
    },
    parable: {
      findUniqueOrThrow: vi.fn(),
    },
    $queryRaw: vi.fn(),
  },
}));

vi.mock('../lib/adminAlert', () => ({
  notifyAdmin: vi.fn().mockResolvedValue(undefined),
}));

import { selectDailyParable, COOLDOWN_DAYS } from './dailyParableSelection';
import { prisma } from '../lib/prisma';
import { notifyAdmin } from '../lib/adminAlert';

const mockPrisma = prisma as unknown as {
  dailyDigest: { findMany: ReturnType<typeof vi.fn> };
  parable: { findUniqueOrThrow: ReturnType<typeof vi.fn> };
  $queryRaw: ReturnType<typeof vi.fn>;
};

const mockNotifyAdmin = notifyAdmin as ReturnType<typeof vi.fn>;

// The ladder's head is what a healthy production run should always use. Every
// step below it is a degradation the service is expected to report.
const STEPS_BELOW_HEAD = 7;

function shown(id: string, lastShown: Date) {
  return { id, lastShown };
}

function neverShown(id: string) {
  return { id, lastShown: null };
}

// selectDailyParable loads the winner's fields in a second query; the tests
// care about which id was drawn, so the loaded row just echoes it back.
function stubCandidateLoad() {
  mockPrisma.parable.findUniqueOrThrow.mockImplementation(({ where }: { where: { id: string } }) =>
    Promise.resolve({ id: where.id, title: `Parable ${where.id}` }),
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  mockPrisma.dailyDigest.findMany.mockResolvedValue([]);
  stubCandidateLoad();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('selectDailyParable', () => {
  it('draws from the full eligible pool rather than always taking the least-recently-shown', async () => {
    const pool = [
      shown('parable-oldest', new Date('2026-01-01')),
      shown('parable-middle', new Date('2026-03-01')),
      shown('parable-newest', new Date('2026-05-01')),
    ];
    mockPrisma.$queryRaw.mockResolvedValue(pool);
    // 0.9 lands on the last element — strict LRU would have returned the first.
    vi.spyOn(Math, 'random').mockReturnValue(0.9);

    const result = await selectDailyParable();

    expect(result.id).toBe('parable-newest');
  });

  it('never returns a parable that is inside the active cooldown window', async () => {
    mockPrisma.dailyDigest.findMany.mockResolvedValue([
      { parableId: 'recently-shown-a' },
      { parableId: 'recently-shown-b' },
    ]);
    mockPrisma.$queryRaw.mockResolvedValue([shown('eligible', new Date('2026-01-01'))]);

    const result = await selectDailyParable();

    expect(result.id).toBe('eligible');
    // The cooldown lookup is what feeds the SQL exclusion, so it must be
    // scoped to the intended window rather than the whole archive.
    const [{ where }] = mockPrisma.dailyDigest.findMany.mock.calls[0] as [{ where: { date: { gte: Date } } }];
    const windowDays = Math.round((Date.now() - where.date.gte.getTime()) / 86_400_000);
    expect(windowDays).toBe(COOLDOWN_DAYS);
  });

  it('prefers never-shown parables over any that have been shown', async () => {
    mockPrisma.$queryRaw.mockResolvedValue([
      shown('shown-long-ago', new Date('2020-01-01')),
      neverShown('fresh-a'),
      neverShown('fresh-b'),
    ]);
    // 0.0 picks the first of whichever pool is drawn from — if the never-shown
    // subset were ignored, this would return 'shown-long-ago'.
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = await selectDailyParable();

    expect(result.id).toBe('fresh-a');
  });

  it('uses the head of the ladder and stays silent when the pool is healthy', async () => {
    mockPrisma.$queryRaw.mockResolvedValue([neverShown('parable-1')]);

    await selectDailyParable();

    expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(1);
    expect(mockNotifyAdmin).not.toHaveBeenCalled();
  });

  it('relaxes to a shorter window only after a stricter one comes back empty', async () => {
    mockPrisma.$queryRaw
      .mockResolvedValueOnce([]) // 70-day window
      .mockResolvedValueOnce([]) // 60-day window
      .mockResolvedValueOnce([neverShown('parable-late')]); // 45-day window

    const result = await selectDailyParable();

    expect(result.id).toBe('parable-late');
    expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(3);
  });

  it('alerts the admin when it has to fall back below the intended cooldown', async () => {
    mockPrisma.$queryRaw
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([neverShown('parable-late')]);

    await selectDailyParable();

    expect(mockNotifyAdmin).toHaveBeenCalledTimes(1);
    expect(mockNotifyAdmin.mock.calls[0]?.[0]).toContain(String(COOLDOWN_DAYS));
  });

  it('throws when no REVIEWED parable exists at any window', async () => {
    mockPrisma.$queryRaw.mockResolvedValue([]);

    await expect(selectDailyParable()).rejects.toThrow('no parable available');
    expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(STEPS_BELOW_HEAD + 1);
  });
});
