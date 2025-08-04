import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../src/firebase/firebaseAdmin.js'; // Import from your firebaseAdmin.ts with extension

export interface AuthenticatedRequest extends Request {
  user?: adminAuth.DecodedIdToken;
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
