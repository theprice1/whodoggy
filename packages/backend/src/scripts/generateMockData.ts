import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

interface DogRecord {
  microchipId: string;
  dogName: string;
  breed: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string; // ISO string
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerCity: string;
  registeredAt: string;
  microchipImplantDate: string;
  registryName: string;
  vaccinated: boolean;
  notes: string;
  lastCheckup: string;
}

const args = process.argv.slice(2);
const TOTAL_ENTRIES = args[0] ? parseInt(args[0], 10) : 500;
const OUTPUT_PATH = args[1] || 'mock_data/dogs.json';

const REGISTRY_COUNT = 22;
const usedIds = new Set<string>();

function generateMicrochipId() {
  let id: string;
  do {
    id = faker.number.int({ min: 981000000000000, max: 981099999999999 }).toString();
  } while (usedIds.has(id));
  usedIds.add(id);
  return id;
}

const breeds = [
  'Labrador Retriever',
  'German Shepherd',
  'Golden Retriever',
  'Bulldog',
  'Beagle',
  'Pug',
  'Border Collie',
  'French Bulldog',
  'Dachshund',
  'Boxer'
];

function randomGender(): 'Male' | 'Female' {
  return faker.helpers.arrayElement(['Male', 'Female']);
}

function randomDateBetween(start: Date, end: Date): Date {
  return faker.date.between({ from: start, to: end });
}

const records: DogRecord[] = [];
const entriesPerRegistry = Math.floor(TOTAL_ENTRIES / REGISTRY_COUNT);

for (let regNum = 1; regNum <= REGISTRY_COUNT; regNum++) {
  for (let i = 0; i < entriesPerRegistry; i++) {
    const dob = randomDateBetween(new Date(2010, 0, 1), new Date(2024, 0, 1));
    const implantDate = randomDateBetween(dob, new Date());
    records.push({
      microchipId: generateMicrochipId(),
      dogName: faker.animal.dog(),
      breed: faker.helpers.arrayElement(breeds),
      gender: randomGender(),
      dateOfBirth: dob.toISOString(),
      ownerName: faker.person.fullName(),
      ownerPhone: faker.phone.number(),
      ownerEmail: faker.internet.email(),
      ownerCity: faker.location.city(),
      registeredAt: faker.date.past({ years: 5 }).toISOString(),
      microchipImplantDate: implantDate.toISOString(),
      registryName: `Registry_${regNum}`,
      vaccinated: faker.datatype.boolean(),
      notes: faker.lorem.sentence(),
      lastCheckup: faker.date.recent({ days: 365 }).toISOString(),
    });
  }
}

// Add any leftover records due to rounding
while (records.length < TOTAL_ENTRIES) {
  const dob = randomDateBetween(new Date(2010, 0, 1), new Date(2024, 0, 1));
  const implantDate = randomDateBetween(dob, new Date());
  records.push({
    microchipId: generateMicrochipId(),
    dogName: faker.animal.dog(),
    breed: faker.helpers.arrayElement(breeds),
    gender: randomGender(),
    dateOfBirth: dob.toISOString(),
    ownerName: faker.person.fullName(),
    ownerPhone: faker.phone.number(),
    ownerEmail: faker.internet.email(),
    ownerCity: faker.location.city(),
    registeredAt: faker.date.past({ years: 5 }).toISOString(),
    microchipImplantDate: implantDate.toISOString(),
    registryName: `Registry_${faker.number.int({ min: 1, max: REGISTRY_COUNT })}`,
    vaccinated: faker.datatype.boolean(),
    notes: faker.lorem.sentence(),
    lastCheckup: faker.date.recent({ days: 365 }).toISOString(),
  });
}

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write data to the output file
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(records, null, 2));
console.log(`✅ Generated ${records.length} mock records to ${OUTPUT_PATH}`);
