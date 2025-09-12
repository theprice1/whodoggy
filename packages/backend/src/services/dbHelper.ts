// db.ts

import dotenv from "dotenv";
import { Pool, type QueryResult } from "pg";

dotenv.config();

// Validate presence of DATABASE_URL
if (!process.env.DATABASE_URL) {
	throw new Error("❌ DATABASE_URL is missing in the .env file");
}

// Initialize PostgreSQL connection pool
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

// Event listeners for visibility and safety
pool.on("connect", () => {
	console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err: Error) => {
	console.error("❌ Unexpected error on idle PostgreSQL client", err);
	process.exit(-1);
});

// Export the pool instance for use in other files
export { pool };

// Helper function to test database connection
export const testConnection = async (): Promise<void> => {
	try {
		const result = await pool.query("SELECT NOW() as current_time");
		console.log("✅ Database connection successful");
		console.log("🕒 DB Time:", result.rows[0]?.current_time);
	} catch (error) {
		console.error("❌ Database connection failed:", error);
		throw error;
	}
};

// Helper function to close the pool gracefully
export const closePool = async (): Promise<void> => {
	try {
		await pool.end();
		console.log("🔌 Database connection pool closed");
	} catch (error) {
		console.error("❌ Error closing database pool:", error);
		throw error;
	}
};

// Optional direct run: test connection
if (require.main === module) {
	pool
		.query("SELECT NOW()")
		.then((res: QueryResult) => {
			console.log("🕒 DB Time:", res.rows[0]);
			process.exit(0);
		})
		.catch((err: Error) => {
			console.error("❌ Query failed:", err);
			process.exit(1);
		});
}

// This code initializes a PostgreSQL connection pool using the pg library.
// It reads the connection string from an environment variable, sets up event listeners for connection success and errors.
