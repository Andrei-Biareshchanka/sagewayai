import { config } from 'dotenv';
import path from 'path';
import { Pool } from 'pg';
import { put, del } from '@vercel/blob';
import sharp from 'sharp';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

config({ path: path.resolve(__dirname, '../.env.local') });

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] ?? '' });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;
const BLOB_TOKEN = process.env['BLOB_READ_WRITE_TOKEN'];
const DRY_RUN = process.argv.includes('--dry-run');

async function compressAndReupload(
  imageUrl: string,
  blobPath: string,
): Promise<{ newUrl: string; originalBytes: number; optimizedBytes: number } | null> {
  if (imageUrl.endsWith('.webp')) return null; // already migrated, skip

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download ${imageUrl}: ${response.status}`);
  }
  const originalBuffer = Buffer.from(await response.arrayBuffer());

  const optimized = await sharp(originalBuffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  if (DRY_RUN) {
    return { newUrl: `${blobPath}.webp (dry-run, not uploaded)`, originalBytes: originalBuffer.length, optimizedBytes: optimized.length };
  }

  const blob = await put(`${blobPath}.webp`, optimized, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'image/webp',
    token: BLOB_TOKEN,
  });

  await del(imageUrl, { token: BLOB_TOKEN });

  return { newUrl: blob.url, originalBytes: originalBuffer.length, optimizedBytes: optimized.length };
}

const totals = { originalBytes: 0, optimizedBytes: 0, processed: 0, skipped: 0, failed: 0 };

async function backfillParables() {
  const parables = await prisma.parable.findMany({
    where: { imageUrl: { not: null } },
    select: { id: true, slugRu: true, imageUrl: true },
  });

  console.log(`\nParables with images: ${parables.length}`);

  for (const parable of parables) {
    const imageUrl = parable.imageUrl;
    if (!imageUrl) continue;
    try {
      const result = await compressAndReupload(imageUrl, `parables/${parable.slugRu}`);
      if (!result) {
        console.log(`  skip (already .webp): ${parable.slugRu}`);
        totals.skipped++;
        continue;
      }
      if (!DRY_RUN) {
        await prisma.parable.update({ where: { id: parable.id }, data: { imageUrl: result.newUrl } });
      }
      totals.originalBytes += result.originalBytes;
      totals.optimizedBytes += result.optimizedBytes;
      totals.processed++;
      console.log(
        `  ${DRY_RUN ? '(dry-run) would update' : '✔'} ${parable.slugRu}: ${result.originalBytes} → ${result.optimizedBytes} bytes`,
      );
    } catch (e) {
      totals.failed++;
      console.error(`  ✗ ${parable.slugRu}:`, e);
    }
  }
}

async function backfillDigests() {
  const digests = await prisma.dailyDigest.findMany({
    where: { imageUrl: { not: null } },
    select: { id: true, slug: true, imageUrl: true },
  });

  console.log(`\nDigests with images: ${digests.length}`);

  for (const digest of digests) {
    const imageUrl = digest.imageUrl;
    if (!imageUrl) continue;
    const blobKey = digest.slug ?? digest.id;
    try {
      const result = await compressAndReupload(imageUrl, `digests/${blobKey}`);
      if (!result) {
        console.log(`  skip (already .webp): ${blobKey}`);
        totals.skipped++;
        continue;
      }
      if (!DRY_RUN) {
        await prisma.dailyDigest.update({ where: { id: digest.id }, data: { imageUrl: result.newUrl } });
      }
      totals.originalBytes += result.originalBytes;
      totals.optimizedBytes += result.optimizedBytes;
      totals.processed++;
      console.log(
        `  ${DRY_RUN ? '(dry-run) would update' : '✔'} ${blobKey}: ${result.originalBytes} → ${result.optimizedBytes} bytes`,
      );
    } catch (e) {
      totals.failed++;
      console.error(`  ✗ ${blobKey}:`, e);
    }
  }
}

async function main() {
  if (DRY_RUN) console.log('Running in --dry-run mode: no uploads, deletes, or DB writes.');

  await backfillParables();
  await backfillDigests();

  const savedBytes = totals.originalBytes - totals.optimizedBytes;
  const savedPct = totals.originalBytes > 0 ? ((savedBytes / totals.originalBytes) * 100).toFixed(1) : '0';
  console.log(
    `\nTotals: ${totals.processed} processed, ${totals.skipped} skipped, ${totals.failed} failed`,
  );
  console.log(
    `  ${totals.originalBytes} → ${totals.optimizedBytes} bytes (saved ${savedBytes} bytes, ${savedPct}%)`,
  );

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
