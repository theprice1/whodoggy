// deleteDataController.ts
import { Request, Response } from 'express';
import { deleteMicrochipById } from '../services/microchipService.js'; // ✅ Removed .js extension for NodeNext/ESM

export async function deleteMicrochipHandler(req: Request, res: Response) {
  const microchipId = req.params.id;

  if (!microchipId || microchipId.length !== 15) {
    return res.status(400).json({ error: 'Invalid microchip ID' });
  }

  try {
    const deleted = await deleteMicrochipById(microchipId);
    if (!deleted) {
      return res.status(404).json({ error: `Microchip ${microchipId} not found` });
    }
    return res.status(200).json({ message: `Deleted microchip ${microchipId}` });
  } catch (error) {
    console.error('Error deleting microchip:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
