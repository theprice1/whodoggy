import express, { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { getMicrochipData } from './services/microchipService';

dotenv.config();

const app = express();

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const idToken = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase auth error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/microchips/:id', authenticate, async (req: Request, res: Response) => {
  const microchipId = req.params.id;
  const results = await getMicrochipData(microchipId);

  if (results.length === 0) {
    return res.status(404).json({ message: 'Microchip ID not found in any database' });
  }

  res.json({ results });
});

app.delete('/api/microchips/:id', authenticate, async (req: Request, res: Response) => {
  // Optional deletion logic here
  res.json({ message: 'Data deletion successful' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
