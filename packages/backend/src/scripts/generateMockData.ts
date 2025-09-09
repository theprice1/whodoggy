// src/scripts/generateMockData.ts
import { faker } from "@faker-js/faker";
import fs from "node:fs";
import path from "node:path";

interface DogRecord {
  microchipId: string;
  dogName: string;
  breed: string;
  gender: "Male" | "Female";
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
const TOTAL_ENTRIES = args[0] ? Number.parseInt(args[0], 10) : 500;
const OUTPUT_PATH = args[1] || "mock_data/dogs.json";

const REGISTRY_COUNT = 22;
const usedIds = new Set<string>();

function generateMicrochipId(): string {
  let id: string;
  do {
    id = faker.number
      .int({ min: 981000000000000, max: 981099999999999 })
      .toString();
  } while (usedIds.has(id));
  usedIds.add(id);
  return id;
}

// Northern Ireland dog breeds - commonly registered
const breeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Border Collie",
  "Jack Russell Terrier",
  "Cocker Spaniel",
  "Springer Spaniel",
  "Yorkshire Terrier",
  "Bulldog",
  "Beagle",
  "Pug",
  "French Bulldog",
  "Dachshund",
  "Boxer",
  "Rottweiler",
  "Staffordshire Bull Terrier",
  "Cavalier King Charles Spaniel",
  "Shih Tzu",
  "West Highland Terrier",
  "Poodle"
];

// Northern Ireland registry names (the real 22 databases)
const registryNames = [
  "Petlog", "Animal Tracker", "Anibase", "SmartTag", "PetDetect",
  "PetProtect", "Euroident", "PetLink", "National Pet Register",
  "Pets at Home", "MicroDogID", "Pet Identity UK", "IdentiChip",
  "PetLog Northern Ireland", "Animal Care", "VetEnvoy", "PetTrace",
  "MicroTracker", "AnimalData", "PetLocator", "RegistryPlus", "ChipChecker"
];

function randomGender(): "Male" | "Female" {
  return faker.helpers.arrayElement(["Male", "Female"]);
}

function randomDateBetween(start: Date, end: Date): Date {
  return faker.date.between({ from: start, to: end });
}

function generateNorthernIrelandAddress(): string {
  const cities = ["Belfast", "Derry", "Lisburn", "Bangor", "Newtownabbey", "Craigavon", "Carrickfergus", "Ballymena", "Omagh", "Enniskillen"];
  const city = faker.helpers.arrayElement(cities);
  const streetNumber = faker.number.int({ min: 1, max: 999 });
  const streetName = faker.location.streetName();
  const postcode = `BT${faker.number.int({ min: 1, max: 99 })} ${faker.string.alpha({ length: 3, casing: 'upper' })}`;

  return `${streetNumber} ${streetName}, ${city}, ${postcode}, Northern Ireland`;
}

const records: DogRecord[] = [];
const entriesPerRegistry = Math.floor(TOTAL_ENTRIES / REGISTRY_COUNT);

console.log(`Generating ${TOTAL_ENTRIES} mock dog records for ${REGISTRY_COUNT} Northern Ireland registries...`);

for (let regNum = 1; regNum <= REGISTRY_COUNT; regNum++) {
  const registryName = registryNames[regNum - 1] || `Registry_${regNum}`;

  console.log(`Generating data for ${registryName} (${regNum}/${REGISTRY_COUNT})...`);

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
      ownerPhone: faker.phone.number('028 #### ####'), // NI phone format
      ownerEmail: faker.internet.email(),
      ownerCity: generateNorthernIrelandAddress(),
      registeredAt: faker.date.past({ years: 5 }).toISOString(),
      microchipImplantDate: implantDate.toISOString(),
      registryName: registryName,
      vaccinated: faker.datatype.boolean({ probability: 0.85 }), // Most dogs are vaccinated
      notes: faker.lorem.sentence(),
      lastCheckup: faker.date.recent({ days: 365 }).toISOString(),
    });
  }
}

// Add any leftover records due to rounding
while (records.length < TOTAL_ENTRIES) {
  const dob = randomDateBetween(new Date(2010, 0, 1), new Date(2024, 0, 1));
  const implantDate = randomDateBetween(dob, new Date());
  const randomRegistry = faker.helpers.arrayElement(registryNames);

  records.push({
    microchipId: generateMicrochipId(),
    dogName: faker.animal.dog(),
    breed: faker.helpers.arrayElement(breeds),
    gender: randomGender(),
    dateOfBirth: dob.toISOString(),
    ownerName: faker.person.fullName(),
    ownerPhone: faker.phone.number('028 #### ####'),
    ownerEmail: faker.internet.email(),
    ownerCity: generateNorthernIrelandAddress(),
    registeredAt: faker.date.past({ years: 5 }).toISOString(),
    microchipImplantDate: implantDate.toISOString(),
    registryName: randomRegistry,
    vaccinated: faker.datatype.boolean({ probability: 0.85 }),
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

// Generate separate files for each registry
console.log('Generating individual registry files...');
const registryGroups = records.reduce((groups: Record<string, DogRecord[]>, record) => {
  if (!groups[record.registryName]) {
    groups[record.registryName] = [];
  }
  groups[record.registryName].push(record);
  return groups;
}, {});

Object.entries(registryGroups).forEach(([registryName, registryRecords], index) => {
  const registryFileName = path.join(outputDir, `registry-${index + 1}.json`);
  fs.writeFileSync(registryFileName, JSON.stringify(registryRecords, null, 2));
  console.log(`  ${registryName}: ${registryRecords.length} records → ${registryFileName}`);
});

console.log(`✅ Generated ${records.length} mock records to ${OUTPUT_PATH}`);
console.log(`✅ Generated ${Object.keys(registryGroups).length} individual registry files`);
console.log(`📊 Statistics:`);
console.log(`   Total Dogs: ${records.length}`);
console.log(`   Registries: ${Object.keys(registryGroups).length}`);
console.log(`   Unique Microchips: ${usedIds.size}`);
console.log(`   Average per Registry: ${Math.round(records.length / Object.keys(registryGroups).length)}`);

// Generate summary report
const summary = {
  totalRecords: records.length,
  generatedAt: new Date().toISOString(),
  registries: Object.entries(registryGroups).map(([name, records], index) => ({
    id: index + 1,
    name,
    recordCount: records.length,
    fileName: `registry-${index + 1}.json`
  })),
  breeds: [...new Set(records.map(r => r.breed))].sort(),
  dateRange: {
    oldestDog: Math.min(...records.map(r => new Date(r.dateOfBirth).getTime())),
    youngestDog: Math.max(...records.map(r => new Date(r.dateOfBirth).getTime()))
  }
};

fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(summary, null, 2));
console.log(`📋 Summary report generated: ${path.join(outputDir, 'summary.json')}`);
