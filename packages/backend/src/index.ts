import express, { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// Your Firebase admin initialization here...

const app = express();

// Middleware to authenticate Firebase ID token
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const idToken = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).user = decodedToken; // attach user info to req object
    next();
  } catch (error) {
    console.error('Firebase auth error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Example data service function - replace with real logic
async function getMicrochipData(id: string) {
  // Your lookup code here (mock DB or Firestore)
  return {
    id,
    name: 'Fido',
    breed: 'Labrador',
    owner: { name: 'Jane Doe', phone: '555-1234' },
    lastSeen: '2025-06-30',
  };
}

// Protected route using authenticate middleware
app.get('/api/microchips/:id', authenticate, async (req: Request, res: Response) => {
  const microchipId = req.params.id;
  const data = await getMicrochipData(microchipId);
  res.json(data);
});
