// src/controllers/searchControllers.ts

import type { Request, Response } from "express";
import { prisma } from "../../prisma/prismaClient.js";

export const searchDogs = async (
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
			const parsedRegistryId = Number.parseInt(registryId, 10);
			if (!Number.isNaN(parsedRegistryId)) {
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

		const dogs = await prisma.dog.findMany({
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

// Additional search functions for WhoDoggy microchip registry

export const searchByMicrochip = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { microchipId } = req.params;

		if (!microchipId) {
			res.status(400).json({ error: "Microchip ID is required" });
			return;
		}

		// Search for dog with exact microchip match
		const dog = await prisma.dog.findFirst({
			where: {
				microchipId: microchipId,
			},
			include: {
				registry: true,
			},
		});

		if (!dog) {
			res.status(404).json({
				error: "No dog found with this microchip ID",
				microchipId,
			});
			return;
		}

		res.json({
			dog,
			microchipId,
			found: true,
		});
	} catch (error) {
		console.error("Error searching by microchip:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const searchAcrossRegistries = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { microchipId } = req.params;

		if (!microchipId) {
			res.status(400).json({ error: "Microchip ID is required" });
			return;
		}

		// Search across all registries - simulating the 22 NI databases
		const registryResults = await prisma.registry.findMany({
			include: {
				dogs: {
					where: {
						microchipId: microchipId,
					},
				},
			},
		});

		// Filter out registries with no matching dogs
		const foundRegistries = registryResults.filter(
			(registry) => registry.dogs.length > 0,
		);

		res.json({
			microchipId,
			totalRegistriesSearched: registryResults.length,
			registriesWithMatches: foundRegistries.length,
			results: foundRegistries.map((registry) => ({
				registry: {
					id: registry.id,
					name: registry.name,
					country: registry.country,
				},
				dogs: registry.dogs,
			})),
		});
	} catch (error) {
		console.error("Error searching across registries:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const searchByOwner = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { ownerEmail, ownerName, ownerPhone } = req.query;

		if (!ownerEmail && !ownerName && !ownerPhone) {
			res.status(400).json({
				error:
					"At least one owner parameter is required (email, name, or phone)",
			});
			return;
		}

		// Build dynamic where clause for owner search
		const where: any = {};
		const orConditions: any[] = [];

		if (ownerEmail && typeof ownerEmail === "string") {
			orConditions.push({
				ownerEmail: { contains: ownerEmail, mode: "insensitive" },
			});
		}

		if (ownerName && typeof ownerName === "string") {
			orConditions.push({
				ownerName: { contains: ownerName, mode: "insensitive" },
			});
		}

		if (ownerPhone && typeof ownerPhone === "string") {
			orConditions.push({ ownerPhone: { contains: ownerPhone } });
		}

		if (orConditions.length > 0) {
			where.OR = orConditions;
		}

		const dogs = await prisma.dog.findMany({
			where,
			include: {
				registry: true,
			},
			orderBy: {
				ownerName: "asc",
			},
		});

		// Group dogs by owner
		const ownerGroups: Record<string, any> = {};

		dogs.forEach((dog) => {
			const ownerKey = dog.ownerEmail;
			if (!ownerGroups[ownerKey]) {
				ownerGroups[ownerKey] = {
					ownerEmail: dog.ownerEmail,
					ownerName: dog.ownerName,
					ownerPhone: dog.ownerPhone,
					address: dog.address,
					dogs: [],
				};
			}
			ownerGroups[ownerKey].dogs.push(dog);
		});

		const owners = Object.values(ownerGroups);

		res.json({
			owners,
			totalOwners: owners.length,
			totalDogs: dogs.length,
			query: { ownerEmail, ownerName, ownerPhone },
		});
	} catch (error) {
		console.error("Error searching by owner:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
