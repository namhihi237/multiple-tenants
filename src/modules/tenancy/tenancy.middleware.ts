import { NextFunction, Request, Response } from 'express';

const DEDICATED = 'x-dedicated';
const TENANT_NAME = 'x-tenant-name';
const SERVER_NAME = 'x-server-name';

export function tenancyMiddleware(req: Request & { tenantId: string }, _res: Response, next: NextFunction): void {
  const dedicated = req.headers[DEDICATED] as string;
  const tenantName = req.headers[TENANT_NAME] as string;
  const serverName = req.headers[SERVER_NAME] as string;

  req.dedicated = dedicated?.toString() || null;
  req.tenantName = tenantName?.toString() || null;
  req.serverName = serverName?.toString() || null;

  next();
}
