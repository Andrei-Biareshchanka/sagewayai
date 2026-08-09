import * as dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';

const DEV_URL = process.env['DATABASE_URL'] ?? 'postgresql://postgres:postgres@localhost:5433/sagewayai';
const PROD_URL = process.env['PROD_DATABASE_URL'];

interface ParableRow {
  id: string;
  title: string;
  content: string;
  moral: string;
  titleRu: string | null;
  contentRu: string | null;
  moralRu: string | null;
  source: string | null;
  readTime: number;
  slugRu: string | null;
  slugEn: string | null;
  imageUrl: string | null;
  imageAltRu: string | null;
  imageAltEn: string | null;
  imagePromptEn: string | null;
  conclusionRu: string | null;
  conclusionEn: string | null;
  questionsRu: unknown;
  questionsEn: unknown;
  reflectionStatus: string;
  category_slug: string;
  embedding_text: string;
}

interface ParableQuoteRow {
  parableId: string;
  quoteId: string;
  position: number;
  isPrimary: boolean;
  text: string;
  textRu: string;
  author: string;
  authorRu: string;
  theme: string | null;
  embedding_text: string;
}

function usage(): never {
  console.error('Usage: npx ts-node --project tsconfig.json scripts/sync-parables-to-prod.ts [--dry-run] <slugRu1> [slugRu2 ...]');
  console.error('Requires PROD_DATABASE_URL env var (never hardcode it in this file).');
  process.exit(1);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const slugs = args.filter((a) => a !== '--dry-run');

  if (slugs.length === 0) usage();
  if (!PROD_URL) {
    console.error('PROD_DATABASE_URL is not set. Extract it with:');
    console.error(`  grep '^# DATABASE_URL=' .env | sed 's/^# //' | cut -d= -f2-`);
    process.exit(1);
  }

  const dev = new Client({ connectionString: DEV_URL });
  const prod = new Client({ connectionString: PROD_URL, ssl: { rejectUnauthorized: false } });
  await dev.connect();
  await prod.connect();

  const parablesRes = await dev.query<ParableRow>(
    `SELECT p.*, c.slug as category_slug, embedding::text as embedding_text
     FROM "Parable" p JOIN "Category" c ON c.id = p."categoryId"
     WHERE p."slugRu" = ANY($1)`,
    [slugs],
  );
  const parables = parablesRes.rows;

  const missing = slugs.filter((s) => !parables.some((p) => p.slugRu === s));
  if (missing.length > 0) {
    console.error(`Not found in dev DB: ${missing.join(', ')}`);
    process.exit(1);
  }

  const notReady = parables.filter(
    (p) => p.reflectionStatus !== 'REVIEWED' || !p.imageUrl || !p.slugRu || !p.slugEn,
  );
  if (notReady.length > 0) {
    console.error('The following parables are not fully ready (need reflectionStatus=REVIEWED, imageUrl, and both slugs):');
    for (const p of notReady) {
      console.error(`  ${p.slugRu ?? p.title}: reflectionStatus=${p.reflectionStatus}, hasImage=${!!p.imageUrl}`);
    }
    process.exit(1);
  }

  const titleCheck = await prod.query<{ title: string }>(
    'SELECT title FROM "Parable" WHERE title = ANY($1)',
    [parables.map((p) => p.title)],
  );
  const alreadyInProd = new Set(titleCheck.rows.map((r) => r.title));
  const toSync = parables.filter((p) => !alreadyInProd.has(p.title));
  const skippedExisting = parables.filter((p) => alreadyInProd.has(p.title));

  if (skippedExisting.length > 0) {
    console.log(`Already in prod, skipping (idempotent): ${skippedExisting.map((p) => p.slugRu).join(', ')}`);
  }
  if (toSync.length === 0) {
    console.log('Nothing new to sync.');
    await dev.end();
    await prod.end();
    return;
  }

  const pqRes = await dev.query<ParableQuoteRow>(
    `SELECT pq."parableId", pq."quoteId", pq.position, pq."isPrimary",
       q.text, q."textRu", q.author, q."authorRu", q.theme, q.embedding::text as embedding_text
     FROM "ParableQuote" pq
     JOIN "Quote" q ON q.id = pq."quoteId"
     WHERE pq."parableId" = ANY($1)`,
    [toSync.map((p) => p.id)],
  );

  const uniqueQuotes = new Map<string, ParableQuoteRow>();
  for (const row of pqRes.rows) uniqueQuotes.set(row.quoteId, row);

  console.log(`Syncing ${toSync.length} parable(s), ${uniqueQuotes.size} unique quote(s), ${pqRes.rows.length} ParableQuote row(s).`);

  if (dryRun) {
    console.log('DRY RUN — no writes.');
    console.log('Parables:', toSync.map((p) => p.slugRu));
    await dev.end();
    await prod.end();
    return;
  }

  await prod.query('BEGIN');
  try {
    const devToProdQuoteId = new Map<string, string>();
    for (const q of uniqueQuotes.values()) {
      await prod.query(
        `INSERT INTO "Quote" (id, text, "textRu", author, "authorRu", theme, embedding, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7::vector, now(), now())
         ON CONFLICT (text, author) DO NOTHING`,
        [q.quoteId, q.text, q.textRu, q.author, q.authorRu, q.theme, q.embedding_text],
      );
      const resolved = await prod.query<{ id: string }>(
        'SELECT id FROM "Quote" WHERE text = $1 AND author = $2',
        [q.text, q.author],
      );
      if (resolved.rows.length === 0) throw new Error(`Quote not found in prod after upsert: ${q.text}`);
      devToProdQuoteId.set(q.quoteId, resolved.rows[0]!.id);
    }

    for (const p of toSync) {
      const catRes = await prod.query<{ id: string }>('SELECT id FROM "Category" WHERE slug = $1', [p.category_slug]);
      if (catRes.rows.length === 0) throw new Error(`Category slug not found in prod: ${p.category_slug}`);
      const categoryId = catRes.rows[0]!.id;

      await prod.query(
        `INSERT INTO "Parable" (
           id, title, content, moral, "titleRu", "contentRu", "moralRu", source, "readTime",
           "slugRu", "slugEn", "imageUrl", "imageAltRu", "imageAltEn", "imagePromptEn",
           "conclusionRu", "conclusionEn", "questionsRu", "questionsEn",
           "reflectionStatus", "reflectionUpdatedAt", "categoryId", embedding, "createdAt", "updatedAt"
         ) VALUES (
           $1, $2, $3, $4, $5, $6, $7, $8, $9,
           $10, $11, $12, $13, $14, $15,
           $16, $17, $18::jsonb, $19::jsonb,
           $20, now(), $21, $22::vector, now(), now()
         )`,
        [
          p.id, p.title, p.content, p.moral, p.titleRu, p.contentRu, p.moralRu, p.source, p.readTime,
          p.slugRu, p.slugEn, p.imageUrl, p.imageAltRu, p.imageAltEn, p.imagePromptEn,
          p.conclusionRu, p.conclusionEn, JSON.stringify(p.questionsRu), JSON.stringify(p.questionsEn),
          p.reflectionStatus, categoryId, p.embedding_text,
        ],
      );
    }

    for (const row of pqRes.rows) {
      const prodQuoteId = devToProdQuoteId.get(row.quoteId);
      await prod.query(
        `INSERT INTO "ParableQuote" (id, "parableId", "quoteId", position, "isPrimary")
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4)`,
        [row.parableId, prodQuoteId, row.position, row.isPrimary],
      );
    }

    const categorySlugs = [...new Set(toSync.map((p) => p.category_slug))];
    for (const slug of categorySlugs) {
      const count = toSync.filter((p) => p.category_slug === slug).length;
      await prod.query('UPDATE "Category" SET "parablesCount" = "parablesCount" + $1 WHERE slug = $2', [count, slug]);
    }

    await prod.query('COMMIT');
    console.log(`COMMITTED. Synced: ${toSync.map((p) => p.slugRu).join(', ')}`);
  } catch (error) {
    await prod.query('ROLLBACK');
    console.error('ROLLED BACK due to error:', error);
    throw error;
  }

  await dev.end();
  await prod.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
