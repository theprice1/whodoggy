import { pool } from './db';
import { faker } from '@faker-js/faker';

const NUM_RECORDS = 20;

async function seedDatabase() {
  try {
    console.log(`🚀 Seeding ${NUM_RECORDS} microchip records...`);

    for (let i = 0; i < NUM_RECORDS; i++) {
      const microchip_id = faker.number
        .int({ min: 985141000000000, max: 985141999999999 })
        .toString();
      const pet_name = faker.animal.dog();
      const species = 'dog';
      const breed = faker.animal.dog(); // same for simplicity
      const date_registered = faker.date.past({ years: 3 });
      const registry_name = faker.helpers.arrayElement([
        'PetTrace UK',
        'ChipSecure Registry',
        'VetID Central',
        'SafePaws Database',
        'MicroTrack National',
      ]);
      const owner_contact = faker.internet.email();

      await pool.query(
        `INSERT INTO microchips 
         (microchip_id, pet_name, species, breed, date_registered, registry_name, owner_contact) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (microchip_id) DO NOTHING;`,
        [
          microchip_id,
          pet_name,
          species,
          breed,
          date_registered,
          registry_name,
          owner_contact,
        ]
      );
    }

    console.log(`✅ Successfully inserted ${NUM_RECORDS} mock records.`);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    await pool.end();
  }
}

seedDatabase();
// This script seeds the database with mock microchip records using Faker.js
// It generates random data for each field and inserts it into the microchips table.
