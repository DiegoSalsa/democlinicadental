import { Request, Response, NextFunction } from 'express';

// Simple token-based auth for demo
const ADMIN_TOKEN = 'dental-admin-token-2026';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (token !== ADMIN_TOKEN) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  next();
};

export { ADMIN_TOKEN };
