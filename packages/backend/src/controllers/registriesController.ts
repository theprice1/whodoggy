// src/controllers/registriesController.ts

import type { Request, Response } from "express";
import {
	getAllRegistriesService,
	getRegistry,
} from "../services/registryService.js";

export const _getAllRegistries = async (_req: Request, res: Response) => {
	const _registries = await getAllRegistriesService();
	res.json(_registries);
};

export const _getRegistryById = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (typeof id !== "string") {
		return res.status(400).json({ error: "Registry ID is required" });
	}
	const _registry = await getRegistry(id);
	_registry
		? res.json(_registry)
		: res.status(404).json({ error: "Registry not found" });
};
