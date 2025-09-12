// packages/backend/src/seedDogs.ts - Database seeding script for WhoDoggy

import fs from "node:fs";
import path from "node:path";
import type { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prismaClient.js";

// Get the current file path for resolving data files
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Type definition for the JSON dog data structure
interface DogSeedData {
	microchipId: string;
	dogName: string;
	breed: string;
	gender: string;
	dateOfBirth?: string;
	ownerName: string;
	ownerEmail: string;
	ownerPhone: string;
	ownerCity: string;
	registryName?: string;
	vaccinated?: boolean;
	notes?: string;
}

async function seedDogs(): Promise<void> {
	const filePath = path.join(__dirname, "dogs.json");

	// Check if the file exists
	if (!fs.existsSync(filePath)) {
		console.error(`❌ Dogs data file not found at: ${filePath}`);
		console.log(
			"💡 Generate mock data first by running: npm run generate-mock-data",
		);
		return;
	}

	const data = fs.readFileSync(filePath, "utf-8");
	const dogs: DogSeedData[] = JSON.parse(data);

	console.log(`🌱 Seeding ${dogs.length} dogs into WhoDoggy database...`);

	try {
		// First, ensure we have the Northern Ireland registries
		console.log("📋 Setting up Northern Ireland registries...");

		const registryNames = [
			"Petlog",
			"Animal Tracker",
			"Anibase",
			"SmartTag",
			"PetDetect",
			"PetProtect",
			"Euroident",
			"PetLink",
			"National Pet Register",
			"Pets at Home",
			"MicroDogID",
			"Pet Identity UK",
			"IdentiChip",
			"PetLog Northern Ireland",
			"Animal Care",
			"VetEnvoy",
			"PetTrace",
			"MicroTracker",
			"AnimalData",
			"PetLocator",
			"RegistryPlus",
			"ChipChecker",
		];

		// Create all 22 Northern Ireland registries
		const registries: Record<string, { id: number; name: string }> = {};

		for (let i = 0; i < registryNames.length; i++) {
			const registryName = registryNames[i];
			if (registryName) {
				const registry = await prisma.registry.upsert({
					where: { name: registryName },
					update: {},
					create: {
						name: registryName,
						country: "Northern Ireland",
						contact: `contact@${registryName.toLowerCase().replace(/\s+/g, "")}.co.uk`,
					},
				});
				registries[registryName] = registry;
			}
		}

		console.log(
			`✅ Created/verified ${Object.keys(registries).length} registries`,
		);

		// Seed dogs in batches for better performance
		const batchSize = 100;
		let processedCount = 0;

		await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
			for (let i = 0; i < dogs.length; i += batchSize) {
				const batch = dogs.slice(i, i + batchSize);

				for (const dog of batch) {
					// Calculate age from dateOfBirth
					let age = 5; // Default age
					if (dog.dateOfBirth) {
						try {
							const birthYear = new Date(dog.dateOfBirth).getFullYear();
							const currentYear = new Date().getFullYear();
							age = currentYear - birthYear;
							// Ensure age is reasonable (between 0 and 20)
							if (age < 0 || age > 20) {
								age = Math.floor(Math.random() * 12) + 1;
							}
						} catch {
							age = Math.floor(Math.random() * 12) + 1;
						}
					} else {
						age = Math.floor(Math.random() * 12) + 1;
					}

					// Find the appropriate registry with comprehensive null checking
					let registryId = 1; // Default fallback

					if (dog.registryName && typeof dog.registryName === "string") {
						const targetRegistry = registries[dog.registryName];
						if (targetRegistry && typeof targetRegistry.id === "number") {
							registryId = targetRegistry.id;
						} else {
							// Fallback to first available registry
							const firstRegistry = Object.values(registries)[0];
							if (firstRegistry && typeof firstRegistry.id === "number") {
								registryId = firstRegistry.id;
							}
						}
					} else {
						// Assign to random registry if not specified
						const registryValues = Object.values(registries);
						if (registryValues.length > 0) {
							const randomIndex = Math.floor(
								Math.random() * registryValues.length,
							);
							const randomRegistry = registryValues[randomIndex];
							if (randomRegistry && typeof randomRegistry.id === "number") {
								registryId = randomRegistry.id;
							}
						}
					}

					await tx.dog.upsert({
						where: { microchipId: dog.microchipId },
						update: {}, // Don't update existing records
						create: {
							microchipId: dog.microchipId,
							name: dog.dogName, // JSON uses 'dogName', schema expects 'name'
							breed: dog.breed || null,
							age: age,
							gender: dog.gender,
							ownerName: dog.ownerName,
							ownerEmail: dog.ownerEmail,
							ownerPhone: dog.ownerPhone,
							address: dog.ownerCity,
							registryId: registryId,
						},
					});

					processedCount++;
				}

				// Progress update
				console.log(
					`📊 Processed ${Math.min(i + batchSize, dogs.length)}/${dogs.length} dogs...`,
				);
			}
		});

		console.log(
			`✅ Seeding completed! Added ${processedCount} dogs to the database.`,
		);

		// Display summary statistics
		const totalDogs = await prisma.dog.count();
		const totalRegistries = await prisma.registry.count();
		const dogsByRegistry = await prisma.registry.findMany({
			include: {
				_count: {
					select: {
						dogs: true,
					},
				},
			},
		});

		console.log("\n📊 Database Summary:");
		console.log(`   Total Dogs: ${totalDogs}`);
		console.log(`   Total Registries: ${totalRegistries}`);
		console.log("\n📋 Dogs per Registry:");

		dogsByRegistry.forEach((registry) => {
			console.log(`   ${registry.name}: ${registry._count.dogs} dogs`);
		});
	} catch (err) {
		console.error("❌ Error seeding dogs:", err);
		throw err;
	} finally {
		await prisma.$disconnect();
		console.log("🔌 Database connection closed");
	}
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
	console.log("\n🛑 Received SIGINT, closing database connection...");
	await prisma.$disconnect();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	console.log("\n🛑 Received SIGTERM, closing database connection...");
	await prisma.$disconnect();
	process.exit(0);
});

// Run the seeding function
seedDogs().catch((error) => {
	console.error("💥 Seeding failed:", error);
	process.exit(1);
});
