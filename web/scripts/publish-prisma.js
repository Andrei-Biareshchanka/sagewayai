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

copyRecursive(SRC, DEST);

const pkgPath = path.join(DEST, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
pkg.name = '@prisma/generated-client';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

console.log('✔ Prisma client published to node_modules/@prisma/generated-client');
