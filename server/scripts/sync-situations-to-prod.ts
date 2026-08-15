import * as dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';

const DEV_URL = process.env['DATABASE_URL'] ?? 'postgresql://postgres:postgres@localhost:5433/sagewayai';
const PROD_URL = process.env['PROD_DATABASE_URL'];

interface SituationRow {
  id: string;
  slugRu: string;
  slugEn: string;
  h1Ru: string;
  h1En: string;
  introRu: string;
  introEn: string;
  metaDescriptionRu: string;
  metaDescriptionEn: string;
  isPublished: boolean;
}

interface SituationParableRow {
  situationId: string;
  parableId: string;
  parableSlugRu: string;
  position: number;
  noteRu: string | null;
  noteEn: string | null;
}

function usage(): never {
  console.error('Usage: npx ts-node --project tsconfig.json scripts/sync-situations-to-prod.ts [--dry-run] <slugRu1> [slugRu2 ...]');
  console.error('Requires PROD_DATABASE_URL env var (never hardcode it in this file).');
  process.exit(1);
}

function parseArgs(): { dryRun: boolean; slugs: string[] } {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const slugs = args.filter((a) => a !== '--dry-run');
  if (slugs.length === 0) usage();
  return { dryRun, slugs };
}

function requireProdUrl(): string {
  if (!PROD_URL) {
    console.error('PROD_DATABASE_URL is not set. Extract it with:');
    console.error(`  grep '^# DATABASE_URL=' .env | sed 's/^# //' | cut -d= -f2-`);
    process.exit(1);
  }
  return PROD_URL;
}

async function fetchSituationsFromDev(dev: Client, slugs: string[]): Promise<SituationRow[]> {
  const res = await dev.query<SituationRow>('SELECT * FROM "Situation" WHERE "slugRu" = ANY($1)', [slugs]);
  const missing = slugs.filter((s) => !res.rows.some((r) => r.slugRu === s));
  if (missing.length > 0) {
    console.error(`Not found in dev DB: ${missing.join(', ')}`);
    process.exit(1);
  }
  return res.rows;
}

function assertAllPublished(situations: SituationRow[]): void {
  const notPublished = situations.filter((s) => !s.isPublished);
  if (notPublished.length === 0) return;
  console.error('The following situations are not isPublished in dev, refusing to sync:');
  for (const s of notPublished) console.error(`  ${s.slugRu}`);
  process.exit(1);
}

async function fetchSituationParablesFromDev(dev: Client, situationIds: string[]): Promise<SituationParableRow[]> {
  const res = await dev.query<SituationParableRow>(
    `SELECT sp."situationId", sp."parableId", p."slugRu" as "parableSlugRu", sp.position, sp."noteRu", sp."noteEn"
     FROM "SituationParable" sp
     JOIN "Parable" p ON p.id = sp."parableId"
     WHERE sp."situationId" = ANY($1)
     ORDER BY sp."situationId", sp.position`,
    [situationIds],
  );
  return res.rows;
}

// Situations only ever reference already-existing Parables (by slugRu) — this
// script never creates parables itself. A referenced parable missing in prod
// almost always means it was backfilled to REVIEWED after the last
// sync-parables-to-prod.ts run and needs that script run first.
async function assertAllParablesInProd(
  prod: Client,
  spRows: SituationParableRow[],
): Promise<Map<string, string>> {
  const slugs = [...new Set(spRows.map((r) => r.parableSlugRu))];
  const res = await prod.query<{ id: string; slugRu: string }>(
    'SELECT id, "slugRu" FROM "Parable" WHERE "slugRu" = ANY($1)',
    [slugs],
  );
  const prodIdBySlug = new Map(res.rows.map((r) => [r.slugRu, r.id]));
  const missing = slugs.filter((s) => !prodIdBySlug.has(s));
  if (missing.length > 0) {
    console.error('The following parables are referenced by these situations but missing in prod:');
    for (const s of missing) console.error(`  ${s}`);
    console.error('Run sync-parables-to-prod.ts for them first, then retry.');
    process.exit(1);
  }
  return prodIdBySlug;
}

