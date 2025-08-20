import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import microchipRoutes from './routes/microchipRoutes.js'; // ESM runtime
import { shutdownPool } from './db.js'; // ESM runtime

const app: express.Application = express();

// Remove Express powered header for security
app.disable('x-powered-by');

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check
app.get('/', (_req: Request, res: Response) => {
  res.send('WhoDoggy API is running 🚀');
});

// Mount routes
app.use('/api/microchips', microchipRoutes);

// Error interface
interface ErrorWithStatus extends Error {
  status?: number;
}

// Centralized error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  void _next;

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

// Graceful shutdown
async function shutdown() {
  try {
    console.log('Shutting down server...');
    if (typeof shutdownPool === 'function') {
      await shutdownPool();
      console.log('Database pool shut down');
    }

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

// OS signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Catch unhandled errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown();
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  shutdown();
});

export default app;
