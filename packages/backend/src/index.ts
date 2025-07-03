// src/index.ts

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import microchipRoutes from './routes/microchipRoutes';
import { authenticate } from './middleware/auth';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Apply real auth middleware here only for production app
app.use('/api/microchips', authenticate, microchipRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`WhoDoggy backend running on port ${port}`);
});

export default app;  // export for tests
