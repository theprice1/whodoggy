// packages/backend/src/scripts/checkMigrations.ts - Check database migrations for WhoDoggy
import { spawn, type ChildProcess } from "child_process";
import path from "node:path";
import dotenv from "dotenv";

// Load env from root
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'PGHOST', 'PGUSER', 'PGDATABASE'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Please check your .env file and ensure all database connection variables are set.');
  process.exit(1);
}

const run = (): void => {
  console.log('Checking WhoDoggy database migrations (dry run)...');
  console.log(`Target database: ${process.env.PGDATABASE}@${process.env.PGHOST}`);
  console.log('This will show what migrations would be applied without actually running them.\n');

  const migrate: ChildProcess = spawn(
    "pnpm",
    [
      "exec",
      "node-pg-migrate",
      "up",
      "--dry-run",
      "-c",
      "./node-pg-migrate.config.js",
    ],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  migrate.on("error", (error: Error) => {
    console.error("Failed to start migration check process:", error);
    process.exit(1);
  });

  migrate.on("close", (code: number | null) => {
    if (code === 0) {
      console.log("\nMigration check completed successfully!");
      console.log("The above output shows what migrations would be applied to your WhoDoggy database.");
    } else {
      console.error(`\nMigration check process exited with code: ${code}`);
      console.error("Please review any errors above and check your database connection.");
    }
    process.exit(code ?? 1);
  });

  migrate.on("exit", (code: number | null, signal: string | null) => {
    if (signal) {
      console.log(`Migration check process was terminated by signal: ${signal}`);
    }
  });
};

// Function to check current migration status
const checkCurrentStatus = (): void => {
  console.log('Checking current migration status for WhoDoggy database...\n');

  const statusCheck: ChildProcess = spawn(
    "pnpm",
    [
      "exec",
      "node-pg-migrate",
      "current",
      "-c",
      "./node-pg-migrate.config.js",
    ],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  statusCheck.on("error", (error: Error) => {
    console.error("Failed to check migration status:", error);
    process.exit(1);
  });

  statusCheck.on("close", (code: number | null) => {
    if (code === 0) {
      console.log("\nMigration status check completed.");
    } else {
      console.error(`\nStatus check process exited with code: ${code}`);
    }
    process.exit(code ?? 1);
  });
};

// Function to list all available migrations
const listMigrations = (): void => {
  console.log('Listing all available migrations for WhoDoggy database...\n');

  const listCheck: ChildProcess = spawn(
    "pnpm",
    [
      "exec",
      "node-pg-migrate",
      "ls",
      "-c",
      "./node-pg-migrate.config.js",
    ],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  listCheck.on("error", (error: Error) => {
    console.error("Failed to list migrations:", error);
    process.exit(1);
  });

  listCheck.on("close", (code: number | null) => {
    if (code === 0) {
      console.log("\nMigration list completed.");
    } else {
      console.error(`\nList process exited with code: ${code}`);
    }
    process.exit(code ?? 1);
  });
};

// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];

console.log('WhoDoggy Database Migration Checker');
console.log('===================================\n');

switch (command) {
  case 'status':
    checkCurrentStatus();
    break;
  case 'list':
    listMigrations();
    break;
  case 'check':
  default:
    run();
    break;
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, terminating migration check...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, terminating migration check...');
  process.exit(0);
});
