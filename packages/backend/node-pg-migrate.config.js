import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.resolve(__dirname, "src/migrations");

console.log("Migration directory resolved to:", migrationsDir);

// Defensive check: verify migrations directory exists before running migrations
if (!fs.existsSync(migrationsDir)) {
  console.error(`ERROR: Migrations directory does not exist at ${migrationsDir}`);
  process.exit(1); // Exit early if folder missing
}

export default {
  dir: migrationsDir, // Explicit migrations folder path
  migrationFileExtension: ".js", // Matches your migration files
  migrationsTable: "pgmigrations", // Table used by node-pg-migrate
  databaseUrl:
    process.env.DATABASE_URL ||
    `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
};
