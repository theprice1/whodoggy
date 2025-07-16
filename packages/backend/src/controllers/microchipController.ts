// src/controllers/microchipController.ts

import { Request, Response } from 'express';

// Mock database of microchips
const mockMicrochips = [
  { id: '1', name: 'Dog A', breed: 'Labrador' },
  { id: '2', name: 'Dog B', breed: 'Beagle' },
];

// Controller for getting a microchip by ID
export const getMicrochipById = (req: Request, res: Response) => {
  const { id } = req.params; // Extract id from the route parameters
  const microchip = mockMicrochips.find((m) => m.id === id); // Search for the microchip by id

  if (!microchip) {
    return res.status(404).json({ message: 'Microchip not found' });
  }

  return res.json(microchip); // Return the microchip if found
};
