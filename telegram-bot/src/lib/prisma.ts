import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

function buildConnectionString(): string {
  const url = process.env['DATABASE_URL'] ?? '';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}connect_timeout=15`;
}

const pool = new Pool({
  connectionString:        buildConnectionString(),
  connectionTimeoutMillis: 15_000,
  statement_timeout:       30_000,
  idleTimeoutMillis:       60_000,
  max:                     3,
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
