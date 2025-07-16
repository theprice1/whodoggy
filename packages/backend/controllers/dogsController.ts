import { Request, Response } from 'express';
import {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} from '../services/dogService';

export const getAllDogsHandler = async (_req: Request, res: Response) => {
  const dogs = await getAllDogs();
  res.json(dogs);
};

export const getDogByIdHandler = async (req: Request, res: Response) => {
  const dog = await getDogById(req.params.id);
  if (!dog) return res.status(404).json({ error: 'Dog not found' });
  res.json(dog);
};

export const createDogHandler = async (req: Request, res: Response) => {
  // Validate input here or via middleware
  const dog = await createDog(req.body);
  res.status(201).json(dog);
};

export const updateDogHandler = async (req: Request, res: Response) => {
  const updatedDog = await updateDog(req.params.id, req.body);
  if (!updatedDog)
    return res
      .status(404)
      .json({ error: 'Dog not found or no data to update' });
  res.json(updatedDog);
};

export const deleteDogHandler = async (req: Request, res: Response) => {
  const success = await deleteDog(req.params.id);
  if (!success) return res.status(404).json({ error: 'Dog not found' });
  res.status(204).send();
};
