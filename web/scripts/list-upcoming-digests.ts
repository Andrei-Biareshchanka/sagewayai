import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] ?? '' });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const digests = await prisma.dailyDigest.findMany({
    where: { isPublished: false },
    orderBy: { date: 'asc' },
    include: { quote: true, parable: true },
  });

  if (digests.length === 0) {
    console.log('No upcoming unpublished digests found.');
  }

  for (const d of digests) {
    const hasImage = d.imageUrl ? '🖼️ has image' : '⬜ no image';
    console.log(`\n${d.date.toISOString().slice(0, 10)}  ${hasImage}`);
    console.log(`  slug:    ${d.slug}`);
    console.log(`  title:   ${d.titleRu ?? d.parable.titleRu ?? d.parable.title}`);
    console.log(`  quote:   "${(d.quote.textRu ?? d.quote.text).slice(0, 80)}" — ${d.quote.authorRu ?? d.quote.author}`);
    console.log(`  parable: ${d.parable.titleRu ?? d.parable.title}`);
  }

  console.log(`\nTotal upcoming unpublished drafts: ${digests.length}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
