// packages/backend/src/scripts/checkMigrations.ts
import { spawn } from "child_process";
import path from "path";
import dotenv from "dotenv";

// Load env from root
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const run = () => {
  const migrate = spawn(
    "pnpm",
    ["exec", "node-pg-migrate", "up", "--dry-run", "-c", "./node-pg-migrate.config.js"],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  migrate.on("close", (code) => {
    process.exit(code ?? 1);
  });
};

run();
