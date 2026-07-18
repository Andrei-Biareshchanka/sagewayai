#!/usr/bin/env node
'use strict';

// Copies server/prisma/schema.prisma (the canonical schema for the shared
// Postgres database) into web/prisma/schema.prisma and
// telegram-bot/prisma/schema.prisma, swapping only the `generator client { ... }`
// block for each package's own provider/output config. Run this after every
// edit to server/prisma/schema.prisma and commit the results together.
//
// Usage:
//   node scripts/sync-prisma-schema.js          # writes the synced copies
//   node scripts/sync-prisma-schema.js --check  # exits 1 if copies are stale, writes nothing
//
// See CLAUDE.md ("Prisma schema sync") and
// .claude/commands/schema-sync-check.md for why this exists — three
// independent, independently-deployed packages point at one physical
// database, and hand-copying schema.prisma between them has already caused
// two production incidents.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CANONICAL_PATH = path.join(ROOT, 'server/prisma/schema.prisma');

const GENERATOR_BLOCK_RE = /generator client \{[^}]*\}/;

const HEADER = [
  '// GENERATED FILE — do not edit directly.',
  '// Source of truth: server/prisma/schema.prisma',
  '// Regenerate with: node scripts/sync-prisma-schema.js',
  '',
  '',
].join('\n');

// BotEvent is telegram-bot-only and not yet part of the canonical schema in
// server/ — it was created via `prisma db push` from telegram-bot directly,
// with no migration history in server/. Appended here as an explicit,
// documented exception until it's formally adopted into server/'s migration
// history (tracked separately — this is a deliberate, not accidental, gap).
const BOT_EVENT_MODEL = [
  '',
  'model BotEvent {',
  '  id        Int      @id @default(autoincrement())',
  '  userId    BigInt',
  '  event     String',
  '  meta      Json?',
  '  createdAt DateTime @default(now())',
  '',
  '  @@index([userId])',
  '  @@index([event, createdAt])',
  '}',
  '',
].join('\n');

const TARGETS = {
  web: {
    path: path.join(ROOT, 'web/prisma/schema.prisma'),
    generatorBlock: 'generator client {\n  provider = "prisma-client"\n  output   = "../app/generated/prisma"\n}',
    append: '',
  },
  'telegram-bot': {
    path: path.join(ROOT, 'telegram-bot/prisma/schema.prisma'),
    generatorBlock: 'generator client {\n  provider = "prisma-client-js"\n  output   = "../node_modules/.prisma/client"\n}',
    append: BOT_EVENT_MODEL,
  },
};

function buildOutput(canonical, target) {
  if (!GENERATOR_BLOCK_RE.test(canonical)) {
    throw new Error(`Could not find "generator client { ... }" block in ${CANONICAL_PATH}`);
  }
  const body = canonical.replace(GENERATOR_BLOCK_RE, target.generatorBlock);
  return HEADER + body + target.append;
}

function main() {
  const checkOnly = process.argv.includes('--check');
  const canonical = fs.readFileSync(CANONICAL_PATH, 'utf8');

  let stale = [];

  for (const [name, target] of Object.entries(TARGETS)) {
    const expected = buildOutput(canonical, target);
    const current = fs.existsSync(target.path) ? fs.readFileSync(target.path, 'utf8') : null;

    if (checkOnly) {
      if (current !== expected) stale.push(name);
      continue;
    }

    if (current !== expected) {
      fs.writeFileSync(target.path, expected);
      console.log(`✔ synced ${name}: ${path.relative(ROOT, target.path)}`);
    } else {
      console.log(`  ${name} already up to date: ${path.relative(ROOT, target.path)}`);
    }
  }

  if (checkOnly) {
    if (stale.length > 0) {
      console.error(`✘ Out of sync with server/prisma/schema.prisma: ${stale.join(', ')}`);
      console.error('  Run: node scripts/sync-prisma-schema.js');
      process.exit(1);
    }
    console.log('✔ All schema copies are in sync with server/prisma/schema.prisma');
  }
}

main();
