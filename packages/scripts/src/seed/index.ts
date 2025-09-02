// packages/scripts/src/seed/index.ts
import { generateDogs } from './seedDogs.js';
import { generateOwners } from './seedOwners.js';
import { generateRegistries } from './seedRegistries.js';

async function seedDatabase() {
  console.log('Starting database seeding...');

  // Generate data
  const owners = generateOwners(10);
  const ownerIds = owners.map(o => o.id);
  const dogs = generateDogs(20, ownerIds);
  const registries = generateRegistries(5);

  console.log('Generated:', {
    owners: owners.length,
    dogs: dogs.length,
    registries: registries.length
  });

  // Here you would typically save to Firebase
  // For now, just log the data
  console.log('Sample owner:', owners[0]);
  console.log('Sample dog:', dogs[0]);
  console.log('Sample registry:', registries[0]);

  console.log('Seeding complete!');
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}

export { seedDatabase };
