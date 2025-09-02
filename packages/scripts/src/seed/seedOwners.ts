// packages/scripts/src/seed/seedOwners.ts
import { faker } from '@faker-js/faker';

// Define types locally to avoid circular dependency
interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export function generateOwners(count: number): Owner[] {
  const owners: Owner[] = [];

  for (let i = 0; i < count; i++) {
    owners.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      createdAt: faker.date.past(),
      updatedAt: new Date()
    });
  }

  return owners;
}
