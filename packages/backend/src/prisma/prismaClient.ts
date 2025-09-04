import { PrismaClient } from "../../../../../../../";

declare global {
	// Prevent multiple instances of Prisma Client in development
	var __prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
	global.__prisma ||
	new PrismaClient({
		log: ["query", "info", "warn", "error"], // optional for debugging
	});

if (process.env.NODE_ENV !== "production") {
	global.__prisma = prisma;
}
