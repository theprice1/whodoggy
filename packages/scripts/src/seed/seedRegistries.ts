import { faker } from "@faker-js/faker";
// packages/scripts/src/seed/seedRegistries.ts
import { prisma } from "../utils/prisma.js";

export async function seedRegistries() {
  console.log("➡️ Seeding registries...");

  const registries = [
    { name: "UK National Dog Registry", country: "UK" },
    { name: "US Microchip Database", country: "USA" },
    { name: "EU Pet Records", country: "EU" },
  ];

  for (const registry of registries) {
    await prisma.registry.create({
      data: {
        id: faker.string.uuid(),
        name: registry.name,
        country: registry.country,
        contactEmail: faker.internet.email({ provider: "registry.com" }),
      },
    });
  }

  console.log("✅ Registries seeded");
}
