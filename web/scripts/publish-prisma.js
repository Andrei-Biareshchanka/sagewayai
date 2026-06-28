// Copies the compiled Prisma 7 generated client from app/generated/prisma
// into node_modules/@prisma/generated-client so Next.js can externalize it
// via serverExternalPackages (webpack skips bundling, Node.js handles #imports natively).
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '../app/generated/prisma');
const DEST = path.resolve(__dirname, '../node_modules/@prisma/generated-client');

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(SRC)) {
  console.error(`ERROR: Prisma generated client not found at ${SRC}`);
  console.error('Run "prisma generate" first.');
  process.exit(1);
}

copyRecursive(SRC, DEST);

// Read package.json from SRC (not DEST) — Prisma may or may not generate one on Linux.
// Always write a valid package.json to DEST with the stable package name.
const srcPkgPath = path.join(SRC, 'package.json');
const destPkgPath = path.join(DEST, 'package.json');

const pkg = fs.existsSync(srcPkgPath)
  ? JSON.parse(fs.readFileSync(srcPkgPath, 'utf-8'))
  : { main: 'index.js', types: 'index.d.ts' };

pkg.name = '@prisma/generated-client';

fs.writeFileSync(destPkgPath, JSON.stringify(pkg, null, 2));

console.log('✔ Prisma client published to node_modules/@prisma/generated-client');
