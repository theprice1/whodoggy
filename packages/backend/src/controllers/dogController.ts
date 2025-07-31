// packages/backend/src/controllers/dogController.ts

import { Request, Response, NextFunction } from 'express';
import { queryAllRegistries } from '../services/registryService.js';

/**
 * GET /microchips/:id
 * Retrieves a dog record by microchip ID from all registries.
 */
export async function getMicrochipById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const microchipId = (req.params.id || '').trim();

  if (!microchipId) {
    return res.status(400).json({ error: 'Microchip ID is required' });
  }

  try {
    const dogRecord = await queryAllRegistries(microchipId);

    if (!dogRecord) {
      return res.status(404).json({
        error: `No record found for microchip ID: ${microchipId}`,
      });
    }

    return res.status(200).json(dogRecord);
  } catch (error) {
    console.error(`Error fetching record for ${microchipId}:`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
