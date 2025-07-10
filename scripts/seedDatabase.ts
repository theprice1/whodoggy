import pgPromise from 'pg-promise';
import { faker } from '@faker-js/faker';

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL || 'postgresql://postgres:william@localhost:5432/whodoggy');

async function seed() {
  try {
    await db.none('DELETE FROM dogs');
    await db.none('DELETE FROM owners');
    await db.none('DELETE FROM registries');

    const owners = [
      { name: 'John Doe', email: 'john@example.com', phone: '0123456789' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
    ];

    const ownerIds = await Promise.all(
      owners.map(o =>
        db.one(
          'INSERT INTO owners(name, email, phone) VALUES($1, $2, $3) RETURNING id',
          [o.name, o.email, o.phone]
        )
      )
    );

    const registries = [
      { name: 'UK National Registry', base_url: 'https://registry1.example.com', country: 'United Kingdom' },
      { name: 'EU Pet DB', base_url: 'https://registry2.example.com', country: 'Germany' },
    ];

    const registryIds = await Promise.all(
      registries.map(r =>
        db.one(
          'INSERT INTO registries(name, base_url, country) VALUES($1, $2, $3) RETURNING id',
          [r.name, r.base_url, r.country]
        )
      )
    );

    // This is the important fix:
    // Use Promise<null>[] type and only push db.none(), which returns Promise<null>
    const dogInsertions: Promise<null>[] = [];
    for (let i = 0; i < 50; i++) {
      const microchipId = faker.string.uuid().slice(0, 12).toUpperCase();
      const dogName = faker.person.firstName();
      const breed = faker.animal.dog();
      const age = faker.number.int({ min: 1, max: 15 });
      const ownerIndex = faker.number.int({ min: 0, max: owners.length - 1 });
      const registryIndex = faker.number.int({ min: 0, max: registries.length - 1 });

      dogInsertions.push(
        db.none(
          `INSERT INTO dogs
          (microchip_id, name, breed, age, owner_id, registry_id)
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

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    pgp.end();
  }
}

seed();
