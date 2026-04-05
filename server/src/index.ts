import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { prisma } from './lib/prisma';
import { errorHandler } from './middleware/errorHandler';
import { parablesRouter } from './routes/parables';
import { categoriesRouter } from './routes/categories';

dotenv.config();

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_URL ?? 'http://localhost:5173' }));
  app.use(express.json());

  app.get('/api/health', async (_req: Request, res: Response) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  });

  app.use('/api/parables', parablesRouter);
  app.use('/api/categories', categoriesRouter);

  app.use(errorHandler);

  return app;
}

const PORT = process.env.PORT ?? 3001;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
