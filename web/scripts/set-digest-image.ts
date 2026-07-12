import 'dotenv/config';
import { readFileSync } from 'fs';
import { extname } from 'path';
import { Pool } from 'pg';
import { put } from '@vercel/blob';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env['DATABASE_URL'] ?? '' });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

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
  const ext = extname(filePath) || '.jpg';
  const blob = await put(`digests/${slug}${ext}`, fileBuffer, {
    access: 'public',
    addRandomSuffix: false,
    token: process.env['BLOB_READ_WRITE_TOKEN'],
  });

  await prisma.dailyDigest.update({
    where: { id: digest.id },
    data: { imageUrl: blob.url, imageAltRu: altRu, imageAltEn: altEn },
  });

  console.log(`✔ Uploaded and linked image for "${slug}"`);
  console.log(`  URL: ${blob.url}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
