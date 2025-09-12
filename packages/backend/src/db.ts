// src/db.ts - Prisma database connection for WhoDoggy
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a global prisma instance to avoid multiple connections
declare global {
	var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client
export const prisma =
	globalThis.prisma ||
	new PrismaClient({
		log:
			process.env.NODE_ENV === "development"
				? ["query", "info", "warn", "error"]
				: ["error"],
	});

// In development, store the client on the global object to prevent hot-reload issues
if (process.env.NODE_ENV !== "production") {
	globalThis.prisma = prisma;
}

// Test the connection
export const testConnection = async (): Promise<void> => {
	try {
		await prisma.$connect();
		console.log("Database connected successfully via Prisma");

		// Test query to verify connection
		const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
		console.log("Connected to PostgreSQL database via Prisma");
	} catch (error) {
		console.error("Database connection failed:", error);
		throw error;
	}
};

// Graceful shutdown
export const closeConnection = async (): Promise<void> => {
	try {
		await prisma.$disconnect();
		console.log("Prisma connection closed");
	} catch (error) {
		console.error("Error closing Prisma connection:", error);
		throw error;
	}
};

// WhoDoggy specific database utilities
export const findDogByMicrochip = async (microchipId: string) => {
	try {
		const dog = await prisma.dog.findFirst({
			where: {
				microchipId: microchipId,
			},
			include: {
				registry: true,
			},
		});
		return dog;
	} catch (error) {
		console.error("Error finding dog by microchip:", error);
		throw error;
	}
};

export const getAllRegistries = async () => {
	try {
		const registries = await prisma.registry.findMany({
			include: {
				_count: {
					select: {
						dogs: true,
					},
				},
			},
		});
		return registries;
	} catch (error) {
		console.error("Error fetching registries:", error);
		throw error;
	}
};

export const searchDogsAcrossRegistries = async (searchTerm: string) => {
	try {
		const dogs = await prisma.dog.findMany({
			where: {
				OR: [
					{ name: { contains: searchTerm, mode: "insensitive" } },
					{ breed: { contains: searchTerm, mode: "insensitive" } },
					{ ownerName: { contains: searchTerm, mode: "insensitive" } },
					{ ownerEmail: { contains: searchTerm, mode: "insensitive" } },
					{ microchipId: { contains: searchTerm } },
				],
			},
			include: {
				registry: true,
			},
		});
		return dogs;
	} catch (error) {
		console.error("Error searching dogs:", error);
		throw error;
	}
};

// Handle process termination
process.on("SIGINT", async () => {
	console.log("Received SIGINT, closing Prisma connection...");
	await closeConnection();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	console.log("Received SIGTERM, closing Prisma connection...");
	await closeConnection();
	process.exit(0);
});

// Export the prisma client as default for convenience
export default prisma;
