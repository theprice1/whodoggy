// src/controllers/dogController.ts
import type { Request, Response } from "express";
import * as dogService from "../services/dogService.js";

export const _getDogs = async (req: Request, res: Response): Promise<void> => {
	try {
		const { search, registryId } = req.query;

		let dogs;

		if (search && typeof search === "string") {
			dogs = await dogService._searchDogs(search);
		} else if (registryId && typeof registryId === "string") {
			const _parsedRegistryId = Number.parseInt(registryId, 10);
			if (!Number.isNaN(_parsedRegistryId)) {
				dogs = await dogService._getDogsByRegistry(_parsedRegistryId);
			} else {
				dogs = await dogService._getAllDogs();
			}
		} else {
			dogs = await dogService._getAllDogs();
		}

		res.json(dogs);
	} catch (error) {
		console.error("Error in getDogs:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const _getDogById = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "Dog ID is required" });
			return;
		}

		const _parsedId = Number.parseInt(id, 10);

		if (Number.isNaN(_parsedId)) {
			res.status(400).json({ error: "Invalid dog ID" });
			return;
		}

		const _dog = await dogService._getDogById(_parsedId);

		if (!_dog) {
			res.status(404).json({ error: "Dog not found" });
			return;
		}

		res.json(_dog);
	} catch (error) {
		console.error("Error in getDogById:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const _getDogByMicrochipId = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { microchipId } = req.params;

		if (!microchipId) {
			res.status(400).json({ error: "Microchip ID is required" });
			return;
		}

		const _dog = await dogService._getDogByMicrochipId(microchipId);

		if (!_dog) {
			res.status(404).json({ error: "Dog not found" });
			return;
		}

		res.json(_dog);
	} catch (error) {
		console.error("Error in getDogByMicrochipId:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const _createDog = async (
	req: Request,
	res: Response,
): Promise<void> => {
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
			registryId,
		} = req.body;

		// Validate required fields
		if (
			!microchipId ||
			!name ||
			age === undefined ||
			!gender ||
			!ownerName ||
			!ownerEmail ||
			!ownerPhone ||
			!address ||
			registryId === undefined
		) {
			res.status(400).json({
				error:
					"Missing required fields: microchipId, name, age, gender, ownerName, ownerEmail, ownerPhone, address, registryId",
			});
			return;
		}

		// Parse and validate numeric fields
		const _parsedAge = typeof age === "string" ? Number.parseInt(age, 10) : age;
		const _parsedRegistryId =
			typeof registryId === "string"
				? Number.parseInt(registryId, 10)
				: registryId;

		if (Number.isNaN(_parsedAge) || Number.isNaN(_parsedRegistryId)) {
			res.status(400).json({
				error: "Age and registryId must be valid numbers",
			});
			return;
		}

		const _dog = await dogService._createDog({
			microchipId,
			name,
			breed,
			age: _parsedAge,
			gender,
			ownerName,
			ownerEmail,
			ownerPhone,
			address,
			registryId: _parsedRegistryId,
		});

		res.status(201).json(_dog);
	} catch (error) {
		console.error("Error in createDog:", error);

		if (error instanceof Error) {
			if (
				error.message.includes("already exists") ||
				error.message.includes("not found")
			) {
				res.status(400).json({ error: error.message });
				return;
			}
		}

		res.status(500).json({ error: "Internal server error" });
	}
};

export const _updateDog = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "Dog ID is required" });
			return;
		}

		const _parsedId = Number.parseInt(id, 10);

		if (Number.isNaN(_parsedId)) {
			res.status(400).json({ error: "Invalid dog ID" });
			return;
		}

		// Convert string numbers to integers if present and valid
		const updateData: any = { ...req.body };
		if (updateData.age && typeof updateData.age === "string") {
			const _parsedAge = Number.parseInt(updateData.age, 10);
			updateData.age = Number.isNaN(_parsedAge) ? updateData.age : _parsedAge;
		}
		if (updateData.registryId && typeof updateData.registryId === "string") {
			const _parsedRegistryId = Number.parseInt(updateData.registryId, 10);
			updateData.registryId = Number.isNaN(_parsedRegistryId)
				? updateData.registryId
				: _parsedRegistryId;
		}

		const _dog = await dogService._updateDog(_parsedId, updateData);

		if (!_dog) {
			res.status(404).json({ error: "Dog not found" });
			return;
		}

		res.json(_dog);
	} catch (error) {
		console.error("Error in updateDog:", error);

		if (error instanceof Error) {
			if (
				error.message.includes("already exists") ||
				error.message.includes("not found")
			) {
				res.status(400).json({ error: error.message });
				return;
			}
		}

		res.status(500).json({ error: "Internal server error" });
	}
};

export const _deleteDog = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "Dog ID is required" });
			return;
		}

		const _parsedId = Number.parseInt(id, 10);

		if (Number.isNaN(_parsedId)) {
			res.status(400).json({ error: "Invalid dog ID" });
			return;
		}

		const _dog = await dogService._deleteDog(_parsedId);

		if (!_dog) {
			res.status(404).json({ error: "Dog not found" });
			return;
		}

		res.json({ message: "Dog deleted successfully", dog: _dog });
	} catch (error) {
		console.error("Error in deleteDog:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
