// packages/scripts/src/seed/index.ts
import { seedDogs } from "./seedDogs";
import { seedOwners } from "./seedOwners";
import { seedRegistries } from "./seedRegistries";

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
