// Manual verification helper for the publish-and-prepare digest workflow.
// Creates a single unpublished draft dated tomorrow (UTC), reusing the same
// generation path the publish-and-prepare cron uses, without publishing it.
import * as dotenv from 'dotenv';
dotenv.config();

import { prisma } from '../src/lib/prisma';
import { getTodayDate } from '../src/lib/daily';
import { createDigestForDate } from '../src/lib/dailyDigest';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function main(): Promise<void> {
  const tomorrow = new Date(getTodayDate().getTime() + ONE_DAY_MS);

  const existing = await prisma.dailyDigest.findUnique({ where: { date: tomorrow } });
  if (existing) {
    process.stdout.write(
      `Digest for ${tomorrow.toISOString().split('T')[0]} already exists ` +
        `(slug: ${existing.slug}, isPublished: ${existing.isPublished}). Skipping.\n`,
    );
    return;
  }

  const created = await createDigestForDate(tomorrow, false);
  process.stdout.write(
    `Created draft digest for ${tomorrow.toISOString().split('T')[0]}: ` +
      `slug=${created.slug}, isPublished=${created.isPublished}\n`,
  );
}

main()
  .catch((e) => {
    process.stderr.write(`${e}\n`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
