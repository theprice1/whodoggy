// packages/scripts/src/seed/seedOwners.ts
import { prisma } from "../utils/prisma";
import { faker } from "@faker-js/faker";

export async function seedOwners() {
  console.log("➡️ Seeding owners...");

  for (let i = 0; i < 10; i++) {
    await prisma.owner.create({
      data: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
      },
    });
  }

  console.log("✅ Owners seeded");
}
