// src/examples/fetchDogs.ts - Example script to fetch dogs from PostgreSQL database
import dotenv from "dotenv";
import { Pool, type QueryResult } from "pg";

// Load environment variables
dotenv.config();

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
	console.error("❌ DATABASE_URL is missing in the .env file");
	process.exit(1);
}

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

// Type definition for dog data from database
interface DogRow {
	id: number;
	name: string;
	breed: string | null;
	microchip_id: string;
	age: number;
	gender: string;
	owner_name: string;
	owner_email: string;
	owner_phone: string;
	address: string;
	registry_id: number;
}

async function fetchDogs(): Promise<void> {
	try {
		console.log("🔍 Fetching dogs from WhoDoggy database...");

		const res: QueryResult<DogRow> = await pool.query(
			"SELECT id, name, breed, microchip_id, age, gender, owner_name, owner_email, owner_phone, address, registry_id FROM dogs LIMIT 10;",
		);

		console.log(`✅ Found ${res.rows.length} dogs:`);
		console.table(res.rows);

		// Example: Search by microchip ID
		console.log("\n🔍 Example: Searching by microchip ID...");
		if (res.rows.length > 0) {
			const firstDog = res.rows[0];
			if (firstDog) {
				const searchRes = await pool.query(
					"SELECT * FROM dogs WHERE microchip_id = $1",
					[firstDog.microchip_id],
				);

				console.log("🐕 Dog found by microchip:");
				console.log(searchRes.rows[0]);
			}
		}
	} catch (error) {
		console.error("❌ Error querying dogs:", error);
		throw error;
	} finally {
		await pool.end();
		console.log("🔌 Database connection closed");
	}
}

// Example function to demonstrate registry-based search (for WhoDoggy cross-registry functionality)
async function fetchDogsByRegistry(registryId: number): Promise<void> {
	const pool = new Pool({
		connectionString: process.env.DATABASE_URL,
	});

	try {
		console.log(`🏥 Fetching dogs from registry ID: ${registryId}...`);

		const res = await pool.query(
			`SELECT d.*, r.name as registry_name
			 FROM dogs d
			 JOIN registries r ON d.registry_id = r.id
			 WHERE d.registry_id = $1
			 LIMIT 5`,
			[registryId],
		);

		console.log(`✅ Found ${res.rows.length} dogs in this registry:`);
		res.rows.forEach((dog: any) => {
			console.log(
				`  🐕 ${dog.name} (${dog.breed}) - Microchip: ${dog.microchip_id} - Registry: ${dog.registry_name}`,
			);
		});
	} catch (error) {
		console.error("❌ Error querying registry dogs:", error);
	} finally {
		await pool.end();
	}
}

// Example function to simulate cross-registry search (core WhoDoggy functionality)
async function crossRegistrySearch(microchipId: string): Promise<void> {
	const pool = new Pool({
		connectionString: process.env.DATABASE_URL,
	});

	try {
		console.log(`🌐 Cross-registry search for microchip: ${microchipId}...`);

		const res = await pool.query(
			`SELECT d.*, r.name as registry_name, r.country, r.contact
			 FROM dogs d
			 JOIN registries r ON d.registry_id = r.id
			 WHERE d.microchip_id = $1`,
			[microchipId],
		);

		if (res.rows.length > 0) {
			console.log("✅ Dog found in registry:");
			const dog = res.rows[0];
			console.log(`  🐕 Name: ${dog.name}`);
			console.log(`  🏥 Registry: ${dog.registry_name} (${dog.country})`);
			console.log(`  👤 Owner: ${dog.owner_name} (${dog.owner_email})`);
			console.log(`  📞 Contact: ${dog.owner_phone}`);
			console.log(`  📍 Address: ${dog.address}`);
		} else {
			console.log("❌ No dog found with that microchip ID in any registry");
		}
	} catch (error) {
		console.error("❌ Error in cross-registry search:", error);
	} finally {
		await pool.end();
	}
}

// Main execution
async function main(): Promise<void> {
	try {
		// Basic fetch example
		await fetchDogs();

		// Wait a moment between connections
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Registry-specific search example
		await fetchDogsByRegistry(1);

		// Wait a moment between connections
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Cross-registry search example (if we have any dogs)
		console.log("\n🔍 Testing cross-registry search...");
		const testPool = new Pool({
			connectionString: process.env.DATABASE_URL,
		});

		const testRes = await testPool.query(
			"SELECT microchip_id FROM dogs LIMIT 1",
		);
		await testPool.end();

		if (testRes.rows.length > 0) {
			await crossRegistrySearch(testRes.rows[0].microchip_id);
		}
	} catch (error) {
		console.error("💥 Example failed:", error);
		process.exit(1);
	}
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
	console.log("\n🛑 Received SIGINT, closing...");
	process.exit(0);
});

// Run the example
if (require.main === module) {
	main();
}
