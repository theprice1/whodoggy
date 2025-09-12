// src/mock/mock-apis/startAllRegistries.ts

import { type ChildProcess, spawn } from "child_process";
import path from "path";
import { prisma } from "../../../prisma/prismaClient.js";

const totalRegistries = 22;
const basePort = 4100;
const openapiDir = path.join(__dirname, "openapi-specs");

// Array to store all child processes
const childProcesses: ChildProcess[] = [];

// Function to start a single registry mock API
const startRegistryAPI = (registryIndex: number): Promise<void> => {
	return new Promise((resolve, reject) => {
		const fileName = `registry-${registryIndex + 1}.yaml`;
		const port = basePort + registryIndex + 1;
		const filePath = path.join(openapiDir, fileName);

		console.log(`Starting Registry ${registryIndex + 1} on port ${port}...`);

		// Start the mock API server using prism-cli or similar tool
		const child = spawn(
			"npx",
			["prism", "mock", filePath, "--port", port.toString(), "--dynamic"],
			{
				stdio: "pipe",
				cwd: process.cwd(),
			},
		);

		child.on("error", (err: Error) => {
			console.error(`Failed to start Registry ${registryIndex + 1}:`, err);
			reject(err);
		});

		child.on("spawn", () => {
			console.log(`✅ Registry ${registryIndex + 1} started on port ${port}`);
			childProcesses.push(child);
			resolve();
		});

		child.stdout?.on("data", (data: Buffer) => {
			console.log(`Registry ${registryIndex + 1}: ${data.toString()}`);
		});

		child.stderr?.on("data", (data: Buffer) => {
			console.error(`Registry ${registryIndex + 1} Error: ${data.toString()}`);
		});

		child.on("close", (code: number | null) => {
			console.log(`Registry ${registryIndex + 1} exited with code ${code}`);
		});
	});
};

// Function to start all registry APIs
export const startAllRegistries = async (): Promise<void> => {
	try {
		console.log(
			`🚀 Starting ${totalRegistries} Northern Ireland Microchip Registry APIs...`,
		);

		// Start all registries concurrently
		const startPromises = [];
		for (let i = 0; i < totalRegistries; i++) {
			startPromises.push(startRegistryAPI(i));
		}

		await Promise.all(startPromises);

		console.log(
			`✅ All ${totalRegistries} registry APIs started successfully!`,
		);
		console.log(
			`📋 Registry APIs running on ports ${basePort + 1} to ${basePort + totalRegistries}`,
		);

		// Display registry mapping
		displayRegistryMapping();
	} catch (error) {
		console.error("❌ Failed to start all registries:", error);
		await stopAllRegistries();
		process.exit(1);
	}
};

// Function to stop all registry APIs
export const stopAllRegistries = async (): Promise<void> => {
	console.log("🛑 Stopping all registry APIs...");

	for (const child of childProcesses) {
		if (child && !child.killed) {
			child.kill("SIGTERM");
		}
	}

	// Clear the array
	childProcesses.length = 0;
	console.log("✅ All registry APIs stopped");
};

// Function to display the registry mapping
const displayRegistryMapping = (): void => {
	console.log("\n📋 Northern Ireland Microchip Registry API Mapping:");
	console.log("=".repeat(60));

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

	registryNames.forEach((name, index) => {
		const port = basePort + index + 1;
		console.log(
			`${(index + 1).toString().padStart(2, "0")}. ${name.padEnd(25)} → http://localhost:${port}`,
		);
	});

	console.log("=".repeat(60));
	console.log(
		`\n🔍 Use these APIs to test cross-registry microchip searches in WhoDoggy`,
	);
};

// Function to create test data for registries
export const seedRegistryData = async (): Promise<void> => {
	try {
		console.log("🌱 Seeding test data for registries...");

		// Create registries if they don't exist
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

		for (let i = 0; i < registryNames.length; i++) {
			const registryName = registryNames[i];
			if (!registryName) {
				console.error(`Registry name at index ${i} is undefined`);
				continue;
			}

			await prisma.registry.upsert({
				where: { id: i + 1 },
				update: {},
				create: {
					id: i + 1,
					name: registryName,
					country: "Northern Ireland",
					contact: `contact@${registryName.toLowerCase().replace(/\s+/g, "")}.co.uk`,
				},
			});
		}

		console.log("✅ Registry data seeded successfully");
	} catch (error) {
		console.error("❌ Failed to seed registry data:", error);
	}
};

// Function to test registry connectivity
export const testRegistryConnectivity = async (): Promise<void> => {
	console.log("🔍 Testing registry connectivity...");

	const testPromises = [];
	for (let i = 0; i < totalRegistries; i++) {
		const port = basePort + i + 1;
		testPromises.push(testSingleRegistry(port, i + 1));
	}

	const results = await Promise.allSettled(testPromises);

	let successCount = 0;
	let failCount = 0;

	results.forEach((result, index) => {
		if (result.status === "fulfilled") {
			successCount++;
			console.log(`✅ Registry ${index + 1} is responding`);
		} else {
			failCount++;
			console.log(`❌ Registry ${index + 1} failed: ${result.reason}`);
		}
	});

	console.log(
		`\n📊 Registry Status: ${successCount} online, ${failCount} offline`,
	);
};

// Helper function to test a single registry
const testSingleRegistry = async (
	port: number,
	registryId: number,
): Promise<void> => {
	try {
		const response = await fetch(`http://localhost:${port}/health`);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}
	} catch (error) {
		throw new Error(`Registry ${registryId} on port ${port} is not responding`);
	}
};

// Handle graceful shutdown
process.on("SIGINT", async () => {
	console.log("\n🛑 Received SIGINT, shutting down registries...");
	await stopAllRegistries();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	console.log("\n🛑 Received SIGTERM, shutting down registries...");
	await stopAllRegistries();
	process.exit(0);
});

// Main execution if run directly
if (require.main === module) {
	(async () => {
		try {
			await seedRegistryData();
			await startAllRegistries();

			// Test connectivity after a short delay
			setTimeout(async () => {
				await testRegistryConnectivity();
			}, 5000);
		} catch (error) {
			console.error("❌ Failed to start registry system:", error);
			process.exit(1);
		}
	})();
}
