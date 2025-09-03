import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config();

const _pgp = pgPromise();

const _db = pgp({
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 5432,
	database: process.env.DB_NAME || "whodoggy",
	user: process.env.DB_USER || "postgres",
	password: process.env.DB_PASSWORD || "",
});

// Export db and pgp instances
export { pgp, db };
export const _query = db.any.bind(db);

// Correctly export shutdownDbPool function
export async function shutdownDbPool() {
	// pg-promise uses pg's Pool, so you can call pgp.pg.end() or db.$pool.end()
	await db.$pool.end(); // Proper method to close the pool in pg-promise
}
