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
  const ext = extname(filePath) || '.png';
  const blob = await put(`parables/${slugRu}${ext}`, fileBuffer, {
    access: 'public',
    addRandomSuffix: false,
    token: process.env['BLOB_READ_WRITE_TOKEN'],
  });

  await prisma.parable.update({
    where: { id: parable.id },
    data: { imageUrl: blob.url, imageAltRu: altRu, imageAltEn: altEn },
  });

  console.log(`✔ Uploaded and linked image for parable "${slugRu}"`);
  console.log(`  URL: ${blob.url}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
