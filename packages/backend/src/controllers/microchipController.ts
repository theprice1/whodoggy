// apps/backend/src/controllers/microchipController.ts
import { Request, Response } from 'express';
import { searchAllDatabases } from '../services/microchipService';

export const searchMicrochip = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const results = searchAllDatabases(id);

  if (results.length === 0) {
    return res.status(404).json({ message: 'Microchip ID not found' });
  }

  res.json({ results });
};
