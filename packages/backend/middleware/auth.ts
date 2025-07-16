// packages/backend/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'No auth token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Invalid auth token' });

  // TODO: verify token here (e.g., JWT verification)
  // For now, accept any token for demonstration
  // If verified:
  next();
}
