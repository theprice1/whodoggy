import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(err.stack);
    return res.status(500).json({ error: err.message });
  }

  console.error('Unknown error', err);
  res.status(500).json({ error: 'Internal Server Error' });
};
