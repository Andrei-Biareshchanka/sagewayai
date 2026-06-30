import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Find parableIds used more than once
  const duplicates = await prisma.$queryRaw<
    { parable_title: string; parableId: string; digest_count: bigint; dates: string[]; digest_ids: string[]; quote_ids: string[] }[]
  >`
    SELECT
      p.title AS parable_title,
      dd."parableId",
      COUNT(*) AS digest_count,
      array_agg(dd.id ORDER BY dd.date) AS digest_ids,
      array_agg(dd.date::text ORDER BY dd.date) AS dates,
      array_agg(dd."quoteId" ORDER BY dd.date) AS quote_ids
    FROM "DailyDigest" dd
    JOIN "Parable" p ON p.id = dd."parableId"
    GROUP BY dd."parableId", p.title
    HAVING COUNT(*) > 1
    ORDER BY COUNT(*) DESC
  `;

  if (duplicates.length === 0) {
    console.log('No duplicate parableIds found.');
    return;
  }

  console.log(`Found ${duplicates.length} parables used more than once:\n`);

  for (const row of duplicates) {
    console.log(`Parable: "${row.parable_title}"`);
    console.log(`  parableId: ${row.parableId}`);
    console.log(`  Used ${row.digest_count} times:`);
    for (let i = 0; i < row.digest_ids.length; i++) {
      console.log(`    [${i === 0 ? 'KEEP' : 'REVIEW'}] id=${row.digest_ids[i]}  date=${row.dates[i]}  quoteId=${row.quote_ids[i]}`);
    }
    console.log();
  }

  // Also check for exact duplicates (same parableId + same quoteId)
  const exactDuplicates = await prisma.$queryRaw<
    { parableId: string; quoteId: string; count: bigint }[]
  >`
    SELECT "parableId", "quoteId", COUNT(*) as count
    FROM "DailyDigest"
    GROUP BY "parableId", "quoteId"
    HAVING COUNT(*) > 1
  `;

  if (exactDuplicates.length > 0) {
    console.log(`\nEXACT DUPLICATES (same parable + same quote — true duplicate content):`);
    for (const row of exactDuplicates) {
      console.log(`  parableId=${row.parableId} quoteId=${row.quoteId} count=${row.count}`);
    }
  } else {
    console.log('No exact duplicates (same parable + same quote) found.');
  }

  // Total digest count
  const total = await prisma.dailyDigest.count();
  console.log(`\nTotal DailyDigest records: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
