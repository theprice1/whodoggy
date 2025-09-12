// packages/backend/src/scripts/runMigrations.ts - Database migration runner for WhoDoggy

import path from "node:path";
import { type ChildProcess, spawn } from "child_process";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Validate required environment variables for database migration
const requiredEnvVars = [
	"DATABASE_URL",
	"PGHOST",
	"PGUSER",
	"PGDATABASE",
	"PGPASSWORD",
	"PGPORT",
];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
	console.error(
		`Missing required environment variables for migration: ${missingVars.join(", ")}`,
	);
	console.error(
		"Please check your .env file and ensure all database connection variables are set.",
	);
	process.exit(1);
}

const run = (): void => {
	console.log("Starting WhoDoggy database migrations...");
	console.log(
		`Database: ${process.env.PGDATABASE}@${process.env.PGHOST}:${process.env.PGPORT}`,
	);

	const migrate: ChildProcess = spawn(
		"pnpm",
		["exec", "node-pg-migrate", "up", "-c", "./node-pg-migrate.config.js"],
		{
			stdio: "inherit",
			env: process.env,
			cwd: process.cwd(),
		},
	);

	migrate.on("error", (error: Error) => {
		console.error("Failed to start migration process:", error);
		process.exit(1);
	});

	migrate.on("close", (code: number | null) => {
		if (code === 0) {
			console.log("Database migrations completed successfully!");
			console.log("WhoDoggy database schema is up to date.");
		} else {
			console.error(`Migration process exited with code: ${code}`);
			console.error("Please check the migration logs above for details.");
		}
		process.exit(code ?? 1);
	});

	migrate.on("exit", (code: number | null, signal: string | null) => {
		if (signal) {
			console.log(`Migration process was terminated by signal: ${signal}`);
		}
	});
};

// Alternative function to run migrations with Prisma (if using Prisma migrations)
const runPrismaMigrations = (): void => {
	console.log("Starting Prisma database migrations for WhoDoggy...");

	const migrate: ChildProcess = spawn("npx", ["prisma", "migrate", "deploy"], {
		stdio: "inherit",
		env: process.env,
		cwd: process.cwd(),
	});

	migrate.on("error", (error: Error) => {
		console.error("Failed to start Prisma migration process:", error);
		process.exit(1);
	});

	migrate.on("close", (code: number | null) => {
		if (code === 0) {
			console.log("Prisma migrations completed successfully!");
			console.log("WhoDoggy database schema is up to date.");
		} else {
			console.error(`Prisma migration process exited with code: ${code}`);
		}
		process.exit(code ?? 1);
	});
};

// Function to check migration status
const checkMigrationStatus = (): void => {
	console.log("Checking migration status...");

	const check: ChildProcess = spawn(
		"pnpm",
		["exec", "node-pg-migrate", "current", "-c", "./node-pg-migrate.config.js"],
		{
			stdio: "inherit",
			env: process.env,
		},
	);

	check.on("close", (code: number | null) => {
		console.log(`Migration status check completed with code: ${code}`);
	});
};

// Function to rollback last migration (useful for development)
const rollbackMigration = (): void => {
	console.log("Rolling back last migration...");
	console.log("WARNING: This will undo the most recent database migration!");

	const rollback: ChildProcess = spawn(
		"pnpm",
		[
			"exec",
			"node-pg-migrate",
			"down",
			"1",
			"-c",
			"./node-pg-migrate.config.js",
		],
		{
			stdio: "inherit",
			env: process.env,
		},
	);

	rollback.on("close", (code: number | null) => {
		if (code === 0) {
			console.log("Migration rollback completed successfully!");
		} else {
			console.error(`Rollback process exited with code: ${code}`);
		}
		process.exit(code ?? 1);
	});
};

// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
	case "status":
		checkMigrationStatus();
		break;
	case "rollback":
		rollbackMigration();
		break;
	case "prisma":
		runPrismaMigrations();
		break;
	case "up":
	default:
		run();
		break;
}

// Handle graceful shutdown
process.on("SIGINT", () => {
	console.log("\nReceived SIGINT, terminating migration process...");
	process.exit(0);
});

process.on("SIGTERM", () => {
	console.log("\nReceived SIGTERM, terminating migration process...");
	process.exit(0);
});
