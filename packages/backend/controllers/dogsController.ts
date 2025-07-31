import { Request, Response } from 'express';
import {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} from '../services/dogService.js';

export const getAllDogsHandler = async (_req: Request, res: Response) => {
  try {
    const dogs = await getAllDogs();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve dogs' });
  }
};

export const getDogByIdHandler = async (req: Request, res: Response) => {
  try {
    const dog = await getDogById(req.params.id);
    if (!dog) return res.status(404).json({ error: 'Dog not found' });
    res.json(dog);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dog' });
  }
};

export const createDogHandler = async (req: Request, res: Response) => {
  try {
    const dog = await createDog(req.body);
    res
      .status(201)
      .location(`/api/dogs/${dog.id}`)
      .json(dog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create dog' });
  }
};

export const updateDogHandler = async (req: Request, res: Response) => {
  try {
    const updatedDog = await updateDog(req.params.id, req.body);
    if (!updatedDog)
      return res
        .status(404)
        .json({ error: 'Dog not found or no data to update' });
    res.json(updatedDog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update dog' });
  }
};

export const deleteDogHandler = async (req: Request, res: Response) => {
  try {
    const success = await deleteDog(req.params.id);
    if (!success) return res.status(404).json({ error: 'Dog not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete dog' });
  }
};
