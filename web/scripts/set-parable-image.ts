import { config } from 'dotenv';
import path from 'path';
import { readFileSync } from 'fs';
import { Pool } from 'pg';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

config({ path: path.resolve(__dirname, '../.env.local') });

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] ?? '' });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

function usage(): never {
  console.error(
    'Usage: npx tsx scripts/set-parable-image.ts <slugRu> <path-to-image-file> <altRu> <altEn>',
  );
  process.exit(1);
}

async function main() {
  const [slugRu, filePath, altRu, altEn] = process.argv.slice(2);
  if (!slugRu || !filePath || !altRu || !altEn) usage();

  const parable = await prisma.parable.findFirst({ where: { slugRu } });
  if (!parable) {
    console.error(`No parable found with slugRu: ${slugRu}`);
    process.exit(1);
  }

  const fileBuffer = readFileSync(filePath);
  const optimized = await sharp(fileBuffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  const blob = await put(`parables/${slugRu}.webp`, optimized, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'image/webp',
    token: process.env['BLOB_READ_WRITE_TOKEN'],
  });

  await prisma.parable.update({
    where: { id: parable.id },
    data: { imageUrl: blob.url, imageAltRu: altRu, imageAltEn: altEn },
  });

  console.log(`✔ Uploaded and linked image for parable "${slugRu}"`);
  console.log(`  URL: ${blob.url}`);
  console.log(`  Size: ${fileBuffer.length} bytes → ${optimized.length} bytes`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
