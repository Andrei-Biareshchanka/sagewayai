import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString:        process.env['DATABASE_URL'],
  connectionTimeoutMillis: 10_000,
  statement_timeout:       30_000,
  idleTimeoutMillis:       30_000,
  max:                     5,
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
