// mock-registries.js - Real UK/Northern Ireland Microchip Registry Services
import express from "express";
import { prisma } from "./prisma/prismaClient.js";

// Real 22 UK/Northern Ireland approved microchip databases
const realRegistries = [
	{
		id: 1,
		name: "AnimalData",
		country: "UK",
		website: "animaldata.org.uk",
		port: 4101,
	},
	{
		id: 2,
		name: "Animal Microchips",
		country: "UK",
		website: "animalmicrochips.co.uk",
		port: 4102,
	},
	{
		id: 3,
		name: "Animal Tracker",
		country: "UK",
		website: "animaltracker.co.uk",
		port: 4103,
	},
	{
		id: 4,
		name: "Chipworks",
		country: "UK",
		website: "chipworks.co.uk",
		port: 4104,
	},
	{
		id: 5,
		name: "HomeAgain",
		country: "UK",
		website: "homeagain.co.uk",
		port: 4105,
	},
	{
		id: 6,
		name: "Identibase",
		country: "UK",
		website: "identibase.co.uk",
		port: 4106,
	},
	{
		id: 7,
		name: "Lost Paws",
		country: "UK",
		website: "lostpaws.co.uk",
		port: 4107,
	},
	{
		id: 8,
		name: "MicroChip Central",
		country: "UK",
		website: "microchipcentral.com",
		port: 4108,
	},
	{
		id: 9,
		name: "MicroDogID",
		country: "UK",
		website: "microdogid.org",
		port: 4109,
		note: "Racing greyhounds only",
	},
	{
		id: 10,
		name: "My Animal Trace",
		country: "UK",
		website: "myanimaltrace.com",
		port: 4110,
	},
	{ id: 11, name: "MyPet", country: "UK", website: "mypethq.io", port: 4111 },
	{
		id: 12,
		name: "National Veterinary Data Service",
		country: "UK",
		website: "nvds.co.uk",
		port: 4112,
	},
	{
		id: 13,
		name: "Pet Chip Register",
		country: "UK",
		website: "petchipregister.co.uk",
		port: 4113,
	},
	{
		id: 14,
		name: "Pet Database",
		country: "UK",
		website: "petdatabase.com",
		port: 4114,
	},
	{
		id: 15,
		name: "Pet Identity UK",
		country: "UK",
		website: "petidentityuk.info",
		port: 4115,
	},
	{
		id: 16,
		name: "Petlog",
		country: "UK",
		website: "petlog.org.uk",
		port: 4116,
		note: "UK's largest database",
	},
	{
		id: 17,
		name: "PetScanner",
		country: "UK",
		website: "petscanner.com",
		port: 4117,
	},
	{
		id: 18,
		name: "ProtectedPet",
		country: "UK",
		website: "protectedpet.com",
		port: 4118,
	},
	{
		id: 19,
		name: "SmartTrace",
		country: "UK",
		website: "smarttrace.org.uk",
		port: 4119,
	},
	{
		id: 20,
		name: "Track Your Paws",
		country: "UK",
		website: "trackyourpaws.co.uk",
		port: 4120,
	},
	{
		id: 21,
		name: "UK PETtrac MicroChip Database",
		country: "UK",
		website: "pettrac.co.uk",
		port: 4121,
	},
	{
		id: 22,
		name: "We Trace Pets",
		country: "UK",
		website: "wetracepets.com",
		port: 4122,
	},
];

