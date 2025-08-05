import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../firebase/firebaseAdmin.js';
import type { auth } from 'firebase-admin';

export interface AuthenticatedRequest extends Request {
  user?: auth.DecodedIdToken; // Correct usage of type
}

export const verifyFirebaseToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No authorization token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken; // Attach Firebase user info to request
    next();
  } catch (error) {
    console.error('Firebase token verification failed:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
