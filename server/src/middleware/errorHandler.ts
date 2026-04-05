import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const message = err instanceof Error ? err.message : 'Internal server error';
  const status = resolveStatus(err);

  res.status(status).json({ error: message });
}

function resolveStatus(err: unknown): number {
  if (err instanceof Error && 'status' in err) {
    const status = (err as Error & { status: unknown }).status;
    if (typeof status === 'number') return status;
  }
  return 500;
}
