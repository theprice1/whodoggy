import { Request, Response, NextFunction } from 'express';

export function validateMicrochipId(req: Request, res: Response, next: NextFunction) {
  const { microchip_id } = req.params;
  const microchipRegex = /^[0-9A-Fa-f]{15,20}$/; // adjust pattern as needed

  if (!microchip_id || !microchipRegex.test(microchip_id)) {
    return res.status(400).json({ error: 'Invalid microchip ID format' });
  }
  next();
}
