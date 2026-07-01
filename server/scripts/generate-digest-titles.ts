import { prisma } from '../src/lib/prisma';
import { buildTitleArgs, generateUniqueTitle } from '../src/lib/dailyDigest';

async function main() {
  const digests = await prisma.dailyDigest.findMany({
    where: { OR: [{ titleEn: null }, { titleRu: null }] },
    include: { quote: true, parable: true },
    orderBy: { date: 'asc' },
  });

  console.log(`Found ${digests.length} digests without titles`);

  for (const digest of digests) {
    const { quote, parable } = digest;

    try {
      const [titleEn, titleRu] = await Promise.all([
        generateUniqueTitle('titleEn', buildTitleArgs(quote, parable, 'en')),
        generateUniqueTitle('titleRu', buildTitleArgs(quote, parable, 'ru')),
      ]);

      await prisma.dailyDigest.update({
        where: { id: digest.id },
        data: { titleEn, titleRu },
      });

      console.log(`✓ ${digest.date.toISOString().slice(0, 10)} | EN: "${titleEn}" | RU: "${titleRu}"`);

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error(`✗ ${digest.date.toISOString().slice(0, 10)} — ${err}`);
    }
  }

  console.log('Done.');
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
