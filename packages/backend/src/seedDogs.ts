import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // <-- ESM replacement for __dirname
import { pool } from "./db";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDogs() {
  const filePath = path.join(__dirname, "dogs.json"); // now works in ESM
  const data = fs.readFileSync(filePath, "utf-8");
  const dogs = JSON.parse(data);

  console.log(`Seeding ${dogs.length} dogs...`);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertQuery = `
      INSERT INTO dogs (
        microchip_id, dog_name, breed, gender, date_of_birth, owner_name,
        owner_phone, owner_email, owner_city, registered_at, microchip_implant_date,
        registry_name, vaccinated, notes, last_checkup
      ) VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      ON CONFLICT (microchip_id) DO NOTHING
    `;

    for (const dog of dogs) {
      await client.query(insertQuery, [
        dog.microchipId,
        dog.dogName,
        dog.breed,
        dog.gender,
        dog.dateOfBirth,
        dog.ownerName,
        dog.ownerPhone,
        dog.ownerEmail,
        dog.ownerCity,
        dog.registeredAt,
        dog.microchipImplantDate,
        dog.registryName,
        dog.vaccinated,
        dog.notes,
        dog.lastCheckup,
      ]);
    }

    await client.query("COMMIT");
    console.log("Seeding completed!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error seeding dogs:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDogs();
