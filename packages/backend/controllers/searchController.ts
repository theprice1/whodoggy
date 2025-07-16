import { Request, Response } from 'express';
import { getDogByMicrochip } from '../services/dogService';

export const searchDogByMicrochip = async (req: Request, res: Response) => {
  const { microchipId } = req.params;

  if (!microchipId || typeof microchipId !== 'string') {
    return res.status(400).json({ error: 'Microchip ID is required and must be a string' });
  }

  try {
    const dogDetails = await getDogByMicrochip(microchipId);

    if (!dogDetails) {
      return res.status(404).json({ message: 'Dog not found for the given microchip ID' });
    }

    return res.status(200).json(dogDetails);
  } catch (error) {
    console.error('Error in searchDogByMicrochip controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
