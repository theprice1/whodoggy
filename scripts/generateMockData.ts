import { faker } from '@faker-js/faker';
import fs from 'fs';

const TOTAL_ENTRIES = 500;
const usedIds = new Set<string>();

function generateMicrochipId() {
  let id;
  do {
    id = faker.number.int({ min: 981000000000000, max: 981099999999999 }).toString();
  } while (usedIds.has(id));
  usedIds.add(id);
  return id;
}

const breeds = ['Labrador', 'German Shepherd', 'Staffordshire Bull Terrier', 'Beagle', 'Pug', 'Border Collie'];

const records = Array.from({ length: TOTAL_ENTRIES }, () => ({
  microchipId: generateMicrochipId(),
  dogName: faker.animal.dog(),
  breed: faker.helpers.arrayElement(breeds),
  ownerName: faker.person.fullName(),
  contact: faker.internet.email(),
  registeredAt: faker.date.past().toISOString(),
  registryName: `Registry_${faker.number.int({ min: 1, max: 22 })}`,
  vaccinated: faker.datatype.boolean(),
  notes: faker.lorem.sentence(),
  lastCheckup: faker.date.recent({ days: 365 }).toISOString(),
}));

fs.writeFileSync('mock_data/dogs.json', JSON.stringify(records, null, 2));
console.log(`✅ Generated ${TOTAL_ENTRIES} mock records.`);
