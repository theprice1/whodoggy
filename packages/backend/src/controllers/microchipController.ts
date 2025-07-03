import { Request, Response } from 'express';
import { mockDatabases, MicrochipRecord } from '../mock-dbs/mockDatabases';

export const getMicrochipById = (req: Request, res: Response) => {
  const { id } = req.params;

  // Search across all mock databases
  for (const dbName in mockDatabases) {
    const record = mockDatabases[dbName].find((rec) => rec.microchipId === id);
    if (record) {
      return res.json({ results: [record] });
    }
  }

  return res.status(404).json({ message: `Microchip ID ${id} not found` });
};
