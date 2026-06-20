import { Parable, Prisma } from '@prisma/client';
import { prisma } from './prisma';

const UNIQUE_CONSTRAINT_ERROR = 'P2002';

function getTodayDate(): Date {
  const iso = new Date().toISOString().split('T')[0] ?? '';
  return new Date(iso);
}

async function findUnusedParable(): Promise<Parable | null> {
  const unused = await prisma.parable.findMany({
    where: { dailies: { none: {} } },
  });
  if (unused.length === 0) return null;
  return unused[Math.floor(Math.random() * unused.length)] ?? null;
}

async function findLeastRecentParable(): Promise<Parable> {
  const oldest = await prisma.dailyParable.findFirst({
    orderBy: { date: 'asc' },
    include: { parable: true },
  });
  if (!oldest) throw new Error('No parables found in database. Please run the seed.');
  return oldest.parable;
}

async function pickNextParable(): Promise<Parable> {
  return (await findUnusedParable()) ?? findLeastRecentParable();
}

async function getExistingDaily(today: Date): Promise<Parable | null> {
  const existing = await prisma.dailyParable.findUnique({
    where: { date: today },
    include: { parable: true },
  });
  return existing?.parable ?? null;
}

async function createDailyRecord(today: Date, parableId: string): Promise<Parable> {
  try {
    await prisma.dailyParable.create({ data: { date: today, parableId } });
    const created = await prisma.parable.findUniqueOrThrow({ where: { id: parableId } });
    return created;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === UNIQUE_CONSTRAINT_ERROR
    ) {
      const existing = await getExistingDaily(today);
      if (!existing) throw new Error('Race condition: daily record missing after conflict.');
      return existing;
    }
    throw error;
  }
}

export async function getDailyParable(): Promise<Parable> {
  const today = getTodayDate();
  const existing = await getExistingDaily(today);
  if (existing) return existing;

  const selected = await pickNextParable();
  return createDailyRecord(today, selected.id);
}
