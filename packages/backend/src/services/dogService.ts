// src/services/dogService.ts

import type { Dog, Registry } from "@prisma/client";
import { prisma } from "../../prisma/prismaClient.js";

// Types for creating and updating dogs
export interface CreateDogData {
	microchipId: string;
	name: string;
	breed?: string;
	age: number;
	gender: string;
	ownerName: string;
	ownerEmail: string;
	ownerPhone: string;
	address: string;
	registryId: number;
}

export interface UpdateDogData {
	microchipId?: string;
	name?: string;
	breed?: string;
	age?: number;
	gender?: string;
	ownerName?: string;
	ownerEmail?: string;
	ownerPhone?: string;
	address?: string;
	registryId?: number;
}

// Type for Dog with Registry relation
export type DogWithRegistry = Dog & {
	registry: Registry;
};

export const _getAllDogs = async (): Promise<DogWithRegistry[]> => {
	try {
		const _dogs = await prisma.dog.findMany({
			include: {
				registry: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return _dogs;
	} catch (error) {
		console.error("Error fetching all dogs:", error);
		throw new Error("Failed to fetch dogs");
	}
};

export const _getDogById = async (
	id: number,
): Promise<DogWithRegistry | null> => {
	try {
		const _dog = await prisma.dog.findUnique({
			where: {
				id,
			},
			include: {
				registry: true,
			},
		});
		return _dog;
	} catch (error) {
		console.error("Error fetching dog by ID:", error);
		throw new Error("Failed to fetch dog");
	}
};

export const _getDogByMicrochipId = async (
	microchipId: string,
): Promise<DogWithRegistry | null> => {
	try {
		const _dog = await prisma.dog.findUnique({
			where: {
				microchipId,
			},
			include: {
				registry: true,
			},
		});
		return _dog;
	} catch (error) {
		console.error("Error fetching dog by microchip ID:", error);
		throw new Error("Failed to fetch dog");
	}
};

export const _createDog = async (
	dogData: CreateDogData,
): Promise<DogWithRegistry> => {
	try {
		// First validate that the registry exists
		const _registryExists = await prisma.registry.findUnique({
			where: { id: dogData.registryId },
		});

		if (!_registryExists) {
			throw new Error(`Registry with ID ${dogData.registryId} not found`);
		}

		const _newDog = await prisma.dog.create({
			data: dogData,
			include: {
				registry: true,
			},
		});

		return _newDog;
	} catch (error) {
		console.error("Error creating dog:", error);
		if (error instanceof Error) {
			// Handle unique constraint violations
			if (error.message.includes("Unique constraint")) {
				throw new Error(
					`A dog with microchip ID ${dogData.microchipId} already exists`,
				);
			}
			throw error;
		}
		throw new Error("Failed to create dog");
	}
};

export const _updateDog = async (
	id: number,
	updateData: UpdateDogData,
): Promise<DogWithRegistry | null> => {
	try {
		// First check if dog exists
		const _existingDog = await prisma.dog.findUnique({
			where: { id },
		});

		if (!_existingDog) {
			return null;
		}

		// If updating registryId, validate that the registry exists
		if (updateData.registryId) {
			const _registryExists = await prisma.registry.findUnique({
				where: { id: updateData.registryId },
			});

			if (!_registryExists) {
				throw new Error(`Registry with ID ${updateData.registryId} not found`);
			}
		}

		const _updatedDog = await prisma.dog.update({
			where: { id },
			data: updateData,
			include: {
				registry: true,
			},
		});

		return _updatedDog;
	} catch (error) {
		console.error("Error updating dog:", error);
		if (error instanceof Error) {
			// Handle unique constraint violations
			if (error.message.includes("Unique constraint")) {
				throw new Error(
					`A dog with microchip ID ${updateData.microchipId} already exists`,
				);
			}
			throw error;
		}
		throw new Error("Failed to update dog");
	}
};

export const _deleteDog = async (
	id: number,
): Promise<DogWithRegistry | null> => {
	try {
		const _deletedDog = await prisma.dog.delete({
			where: { id },
			include: {
				registry: true,
			},
		});

		return _deletedDog;
	} catch (error) {
		console.error("Error deleting dog:", error);
		if (
			error instanceof Error &&
			error.message.includes("Record to delete does not exist")
		) {
			return null;
		}
		throw new Error("Failed to delete dog");
	}
};

// Additional utility functions for your dog registry system

export const _searchDogs = async (
	searchTerm: string,
): Promise<DogWithRegistry[]> => {
	try {
		const _dogs = await prisma.dog.findMany({
			where: {
				OR: [
					{ name: { contains: searchTerm, mode: "insensitive" } },
					{ breed: { contains: searchTerm, mode: "insensitive" } },
					{ microchipId: { contains: searchTerm, mode: "insensitive" } },
					{ ownerName: { contains: searchTerm, mode: "insensitive" } },
					{ ownerEmail: { contains: searchTerm, mode: "insensitive" } },
				],
			},
			include: {
				registry: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return _dogs;
	} catch (error) {
		console.error("Error searching dogs:", error);
		throw new Error("Failed to search dogs");
	}
};

export const _getDogsByRegistry = async (
	registryId: number,
): Promise<DogWithRegistry[]> => {
	try {
		const _dogs = await prisma.dog.findMany({
			where: {
				registryId,
			},
			include: {
				registry: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return _dogs;
	} catch (error) {
		console.error("Error fetching dogs by registry:", error);
		throw new Error("Failed to fetch dogs by registry");
	}
};
