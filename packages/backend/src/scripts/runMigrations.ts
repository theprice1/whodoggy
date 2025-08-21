// packages/backend/src/scripts/runMigrations.ts
import { spawn } from "child_process";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const run = () => {
  const migrate = spawn(
    "pnpm",
    ["exec", "node-pg-migrate", "up", "-c", "./node-pg-migrate.config.js"],
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
