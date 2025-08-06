// scripts/seedDatabase.ts
import pgPromise from 'pg-promise';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

const db = pgp({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE || 'whodoggy',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '',
});

async function seedDogs() {
  try {
    // Load dogs seed data JSON
    const dogsFilePath = path.join(__dirname, 'seed', 'dogs.json');
    const dogsDataRaw = await fs.readFile(dogsFilePath, 'utf-8');
    const dogsData = JSON.parse(dogsDataRaw);

    if (!Array.isArray(dogsData)) {
      throw new Error('Dogs seed data should be an array');
    }

    // Insert each dog record
    for (const dog of dogsData) {
      await db.none(
        `
        INSERT INTO dogs (id, name, breed, age, microchip_id)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO NOTHING
        `,
        [dog.id, dog.name, dog.breed, dog.age, dog.microchip_id]
      );
    }

    console.log(`Seeded ${dogsData.length} dogs`);
  } catch (error) {
    console.error('Error seeding dogs:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('Starting seed script...');
    await seedDogs();
    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    pgp.end(); // close DB connection pool
  }
}

main();
