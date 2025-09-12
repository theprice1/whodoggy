// src/db/index.ts - Database connection using pg-promise for WhoDoggy
import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config();

const pgp = pgPromise();

const db = pgp({
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 5432,
	database: process.env.DB_NAME || "whodoggy",
	user: process.env.DB_USER || "postgres",
	password: process.env.DB_PASSWORD || "",
});

// Export db and pgp instances for use in other files
export { pgp, db };

// Convenience query function
export const query = db.any.bind(db);

// Function to shutdown the database pool gracefully
export async function shutdownDbPool(): Promise<void> {
	try {
		// pg-promise uses pg's Pool, so you can call db.$pool.end()
		await db.$pool.end();
		console.log("Database connection pool closed");
	} catch (error) {
		console.error("Error closing database pool:", error);
		throw error;
	}
}

// Test database connection
export async function testConnection(): Promise<void> {
	try {
		const result = await db.one("SELECT NOW() as current_time");
		console.log("Database connection successful");
		console.log("DB Time:", result.current_time);
	} catch (error) {
		console.error("Database connection failed:", error);
		throw error;
	}
}

// Utility functions for WhoDoggy microchip registry operations

// Search for dog by microchip ID across all registries
export async function findDogByMicrochip(microchipId: string): Promise<any> {
	try {
		const result = await db.oneOrNone(
			`SELECT d.*, r.name as registry_name, r.country, r.contact
			 FROM dogs d
			 JOIN registries r ON d.registry_id = r.id
			 WHERE d.microchip_id = $1`,
			[microchipId],
		);
		return result;
	} catch (error) {
		console.error("Error finding dog by microchip:", error);
		throw error;
	}
}

// Get all dogs from a specific registry
export async function getDogsByRegistry(registryId: number): Promise<any[]> {
	try {
		const results = await db.any(
			`SELECT d.*, r.name as registry_name
			 FROM dogs d
			 JOIN registries r ON d.registry_id = r.id
			 WHERE d.registry_id = $1
			 ORDER BY d.name`,
			[registryId],
		);
		return results;
	} catch (error) {
		console.error("Error getting dogs by registry:", error);
		throw error;
	}
}

// Search dogs by owner information
export async function searchDogsByOwner(searchTerm: string): Promise<any[]> {
	try {
		const results = await db.any(
			`SELECT d.*, r.name as registry_name
			 FROM dogs d
			 JOIN registries r ON d.registry_id = r.id
			 WHERE d.owner_name ILIKE $1
			    OR d.owner_email ILIKE $1
			    OR d.owner_phone ILIKE $1
			 ORDER BY d.owner_name`,
			[`%${searchTerm}%`],
		);
		return results;
	} catch (error) {
		console.error("Error searching dogs by owner:", error);
		throw error;
	}
}

// Get statistics for all registries
export async function getRegistryStatistics(): Promise<any[]> {
	try {
		const results = await db.any(
			`SELECT r.id, r.name, r.country,
			        COUNT(d.id) as dog_count,
			        MAX(d.created_at) as last_registration
			 FROM registries r
			 LEFT JOIN dogs d ON r.id = d.registry_id
			 GROUP BY r.id, r.name, r.country
			 ORDER BY dog_count DESC`,
		);
		return results;
	} catch (error) {
		console.error("Error getting registry statistics:", error);
		throw error;
	}
}

// Graceful shutdown handler
process.on("SIGINT", async () => {
	console.log("Received SIGINT, closing database connection...");
	await shutdownDbPool();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	console.log("Received SIGTERM, closing database connection...");
	await shutdownDbPool();
	process.exit(0);
});

// If run directly, test the connection
if (require.main === module) {
	testConnection()
		.then(() => {
			console.log("Database test completed successfully");
			return shutdownDbPool();
		})
		.catch((error) => {
			console.error("Database test failed:", error);
			process.exit(1);
		});
}
