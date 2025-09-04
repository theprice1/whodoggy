import { Pool } from "../../../../../../../";
import path from "node:path";
import dotenv from "dotenv";

// Always resolve based on this file's actual directory
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const _pool = new Pool({
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: Number(process.env.PGPORT),
});
