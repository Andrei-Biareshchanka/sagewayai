import 'dotenv/config';
import { readFileSync } from 'fs';
import { Pool } from 'pg';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] ?? '' });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

function usage(): never {
  console.error(
    'Usage: npx tsx scripts/set-digest-image.ts <slug> <path-to-image-file> <altRu> <altEn>',
  );
  process.exit(1);
}

async function main() {
  const [slug, filePath, altRu, altEn] = process.argv.slice(2);
  if (!slug || !filePath || !altRu || !altEn) usage();

  const digest = await prisma.dailyDigest.findFirst({ where: { slug } });
  if (!digest) {
    console.error(`No digest found with slug: ${slug}`);
    process.exit(1);
  }

  const fileBuffer = readFileSync(filePath);
  const optimized = await sharp(fileBuffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  const blob = await put(`digests/${slug}.webp`, optimized, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'image/webp',
    token: process.env['BLOB_READ_WRITE_TOKEN'],
  });

  await prisma.dailyDigest.update({
    where: { id: digest.id },
    data: { imageUrl: blob.url, imageAltRu: altRu, imageAltEn: altEn },
  });

  console.log(`✔ Uploaded and linked image for "${slug}"`);
  console.log(`  URL: ${blob.url}`);
  console.log(`  Size: ${fileBuffer.length} bytes → ${optimized.length} bytes`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
