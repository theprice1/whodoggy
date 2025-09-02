// packages/scripts/src/seed/seedDogs.ts
import { faker } from '@faker-js/faker';

// Define types locally to avoid circular dependency
interface Dog {
  id: string;
  name: string;
  breed: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export function generateDogs(count: number, ownerIds: string[]): Dog[] {
  const dogs: Dog[] = [];

  for (let i = 0; i < count; i++) {
    dogs.push({
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      breed: faker.helpers.arrayElement([
        'Labrador', 'German Shepherd', 'Golden Retriever',
        'Bulldog', 'Beagle', 'Poodle', 'Rottweiler'
      ]),
      ownerId: faker.helpers.arrayElement(ownerIds),
      createdAt: faker.date.past(),
      updatedAt: new Date()
    });
  }

  return dogs;
}
