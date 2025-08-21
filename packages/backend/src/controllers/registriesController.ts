// src/controllers/registriesController.ts
import type { Request, Response } from "express";
import { getAllRegistriesService, getRegistry } from "../services/registryService.js"; // ✅ Removed .js for ESM compatibility

export const getAllRegistries = async (_req: Request, res: Response) => {
  const registries = await getAllRegistriesService();
  res.json(registries);
};

export const getRegistryById = async (req: Request, res: Response) => {
  const registry = await getRegistry(req.params.id);
  registry ? res.json(registry) : res.status(404).json({ error: "Registry not found" });
};
