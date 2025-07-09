// src/index.ts

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import microchipRoutes from './routes/microchipRoutes';
import { shutdownDbPool } from './db';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Root route to check server health
app.get('/', (_req: Request, res: Response) => {
  res.send('WhoDoggy API is running 🚀');
});

// Register microchip-related routes under "/api/microchips"
app.use('/api/microchips', microchipRoutes);

// Basic error handler middleware (logs and sends error message)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unexpected error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const port = parseInt(process.env.PORT || '3000', 10);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown on process termination
async function shutdown() {
  console.log('Shutting down server...');
  await shutdownDbPool();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
