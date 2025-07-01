import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

// Load environment variables from .env
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Simple health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Mock API route for microchip data (example)
app.get('/api/microchips/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  // Mock response — replace with real DB lookup later
  const mockData = {
    id,
    name: 'Fido',
    breed: 'Labrador',
    age: 5,
    owner: {
      name: 'Jane Doe',
      phone: '555-1234'
    }
  };

  res.json(mockData);
});

app.listen(port, () => {
  console.log(`WhoDoggy backend listening on port ${port}`);
});
