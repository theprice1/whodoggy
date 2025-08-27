import type { Request, Response, NextFunction } from "express";
import * as dogService from "../services/dogService.js";

// Get all dogs
export const getAllDogsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dogs = await dogService.getAllDogs();
    res.json(dogs);
  } catch (err) {
    next(err);
  }
};

// Get dog by ID
export const getDogByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Dog ID is required" });

    const dog = await dogService.getDogById(id);
    if (!dog) return res.status(404).json({ error: "Dog not found" });

    res.json(dog);
  } catch (err) {
    next(err);
  }
};

// Create dog
export const createDogHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, breed, age, ownerId } = req.body;
    const dog = await dogService.createDog({ name, breed, age, ownerId });
    res.status(201).json(dog);
  } catch (err) {
    next(err);
  }
};

// Update dog
export const updateDogHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Dog ID is required" });

    const dog = await dogService.updateDog(id, req.body);
    if (!dog) return res.status(404).json({ error: "Dog not found or could not update" });

    res.json(dog);
  } catch (err) {
    next(err);
  }
};

// Delete dog
export const deleteDogHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Dog ID is required" });

    const dog = await dogService.deleteDog(id);
    if (!dog) return res.status(404).json({ error: "Dog not found or could not delete" });

    res.json({ message: "Dog deleted successfully" });
  } catch (err) {
    next(err);
  }
};
