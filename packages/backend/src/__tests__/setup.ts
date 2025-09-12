// src/__tests__/setup.ts
import { execSync } from "child_process";
import { afterAll, beforeAll } from "vitest";

/**
 * Test setup for WhoDoggy backend
 * Handles database migrations and seeding before running tests
 */

beforeAll(async () => {
	console.log("Setting up test environment for WhoDoggy...");

	try {
		// Run database migrations
		console.log("Running database migrations...");
		execSync("pnpm run migrate", { stdio: "inherit" });

		// Seed the database with test data
		console.log("Seeding test database...");
		execSync("pnpm run seed-db", { stdio: "inherit" });

		console.log("Test database setup complete");
	} catch (error) {
		console.error("Failed to setup test database:", error);
		throw error;
	}
});

afterAll(async () => {
	console.log("Cleaning up test environment...");
	console.log("Test cleanup complete");
});
