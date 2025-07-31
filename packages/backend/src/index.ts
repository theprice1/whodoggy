// src/index.ts

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import microchipRoutes from './routes/microchipRoutes.ts';
import { shutdownDbPool } from './db.js';

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

// Custom error type with optional status code
interface ErrorWithStatus extends Error {
  status?: number;
}

// Basic error handler middleware with proper typings
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  void _next; // Mark _next as used to avoid eslint no-unused-vars

  const error = err instanceof Error ? err : new Error('Unknown error');

  // Narrow to ErrorWithStatus to access status if present
  const typedError = error as ErrorWithStatus;

  console.error('Unexpected error:', typedError.message);

  const statusCode = typedError.status ?? 500;

  res
    .status(statusCode)
    .json({ error: typedError.message || 'Internal Server Error' });
});

const port = parseInt(process.env.PORT ?? '3000', 10);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown handler
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
