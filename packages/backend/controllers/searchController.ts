import { Request, Response } from 'express';
import { findDogByMicrochip } from '../services/dogService';

export const searchMicrochip = async (req: Request, res: Response) => {
  const { microchip_id } = req.body;
  if (!microchip_id || typeof microchip_id !== 'string') {
    return res.status(400).json({ error: 'Invalid microchip_id' });
  }
  try {
    const dog = await findDogByMicrochip(microchip_id);
    if (!dog) return res.status(404).json({ error: 'Dog not found' });
    res.json(dog);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
