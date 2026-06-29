import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const digests = await prisma.dailyDigest.findMany({
    include: { parable: true, quote: true },
    orderBy: { date: 'asc' },
  });

  for (const d of digests) {
    console.log(`${d.date.toISOString().slice(0, 10)} | "${d.parable.title}" | ${d.quote.author} | theme: ${d.quote.theme ?? 'NULL'} | slug: ${d.slug}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