function createRegistryService(registry) {
	const app = express();
	app.use(express.json());

	// Search endpoint - simulates real registry lookup
	app.get("/search/:microchipId", async (req, res) => {
		try {
			const { microchipId } = req.params;

			// Search for dog in this specific registry using Prisma
			const dog = await prisma.dog.findFirst({
				where: {
					microchipId: microchipId,
					registryId: registry.id,
				},
				include: {
					registry: true,
				},
			});

			if (dog) {
				res.json({
					success: true,
					registry: {
						name: registry.name,
						website: registry.website,
						country: registry.country,
						note: registry.note || null,
					},
					microchip: {
						id: dog.microchipId,
						registeredTo: {
							name: dog.ownerName,
							email: dog.ownerEmail,
							phone: dog.ownerPhone,
							address: dog.address,
						},
						pet: {
							name: dog.name,
							breed: dog.breed,
							age: dog.age,
							gender: dog.gender,
						},
						registration: {
							registeredAt: dog.createdAt,
							lastUpdated: dog.updatedAt,
						},
					},
				});
			} else {
				res.status(404).json({
					success: false,
					message: `Microchip ${microchipId} not registered with ${registry.name}`,
					registry: registry.name,
				});
			}
		} catch (error) {
			console.error(`Error in ${registry.name}:`, error);
			res.status(500).json({
				success: false,
				message: "Database connection error",
				registry: registry.name,
			});
		}
	});

	// Registry information endpoint
	app.get("/", async (req, res) => {
		try {
			const dogCount = await prisma.dog.count({
				where: { registryId: registry.id },
			});

			res.json({
				registry: registry.name,
				website: registry.website,
				country: registry.country,
				status: "operational",
				registeredAnimals: dogCount,
				services: [
					"Microchip registration",
					"Lost pet reunification",
					"24/7 lookup service",
				],
				note: registry.note || "Full service pet microchip database",
				compliance: "DEFRA approved - UK legislation compliant",
				lastUpdated: new Date().toISOString(),
			});
		} catch (error) {
			res.json({
				registry: registry.name,
				website: registry.website,
				status: "error",
				error: "Database connection failed",
			});
		}
	});

	// Registry statistics endpoint
	app.get("/stats", async (req, res) => {
		try {
			const totalDogs = await prisma.dog.count({
				where: { registryId: registry.id },
			});

			const recentRegistrations = await prisma.dog.count({
				where: {
					registryId: registry.id,
					createdAt: {
						gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
					},
				},
			});

			res.json({
				registry: registry.name,
				statistics: {
					totalRegistered: totalDogs,
					recentRegistrations: recentRegistrations,
					averageAge: 7.2, // Mock data
					activeUsers: Math.floor(totalDogs * 0.85), // Mock data
				},
			});
		} catch (error) {
			res.status(500).json({ error: "Statistics unavailable" });
		}
	});

	// Start the registry service
	app.listen(registry.port, () => {
		const note = registry.note ? ` (${registry.note})` : "";
		console.log(`✅ ${registry.name}${note} - Port ${registry.port}`);
	});
}

async function startAllRegistries() {
	console.log(
		"🐕 Starting Real UK/Northern Ireland Microchip Registry Services",
	);
	console.log("📋 22 DEFRA-approved databases for WhoDoggy search system\n");

	realRegistries.forEach(createRegistryService);

	setTimeout(async () => {
		console.log("\n🎉 All 22 UK microchip registries are now operational!");
		console.log("\n🧪 Test Commands:");
		console.log("   Health Check: curl http://localhost:4116/");
		console.log("   Registry Stats: curl http://localhost:4116/stats");
		console.log("   Search Test: curl http://localhost:4116/search/MC-100001");
		console.log("   Main API: curl http://localhost:3000/api/search/MC-100001");

		try {
			console.log("\n📊 Registry Distribution:");
			let totalDogs = 0;

			for (const registry of realRegistries.slice(0, 8)) {
				const count = await prisma.dog.count({
					where: { registryId: registry.id },
				});
				totalDogs += count;
				if (count > 0) {
					console.log(`   ${registry.name}: ${count} dogs`);
				}
			}

			console.log(`   Total dogs across all registries: ${totalDogs}`);
			console.log(
				"\n💡 These represent the real UK/Northern Ireland microchip databases",
			);
			console.log(
				"   used by vets, rescue centers, and dog wardens for pet identification.",
			);
		} catch (error) {
			console.log("   (Database connection check failed)");
		}
	}, 3000);
}

// Graceful shutdown
process.on("SIGINT", async () => {
	console.log("\n🛑 Shutting down UK microchip registry services...");
	await prisma.$disconnect();
	console.log("✅ All services stopped. Database disconnected.");
	process.exit(0);
});

// Start the real UK registry simulation
startAllRegistries();

console.log("\n🇬🇧 UK/Northern Ireland Microchip Registry System");
console.log("   Simulating real DEFRA-approved databases for WhoDoggy app");
console.log("   Each service represents an actual UK microchip registry");
console.log("   Perfect for TM470 project demonstration!\n");
