import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Skip auth completely for development purposes
  // Attach a mock user object to the request
  (req as any).user = {
    id: 'mock-user-id',
    email: 'dev@example.com',
    role: 'tester',
  };

  next();
};
// This middleware function is used to authenticate the user.
// In a production environment, you would typically check the user's authentication status here.  