// Copies the Prisma 7 generated client from app/generated/prisma to
// node_modules/@prisma/generated-client so the webpack externals function
// can emit require('@prisma/generated-client') — a package name, not an
// absolute path — which survives Vercel's serverless function deployment.
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

// Write a minimal package.json — no complex exports/imports fields that
// confuse webpack. Node.js only needs main to require() the package.
fs.writeFileSync(
  path.join(DEST, 'package.json'),
  JSON.stringify({ name: '@prisma/generated-client', main: 'index.js', types: 'index.d.ts' }, null, 2),
);

console.log('✔ Prisma client published to node_modules/@prisma/generated-client');
