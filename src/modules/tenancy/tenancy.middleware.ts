import { NextFunction, Request, Response } from 'express';

const DEDICATED = 'x-tenant-id';

export function tenancyMiddleware(req: Request & { tenantId: string }, _res: Response, next: NextFunction): void {
  const tenantId = req.headers[DEDICATED] as string;

  req.tenantId = tenantId?.toString() || null;
  next();
}
