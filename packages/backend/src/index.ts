import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { initializeFirebase } from './services/firebase';
import { authenticate } from './middleware/auth';
import { getMicrochipData } from './services/microchipService';

dotenv.config();

initializeFirebase();

const app = express();

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get(
  '/api/microchips/:id',
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const microchipId = req.params.id;
    const results = await getMicrochipData(microchipId);

    if (!results.length) {
      return res.status(404).json({ message: 'Microchip ID not found in any database' });
    }

    res.json({ results });
  }),
);

app.delete(
  '/api/microchips/:id',
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    // Implement deletion logic here if needed
    res.json({ message: 'Data deletion successful' });
  }),
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`WhoDoggy backend running on port ${port}`);
});
