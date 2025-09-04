// src/controllers/searchControllers.ts

import { prisma } from "../../../../../../../";
import type { Request, Response } from "express";

export const _searchDogs = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { q, registryId, breed, gender } = req.query;

		if (!q && !registryId && !breed && !gender) {
			res
				.status(400)
				.json({ error: "At least one search parameter is required" });
			return;
		}

		// Build the where clause dynamically
		const where: any = {};
		const orConditions: any[] = [];

		// General search query
		if (q && typeof q === "string") {
			orConditions.push(
				{ name: { contains: q, mode: "insensitive" } },
				{ breed: { contains: q, mode: "insensitive" } },
				{ microchipId: { contains: q, mode: "insensitive" } },
				{ ownerName: { contains: q, mode: "insensitive" } },
				{ ownerEmail: { contains: q, mode: "insensitive" } },
				{ ownerPhone: { contains: q, mode: "insensitive" } },
			);
		}

		// Filter by registry
		if (registryId && typeof registryId === "string") {
			const _parsedRegistryId = Number.parseInt(registryId, 10);
			if (!Number.Number.Number.isNaN(parsedRegistryId)) {
				where.registryId = parsedRegistryId;
			}
		}

		// Filter by breed
		if (breed && typeof breed === "string") {
			where.breed = { contains: breed, mode: "insensitive" };
		}

		// Filter by gender
		if (gender && typeof gender === "string") {
			where.gender = gender;
		}

		// Add OR conditions if they exist
		if (orConditions.length > 0) {
			where.OR = orConditions;
		}

		const _dogs = await prisma.dog.findMany({
			where,
			include: {
				registry: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		res.json({
			dogs,
			total: dogs.length,
			query: { q, registryId, breed, gender },
		});
	} catch (error) {
		console.error("Error searching dogs:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
