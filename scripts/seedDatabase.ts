import pgPromise, { ITask } from 'pg-promise';
import { faker } from '@faker-js/faker';

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL || 'postgresql://postgres:william@localhost:5432/whodoggy');

async function seed() {
  try {
    await db.tx(async (t: ITask<unknown>) => {
      console.log('Truncating tables...');
      await t.none('TRUNCATE dogs, owners, registries RESTART IDENTITY CASCADE');

      const owners = [
        { name: 'John Doe', email: 'john@example.com', phone: '0123456789' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
      ];

      console.log('Inserting owners...');
      const ownerIds = await Promise.all(
        owners.map(async (o) => {
          const owner = await t.one(
            'INSERT INTO owners(name, email, phone) VALUES($1, $2, $3) RETURNING id',
            [o.name, o.email, o.phone]
          );
          console.log(`Inserted owner: ${o.name} with id ${owner.id}`);
          return owner;
        })
      );

      const registries = [
        { name: 'UK National Registry', base_url: 'https://registry1.example.com', country: 'United Kingdom' },
        { name: 'EU Pet DB', base_url: 'https://registry2.example.com', country: 'Germany' },
      ];

      console.log('Inserting registries...');
      const registryIds = await Promise.all(
        registries.map(async (r) => {
          const registry = await t.one(
            'INSERT INTO registries(name, base_url, country) VALUES($1, $2, $3) RETURNING id',
            [r.name, r.base_url, r.country]
          );
          console.log(`Inserted registry: ${r.name} with id ${registry.id}`);
          return registry;
        })
      );

      console.log('Inserting dogs...');
      const dogInsertions: Promise<null>[] = [];
      const numDogs = 50;

      for (let i = 0; i < numDogs; i++) {
        const microchipId = faker.string.alphanumeric(12).toUpperCase();
        const dogName = faker.person.firstName();
        const breed = faker.animal.dog();
        const age = faker.number.int({ min: 1, max: 15 });
        const ownerIndex = faker.number.int({ min: 0, max: ownerIds.length - 1 });
        const registryIndex = faker.number.int({ min: 0, max: registryIds.length - 1 });

        dogInsertions.push(
          t.none(
            `INSERT INTO dogs (microchip_id, name, breed, age, owner_id, registry_id)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              microchipId,
              dogName,
              breed,
              age,
              ownerIds[ownerIndex].id,
              registryIds[registryIndex].id,
            ]
          )
        );
      }
      await Promise.all(dogInsertions);
      console.log(`Inserted ${numDogs} dogs.`);
    });

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    pgp.end();
  }
}

seed();
