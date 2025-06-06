import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Simple placeholder auth — replace with real logic
  // For example, check req.headers.authorization token etc.

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Mock user attached to req for demo purposes
  (req as any).user = { id: 'mock-user-id' };

  next();
};
// This middleware function checks for user authentication.
// It currently uses a simple placeholder logic that should be replaced with actual authentication logic.