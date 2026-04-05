import type { NextFunction, Request, Response } from 'express';

import { verifyAccessToken } from '../lib/auth';

const unauthorized = () => Object.assign(new Error('Unauthorized'), { status: 401 });

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw unauthorized();

  const token = header.slice(7);
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    throw unauthorized();
  }
}
