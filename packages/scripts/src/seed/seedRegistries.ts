import { faker } from "@faker-js/faker";
// packages/scripts/src/seed/seedRegistries.ts
import { prisma } from "@whodoggy/backend";

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
        name: registry.name,
        country: registry.country,
        contactEmail: faker.internet.email(),
      },
    });
  }

  console.log("✅ Registries seeded");
}
