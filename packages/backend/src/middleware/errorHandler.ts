import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

// Optional: Replace with actual logger (e.g. Sentry, Winston, etc.)
const logToExternalService = (err: Error, req: Request) => {
  // Example placeholder for Sentry, LogRocket, etc.
  // Sentry.captureException(err);
  // LogRocket.captureException(err, { extra: { url: req.originalUrl } });
};

const logToFile = (err: Error | unknown) => {
  const logPath = path.resolve(__dirname, '../../logs/error.log');
  const message = `[${new Date().toISOString()}] ${JSON.stringify(err, Object.getOwnPropertyNames(err))}\n`;

  fs.appendFileSync(logPath, message);
};

type HttpError = {
  status?: number;
  message: string;
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (err instanceof Error) {
    const status = (err as HttpError).status || 500;

    if (!isProd) {
      console.error(err.stack);
    }

    // Log externally or to file
    logToExternalService(err, req);
    logToFile(err);

    return res.status(status).json({
      error: isProd ? 'Internal Server Error' : err.message,
    });
  }

  // Handle unknown errors
  const fallbackMessage = 'Unexpected error';
  if (!isProd) {
    console.error('Unknown error', err);
  }

  logToFile(err);
  return res.status(500).json({ error: isProd ? 'Internal Server Error' : fallbackMessage });
};
