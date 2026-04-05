import type { NextFunction, Request, Response } from 'express';

export const requireRole =
  (role: string) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (req.user?.role !== role) {
      throw Object.assign(new Error('Forbidden'), { status: 403 });
    }
    next();
  };
