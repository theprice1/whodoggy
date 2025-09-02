import { faker } from "@faker-js/faker";
import { prisma } from "@whodoggy/backend";

export async function seedOwners() {
  console.log("➡️ Seeding dogs with owner info...");

  // First, make sure you have registries to reference
  const registry = await prisma.registry.findFirst();
  if (!registry) {
    throw new Error("No registries found. Seed registries first.");
  }

  for (let i = 0; i < 10; i++) {
    await prisma.dog.create({
      data: {
        microchipId: faker.string.alphanumeric(8).toUpperCase(),
        name: faker.person.firstName(),
        breed: faker.helpers.arrayElement(['Labrador', 'Golden Retriever', 'German Shepherd', 'Bulldog']),
        age: faker.number.int({ min: 1, max: 15 }),
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        ownerName: faker.person.fullName(),
        ownerEmail: faker.internet.email(),
        ownerPhone: faker.phone.number(),
        address: faker.location.streetAddress(),
        registryId: registry.id,
      },
    });
  }
  console.log("✅ Dogs with owner info seeded");
}