async function partitionByProdExistence(
  prod: Client,
  situations: SituationRow[],
): Promise<{ toSync: SituationRow[]; skippedExisting: SituationRow[] }> {
  const res = await prod.query<{ slugRu: string }>(
    'SELECT "slugRu" FROM "Situation" WHERE "slugRu" = ANY($1)',
    [situations.map((s) => s.slugRu)],
  );
  const alreadyInProd = new Set(res.rows.map((r) => r.slugRu));
  return {
    toSync: situations.filter((s) => !alreadyInProd.has(s.slugRu)),
    skippedExisting: situations.filter((s) => alreadyInProd.has(s.slugRu)),
  };
}

async function insertSituation(prod: Client, s: SituationRow): Promise<void> {
  await prod.query(
    `INSERT INTO "Situation" (
       id, "slugRu", "slugEn", "h1Ru", "h1En", "introRu", "introEn",
       "metaDescriptionRu", "metaDescriptionEn", "isPublished", "createdAt", "updatedAt"
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now(), now())`,
    [s.id, s.slugRu, s.slugEn, s.h1Ru, s.h1En, s.introRu, s.introEn, s.metaDescriptionRu, s.metaDescriptionEn, s.isPublished],
  );
}

async function insertSituationParables(
  prod: Client,
  spRows: SituationParableRow[],
  prodParableIdBySlug: Map<string, string>,
): Promise<void> {
  for (const row of spRows) {
    const prodParableId = prodParableIdBySlug.get(row.parableSlugRu);
    await prod.query(
      `INSERT INTO "SituationParable" (id, "situationId", "parableId", position, "noteRu", "noteEn")
       VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5)`,
      [row.situationId, prodParableId, row.position, row.noteRu, row.noteEn],
    );
  }
}

async function runSync(
  prod: Client,
  toSync: SituationRow[],
  spRows: SituationParableRow[],
  prodParableIdBySlug: Map<string, string>,
): Promise<void> {
  await prod.query('BEGIN');
  try {
    for (const s of toSync) await insertSituation(prod, s);
    await insertSituationParables(prod, spRows, prodParableIdBySlug);
    await prod.query('COMMIT');
    console.log(`COMMITTED. Synced: ${toSync.map((s) => s.slugRu).join(', ')}`);
  } catch (error) {
    await prod.query('ROLLBACK');
    console.error('ROLLED BACK due to error:', error);
    throw error;
  }
}

async function main(): Promise<void> {
  const { dryRun, slugs } = parseArgs();
  const prodUrl = requireProdUrl();

  const dev = new Client({ connectionString: DEV_URL });
  const prod = new Client({ connectionString: prodUrl, ssl: { rejectUnauthorized: false } });
  await dev.connect();
  await prod.connect();

  const situations = await fetchSituationsFromDev(dev, slugs);
  assertAllPublished(situations);

  const { toSync, skippedExisting } = await partitionByProdExistence(prod, situations);
  if (skippedExisting.length > 0) {
    console.log(`Already in prod, skipping (idempotent): ${skippedExisting.map((s) => s.slugRu).join(', ')}`);
  }
  if (toSync.length === 0) {
    console.log('Nothing new to sync.');
    await dev.end();
    await prod.end();
    return;
  }

  const spRows = await fetchSituationParablesFromDev(dev, toSync.map((s) => s.id));
  const prodParableIdBySlug = await assertAllParablesInProd(prod, spRows);

  console.log(`Syncing ${toSync.length} situation(s), ${spRows.length} SituationParable row(s).`);

  if (dryRun) {
    console.log('DRY RUN — no writes.');
    console.log('Situations:', toSync.map((s) => s.slugRu));
  } else {
    await runSync(prod, toSync, spRows, prodParableIdBySlug);
  }

  await dev.end();
  await prod.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
