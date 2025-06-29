// types/express/index.d.ts or backend/types/express.d.ts

import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        // add other user properties if needed
      }
    }
  }
}
// Extend the Express Request interface to include a user object
// This allows us to attach user information to the request object after authentication middleware runs.