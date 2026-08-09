import { prisma } from '../../src/lib/prisma';
import { countWords } from '../../src/lib/anthropic';

// countEmDashes itself isn't exported from anthropic.ts, but its pattern is
// documented right next to EM_DASH_REJECT_THRESHOLD: /[—–]/g
function countEmDashes(text: string): number {
  return (text.match(/[—–]/g) ?? []).length;
}

// Local-only length/em-dash check, same thresholds the review-gate prompt
// embeds (REVIEW_LENGTH_BY_LANGUAGE, EM_DASH_REJECT_THRESHOLD) — no API call.
//
// Usage: npx tsx scripts/audit-manual-insights-metrics.ts <slugRu> [<slugRu> ...]
//        npx tsx scripts/audit-manual-insights-metrics.ts               (audits every REVIEWED parable)
const SLUGS = process.argv.slice(2);
const BOUNDS = { en: { min: 380, max: 720 }, ru: { min: 330, max: 620 } };

async function main() {
  const parables = await prisma.parable.findMany({
    where: SLUGS.length > 0 ? { slugRu: { in: SLUGS } } : { reflectionStatus: 'REVIEWED' },
    select: { title: true, slugRu: true, conclusionEn: true, conclusionRu: true },
  });

  for (const p of parables) {
    const enW = countWords(p.conclusionEn ?? '');
    const ruW = countWords(p.conclusionRu ?? '');
    const enD = countEmDashes(p.conclusionEn ?? '');
    const ruD = countEmDashes(p.conclusionRu ?? '');
    console.log(`\n${p.title} (${p.slugRu})`);
    console.log(`  EN: ${enW}w (bound ${BOUNDS.en.min}-${BOUNDS.en.max}) ${enW >= BOUNDS.en.min && enW <= BOUNDS.en.max ? 'OK' : 'FAIL'}, em-dashes: ${enD} (reject if >5)`);
    console.log(`  RU: ${ruW}w (bound ${BOUNDS.ru.min}-${BOUNDS.ru.max}) ${ruW >= BOUNDS.ru.min && ruW <= BOUNDS.ru.max ? 'OK' : 'FAIL'}, em-dashes: ${ruD} (reject if >5)`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
