import { Request, Response, NextFunction } from 'express';

export const validateMicrochipId = (req: Request, res: Response, next: NextFunction) => {
  const { microchipId } = req.body;
  if (!microchipId || typeof microchipId !== 'string' || microchipId.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing microchipId in request body' });
  }
  next();
};
