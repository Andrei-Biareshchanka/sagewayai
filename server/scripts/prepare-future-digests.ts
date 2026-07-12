// Tops up the number of unpublished (future) DailyDigest drafts to a target
// count, reusing the same generation path the publish-and-prepare cron uses
// (ensureDraftBuffer / createDigestForDate) — real Claude API calls for
// reflections/titles, not free.
//
// Usage: npx tsx scripts/prepare-future-digests.ts [target=10]
import * as dotenv from 'dotenv';
dotenv.config();

import { prisma } from '../src/lib/prisma';
import { ensureDraftBuffer } from '../src/lib/dailyDigest';

const DEFAULT_TARGET = 10;

async function main(): Promise<void> {
  const target = Number(process.argv[2]) || DEFAULT_TARGET;
  const created = await ensureDraftBuffer(target);
  process.stdout.write(`Done. Created ${created} new draft(s) (target: ${target}).\n`);
}

main()
  .catch((e) => {
    process.stderr.write(`${e}\n`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
