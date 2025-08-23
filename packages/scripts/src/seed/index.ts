// packages/scripts/src/seed/index.ts
import { seedDogs } from "./seedDogs.js";
import { seedOwners } from "./seedOwners.js";
import { seedRegistries } from "./seedRegistries.js";

async function main() {
  console.log("🌱 Starting WhoDoggy database seed...");

  await seedRegistries();
  await seedOwners();
  await seedDogs();

  console.log("✅ Seeding complete!");
}

main().catch((err) => {
  console.error("❌ Seeding failed", err);
  process.exit(1);
});
