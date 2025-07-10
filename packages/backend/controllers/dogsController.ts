import { Request, Response } from 'express';
import {
  getDog,
  createNewDog,
  updateDogById,
  deleteDogById,
  getAllDogsService,
} from '../services/dogService';

type DogInput = {
  name: string;
  breed: string;
  microchip_id: string;
  owner_id: string;
  registry_id: string;
};

export const getAllDogs = async (_req: Request, res: Response) => {
  const dogs = await getAllDogsService();
  res.json(dogs);
};

export const getDogById = async (req: Request<{ id: string }>, res: Response) => {
  const dog = await getDog(req.params.id);
  dog ? res.json(dog) : res.status(404).json({ error: 'Dog not found' });
};

export const createDog = async (
  req: Request<Record<string, never>, unknown, DogInput>,
  res: Response
) => {
  const dog = await createNewDog(req.body);
  res.status(201).json(dog);
};

export const updateDog = async (
  req: Request<{ id: string }, unknown, Partial<DogInput>>,
  res: Response
) => {
  const updated = await updateDogById(req.params.id, req.body);
  res.json(updated);
};

export const deleteDog = async (req: Request<{ id: string }>, res: Response) => {
  await deleteDogById(req.params.id);
  res.status(204).send();
};
