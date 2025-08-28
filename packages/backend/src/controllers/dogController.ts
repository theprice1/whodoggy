// src/controllers/dogController.ts
import type { Request, Response } from 'express';
import * as dogService from '../services/dogService.js';

export const getDogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, registryId } = req.query;

    let dogs;

    if (search && typeof search === 'string') {
      dogs = await dogService.searchDogs(search);
    } else if (registryId && typeof registryId === 'string') {
      const parsedRegistryId = parseInt(registryId, 10);
      if (!isNaN(parsedRegistryId)) {
        dogs = await dogService.getDogsByRegistry(parsedRegistryId);
      } else {
        dogs = await dogService.getAllDogs();
      }
    } else {
      dogs = await dogService.getAllDogs();
    }

    res.json(dogs);
  } catch (error) {
    console.error('Error in getDogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Dog ID is required' });
      return;
    }

    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      res.status(400).json({ error: 'Invalid dog ID' });
      return;
    }

    const dog = await dogService.getDogById(parsedId);

    if (!dog) {
      res.status(404).json({ error: 'Dog not found' });
      return;
    }

    res.json(dog);
  } catch (error) {
    console.error('Error in getDogById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDogByMicrochipId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { microchipId } = req.params;

    if (!microchipId) {
      res.status(400).json({ error: 'Microchip ID is required' });
      return;
    }

    const dog = await dogService.getDogByMicrochipId(microchipId);

    if (!dog) {
      res.status(404).json({ error: 'Dog not found' });
      return;
    }

    res.json(dog);
  } catch (error) {
    console.error('Error in getDogByMicrochipId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      microchipId,
      name,
      breed,
      age,
      gender,
      ownerName,
      ownerEmail,
      ownerPhone,
      address,
      registryId
    } = req.body;

    // Validate required fields
    if (!microchipId || !name || age === undefined || !gender || !ownerName || !ownerEmail || !ownerPhone || !address || registryId === undefined) {
      res.status(400).json({
        error: 'Missing required fields: microchipId, name, age, gender, ownerName, ownerEmail, ownerPhone, address, registryId'
      });
      return;
    }

    // Parse and validate numeric fields
    const parsedAge = typeof age === 'string' ? parseInt(age, 10) : age;
    const parsedRegistryId = typeof registryId === 'string' ? parseInt(registryId, 10) : registryId;

    if (isNaN(parsedAge) || isNaN(parsedRegistryId)) {
      res.status(400).json({
        error: 'Age and registryId must be valid numbers'
      });
      return;
    }

    const dog = await dogService.createDog({
      microchipId,
      name,
      breed,
      age: parsedAge,
      gender,
      ownerName,
      ownerEmail,
      ownerPhone,
      address,
      registryId: parsedRegistryId
    });

    res.status(201).json(dog);
  } catch (error) {
    console.error('Error in createDog:', error);

    if (error instanceof Error) {
      if (error.message.includes('already exists') || error.message.includes('not found')) {
        res.status(400).json({ error: error.message });
        return;
      }
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Dog ID is required' });
      return;
    }

    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      res.status(400).json({ error: 'Invalid dog ID' });
      return;
    }

    // Convert string numbers to integers if present and valid
    const updateData: any = { ...req.body };
    if (updateData.age && typeof updateData.age === 'string') {
      const parsedAge = parseInt(updateData.age, 10);
      updateData.age = isNaN(parsedAge) ? updateData.age : parsedAge;
    }
    if (updateData.registryId && typeof updateData.registryId === 'string') {
      const parsedRegistryId = parseInt(updateData.registryId, 10);
      updateData.registryId = isNaN(parsedRegistryId) ? updateData.registryId : parsedRegistryId;
    }

    const dog = await dogService.updateDog(parsedId, updateData);

    if (!dog) {
      res.status(404).json({ error: 'Dog not found' });
      return;
    }

    res.json(dog);
  } catch (error) {
    console.error('Error in updateDog:', error);

    if (error instanceof Error) {
      if (error.message.includes('already exists') || error.message.includes('not found')) {
        res.status(400).json({ error: error.message });
        return;
      }
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Dog ID is required' });
      return;
    }

    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      res.status(400).json({ error: 'Invalid dog ID' });
      return;
    }

    const dog = await dogService.deleteDog(parsedId);

    if (!dog) {
      res.status(404).json({ error: 'Dog not found' });
      return;
    }

    res.json({ message: 'Dog deleted successfully', dog });
  } catch (error) {
    console.error('Error in deleteDog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
