// packages/backend/src/services/ownerService.ts
import { prisma } from "...";
import type { Owner } from "../types/types.js";

export const _getOwner = async (id: string): Promise<Owner | null> => {
	try {
		// Since there's no Owner model, we'll search for owners in Dog records
		const _dog = await prisma.dog.findFirst({
			where: {
				OR: [
					{ ownerEmail: id },
					{ ownerPhone: id },
					{ ownerName: { contains: id, mode: "insensitive" } },
				],
			},
			select: {
				ownerName: true,
				ownerEmail: true,
				ownerPhone: true,
			},
		});

		if (!dog) return null;

		// Transform to Owner interface
		return {
			id: dog.ownerEmail, // Use email as ID since no separate owner model
			name: dog.ownerName,
			email: dog.ownerEmail,
			phone: dog.ownerPhone,
		};
	} catch (err) {
		console.error("Error fetching owner by id:", err);
		throw err;
	}
};

export const _getAllOwnersService = async (): Promise<Owner[]> => {
	try {
		// Get unique owners from dogs table
		const _uniqueOwners = await prisma.dog.groupBy({
			by: ["ownerName", "ownerEmail", "ownerPhone"],
			_count: {
				ownerEmail: true,
			},
		});

		// Transform to Owner interface
		return uniqueOwners.map((owner) => ({
			id: owner.ownerEmail,
			name: owner.ownerName,
			email: owner.ownerEmail,
			phone: owner.ownerPhone,
		}));
	} catch (err) {
		console.error("Error fetching all owners:", err);
		throw err;
	}
};
