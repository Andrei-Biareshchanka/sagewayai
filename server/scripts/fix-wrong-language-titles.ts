import { prisma } from '../src/lib/prisma';
import { buildTitleArgs, generateUniqueTitle, isWrongLanguage } from '../src/lib/dailyDigest';

async function main() {
  const digests = await prisma.dailyDigest.findMany({
    include: { quote: true, parable: true },
    orderBy: { date: 'asc' },
  });

  const broken = digests.filter((d) => !d.titleRu || isWrongLanguage(d.titleRu, 'ru'));

  console.log(`Found ${broken.length} digest(s) with a non-Russian titleRu`);

  for (const digest of broken) {
    const { quote, parable } = digest;

    try {
      const titleRu = await generateUniqueTitle('titleRu', buildTitleArgs(quote, parable, 'ru'));

      await prisma.dailyDigest.update({
        where: { id: digest.id },
        data: { titleRu },
      });

      console.log(`✓ ${digest.date.toISOString().slice(0, 10)} | was: "${digest.titleRu}" | now: "${titleRu}"`);

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
