import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { prisma } from './lib/prisma';
import { errorHandler } from './middleware/errorHandler';
import { parablesRouter } from './routes/parables';
import { categoriesRouter } from './routes/categories';
import { authRouter } from './routes/auth';
import { meRouter } from './routes/me';
import { adminRouter } from './routes/admin';
import { subscribeRouter } from './routes/subscribe';

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

  app.get('/api/health', async (_req: Request, res: Response) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  });

  app.use('/api/parables', parablesRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/me', meRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/subscribe', subscribeRouter);

  app.use(errorHandler);

  return app;
}

const PORT = process.env.PORT ?? 3001;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
