declare namespace Express {
  interface Request {
    tenantName?: string;
    dedicated?: string;
    serverName?: string;
  }
}
