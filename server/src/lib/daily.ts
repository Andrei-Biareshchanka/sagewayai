import { Parable, Prisma } from "@prisma/client";
import { prisma } from "./prisma";

const UNIQUE_CONSTRAINT_ERROR = "P2002";

function getTodayDate(): Date {
  return new Date(new Date().toISOString().split("T")[0] as string);
}

async function pickNextParable(): Promise<Parable> {
  const unusedParables = await prisma.parable.findMany({
    where: { dailies: { none: {} } },
  });

  if (unusedParables.length > 0) {
    const randomIndex = Math.floor(Math.random() * unusedParables.length);
    return unusedParables[randomIndex] as Parable;
  }

  const leastRecentDaily = await prisma.dailyParable.findFirst({
    orderBy: { date: "asc" },
    include: { parable: true },
  });

  if (!leastRecentDaily) {
    throw new Error("No parables found in database. Please run the seed.");
  }

  return leastRecentDaily.parable;
}

export async function getDailyParable(): Promise<Parable> {
  const today = getTodayDate();

  const existing = await prisma.dailyParable.findUnique({
    where: { date: today },
    include: { parable: true },
  });

  if (existing) {
    return existing.parable;
  }

  const selected = await pickNextParable();

  try {
    await prisma.dailyParable.create({
      data: { date: today, parableId: selected.id },
    });
    return selected;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === UNIQUE_CONSTRAINT_ERROR
    ) {
      const created = await prisma.dailyParable.findUnique({
        where: { date: today },
        include: { parable: true },
      });
      return (created as NonNullable<typeof created>).parable;
    }
    throw error;
  }
}
