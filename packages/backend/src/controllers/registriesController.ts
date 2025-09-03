// src/controllers/registriesController.ts
import type { Request, Response } from "express";
import { getAllRegistriesService, getRegistry } from "..."; // ✅ Removed .js for ESM compatibility

export const _getAllRegistries = async (_req: Request, res: Response) => {
	const _registries = await getAllRegistriesService();
	res.json(registries);
};

export const _getRegistryById = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (typeof id !== "string") {
		return res.status(400).json({ error: "Registry ID is required" });
	}
	const _registry = await getRegistry(id);
	registry
		? res.json(registry)
		: res.status(404).json({ error: "Registry not found" });
};
