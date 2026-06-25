import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { Pool, Client } from 'pg';

import { prisma } from './lib/prisma';
import { errorHandler } from './middleware/errorHandler';
import { parablesRouter } from './routes/parables';
import { categoriesRouter } from './routes/categories';
import { authRouter } from './routes/auth';
import { meRouter } from './routes/me';
import { adminRouter } from './routes/admin';
import { subscribeRouter } from './routes/subscribe';
import { digestRouter } from './routes/digest';

dotenv.config();

export function createApp() {
  const app = express();

  const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173';
  app.use(cors({ origin: clientUrl, credentials: true }));
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin === clientUrl) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    next();
  });
  app.use(express.json());
  app.use(cookieParser());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/health/db', async (_req: Request, res: Response) => {
    const start = Date.now();
    const dbUrl = process.env['DATABASE_URL'] ?? '';
    const sep = dbUrl.includes('?') ? '&' : '?';
    const client = new Client({
      connectionString:        `${dbUrl}${sep}connect_timeout=10`,
      connectionTimeoutMillis: 15_000,
    });
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        client.connect(),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => reject(new Error('DB connect timeout after 12s')), 12_000);
        }),
      ]);
      clearTimeout(timeout);
      await client.query('SELECT 1');
      console.log(`[health/db] ok in ${Date.now() - start}ms`);
      res.json({ status: 'ok' });
    } catch (err) {
      clearTimeout(timeout);
      console.error(`[health/db] error after ${Date.now() - start}ms:`, err instanceof Error ? err.message : err);
      res.status(503).json({ status: 'db_unavailable', error: err instanceof Error ? err.message : 'unknown' });
    } finally {
      await client.end().catch(() => {});
    }
  });

  app.use('/api/parables', parablesRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/me', meRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/subscribe', subscribeRouter);
  app.use('/api/digest', digestRouter);

  app.use(errorHandler);

  return app;
}

const PORT = process.env.PORT ?? 3001;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
