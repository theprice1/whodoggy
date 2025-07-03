import { Request, Response, NextFunction } from 'express';
import  admin  from '../services/firebase';

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const idToken = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase auth error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
