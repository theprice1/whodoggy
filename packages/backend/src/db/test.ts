import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface TableRow {
	table_name: string;
}

(async () => {
	try {
		console.log("Testing database connection...");
		const res = await pool.query("SELECT NOW() as current_time");
		console.log("Connected to DB:", res.rows[0]);

		// Test a simple query to verify database structure
		try {
			const tableCheck = await pool.query<TableRow>(
				"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' LIMIT 5",
			);
			console.log(
				"Available tables:",
				tableCheck.rows.map((row: TableRow) => row.table_name),
			);
		} catch (tableError) {
			console.log("Could not list tables (database might be empty)");
		}

		await pool.end();
		process.exit(0);
	} catch (err) {
		console.error("DB connection failed:", err);
		process.exit(1);
	}
})();
