// packages/backend/src/seedDogs.ts - TEMPORARY FIX
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { prisma } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDogs() {
  const filePath = path.join(__dirname, "dogs.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const dogs = JSON.parse(data);

  console.log(`Seeding ${dogs.length} dogs...`);

  try {
    // First, ensure we have at least one registry
    const registry = await prisma.registry.upsert({
      where: { name: "Default Registry" },
      update: {},
      create: {
        name: "Default Registry",
        country: "Unknown",
        contact: "contact@example.com"
      }
    });

    await prisma.$transaction(async (tx) => {
      for (const dog of dogs) {
        // Calculate age from dateOfBirth
        const age = dog.dateOfBirth ?
          new Date().getFullYear() - new Date(dog.dateOfBirth).getFullYear() :
          5;

        await tx.dog.upsert({
          where: { microchipId: dog.microchipId },
          update: {},
          create: {
            microchipId: dog.microchipId,
            name: dog.dogName, // JSON uses 'dogName', schema expects 'name'
            breed: dog.breed || null,
            age: age,
            gender: dog.gender,
            ownerName: dog.ownerName,
            ownerEmail: dog.ownerEmail,
            ownerPhone: dog.ownerPhone,
            address: dog.ownerCity,
            registryId: registry.id,
          },
        });
      }
    });

    console.log("Seeding completed!");
  } catch (err) {
    console.error("Error seeding dogs:", err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

seedDogs();
