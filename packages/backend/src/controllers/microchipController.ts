// src/controllers/microchipController.ts
import type { Request, Response } from "express";
import { prisma } from "...";

export const _getMicrochipById = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { microchipId } = req.params;

		if (!microchipId) {
			res.status(400).json({ error: "Microchip ID is required" });
			return;
		}

		const _dog = await prisma.dog.findUnique({
			where: {
				microchipId,
			},
			include: {
				registry: true,
			},
		});

		if (!dog) {
			res.status(404).json({ error: "Dog with this microchip ID not found" });
			return;
		}

		res.json(dog);
	} catch (error) {
		console.error("Error fetching dog by microchip ID:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
