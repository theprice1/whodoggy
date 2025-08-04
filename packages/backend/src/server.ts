// packages/backend/src/server.ts

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import microchipRoutes from './routes/microchipRoutes.js'; // Use .js extension at runtime for ESM
import { shutdownDbPool } from './db.js'; // Make sure this exports a proper async shutdown function

dotenv.config();

const app = express();

// Security: Remove Express powered header
app.disable('x-powered-by');

// Middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check endpoint
app.get('/', (_req: Request, res: Response) => {
  res.send('WhoDoggy API is running 🚀');
});

// Mount microchip routes under /api/microchips
app.use('/api/microchips', microchipRoutes);

// Custom error interface with optional HTTP status code
interface ErrorWithStatus extends Error {
  status?: number;
}

// Centralized error handling middleware
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  void _next; // Avoid unused var warning

  const error = err instanceof Error ? err : new Error('Unknown error occurred');
  const typedError = error as ErrorWithStatus;

  console.error('Unexpected error:', typedError.message);

  const statusCode = typedError.status ?? 500;
  res.status(statusCode).json({ error: typedError.message || 'Internal Server Error' });
});

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown helper
async function shutdown() {
  try {
    console.log('Shutting down server...');

    if (typeof shutdownDbPool === 'function') {
      await shutdownDbPool();
      console.log('Database pool shut down');
    } else {
      console.warn('No shutdownDbPool function defined');
    }

    // Close HTTP server and exit process cleanly
    await new Promise<void>((resolve) => {
      server.close(() => {
        console.log('Server closed');
        resolve();
      });
    });

    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
}

// Handle OS termination signals for graceful shutdown
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Catch unhandled errors to avoid silent crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown();
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  shutdown();
});

export default app;
