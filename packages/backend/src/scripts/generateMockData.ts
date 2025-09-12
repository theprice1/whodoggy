// src/scripts/generateMockData.ts

import fs from "node:fs";
import path from "node:path";
import { faker } from "@faker-js/faker";

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
	"Poodle",
];

// Northern Ireland registry names (the real 22 databases)
const registryNames = [
	"Petlog",
	"Animal Tracker",
	"Anibase",
	"SmartTag",
	"PetDetect",
	"PetProtect",
	"Euroident",
	"PetLink",
	"National Pet Register",
	"Pets at Home",
	"MicroDogID",
	"Pet Identity UK",
	"IdentiChip",
	"PetLog Northern Ireland",
	"Animal Care",
	"VetEnvoy",
	"PetTrace",
	"MicroTracker",
	"AnimalData",
	"PetLocator",
	"RegistryPlus",
	"ChipChecker",
];

function randomGender(): "Male" | "Female" {
	return faker.helpers.arrayElement(["Male", "Female"]);
}

function randomDateBetween(start: Date, end: Date): Date {
	return faker.date.between({ from: start, to: end });
}

function generateNIPhoneNumber(): string {
	// Northern Ireland phone numbers start with 028
	const areaCode = "028";
	const number = faker.string.numeric(4) + " " + faker.string.numeric(4);
	return `${areaCode} ${number}`;
}

function generateNorthernIrelandAddress(): string {
	const cities = [
		"Belfast",
		"Derry",
		"Lisburn",
		"Bangor",
		"Newtownabbey",
		"Craigavon",
		"Carrickfergus",
		"Ballymena",
		"Omagh",
		"Enniskillen",
	];
	const city = faker.helpers.arrayElement(cities);
	const streetNumber = faker.number.int({ min: 1, max: 999 });
	const streetNames = [
		"Main Street",
		"High Street",
		"Church Road",
		"Park Avenue",
		"Mill Lane",
		"Castle Street",
		"Bridge Road",
		"Victoria Street",
		"King's Road",
		"Queen's Avenue",
	];
	const streetName = faker.helpers.arrayElement(streetNames);
	const postcode = `BT${faker.number.int({ min: 1, max: 99 })} ${faker.string.alpha({ length: 3, casing: "upper" })}`;

	return `${streetNumber} ${streetName}, ${city}, ${postcode}, Northern Ireland`;
}

const records: DogRecord[] = [];
const entriesPerRegistry = Math.floor(TOTAL_ENTRIES / REGISTRY_COUNT);

console.log(
	`Generating ${TOTAL_ENTRIES} mock dog records for ${REGISTRY_COUNT} Northern Ireland registries...`,
);

for (let regNum = 1; regNum <= REGISTRY_COUNT; regNum++) {
	const registryName = registryNames[regNum - 1] || `Registry_${regNum}`;

	console.log(
		`Generating data for ${registryName} (${regNum}/${REGISTRY_COUNT})...`,
	);

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
			ownerPhone: generateNIPhoneNumber(),
			ownerEmail: faker.internet.email(),
			ownerCity: generateNorthernIrelandAddress(),
			registeredAt: faker.date.past({ years: 5 }).toISOString(),
			microchipImplantDate: implantDate.toISOString(),
			registryName: registryName,
			vaccinated: faker.datatype.boolean({ probability: 0.85 }),
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
		ownerPhone: generateNIPhoneNumber(),
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
console.log("Generating individual registry files...");
const registryGroups: Record<string, DogRecord[]> = {};

// Safely populate registryGroups
records.forEach((record) => {
	const registryName = record.registryName;
	if (!registryGroups[registryName]) {
		registryGroups[registryName] = [];
	}
	registryGroups[registryName].push(record);
});

// Generate registry files with safe iteration
const registryEntries = Object.entries(registryGroups);
registryEntries.forEach(([registryName, registryRecords], index) => {
	if (registryRecords && Array.isArray(registryRecords)) {
		const registryFileName = path.join(outputDir, `registry-${index + 1}.json`);
		fs.writeFileSync(
			registryFileName,
			JSON.stringify(registryRecords, null, 2),
		);
		console.log(
			`  ${registryName}: ${registryRecords.length} records → ${registryFileName}`,
		);
	}
});

console.log(`✅ Generated ${records.length} mock records to ${OUTPUT_PATH}`);
console.log(
	`✅ Generated ${Object.keys(registryGroups).length} individual registry files`,
);
console.log(`📊 Statistics:`);
console.log(`   Total Dogs: ${records.length}`);
console.log(`   Registries: ${Object.keys(registryGroups).length}`);
console.log(`   Unique Microchips: ${usedIds.size}`);
console.log(
	`   Average per Registry: ${Math.round(records.length / Object.keys(registryGroups).length)}`,
);

// Generate summary report with complete null safety
const validDobDates = records
	.map((r) => {
		const date = new Date(r.dateOfBirth);
		return date.getTime();
	})
	.filter((date) => !isNaN(date) && isFinite(date));

// Build registries info array safely
const registriesInfo: Array<{
	id: number;
	name: string;
	recordCount: number;
	fileName: string;
}> = [];

const safeRegistryEntries = Object.entries(registryGroups);
for (let i = 0; i < safeRegistryEntries.length; i++) {
	const entry = safeRegistryEntries[i];
	if (entry && entry.length >= 2) {
		const [name, recordsArray] = entry;
		registriesInfo.push({
			id: i + 1,
			name: name || `Registry_${i + 1}`,
			recordCount:
				recordsArray && Array.isArray(recordsArray) ? recordsArray.length : 0,
			fileName: `registry-${i + 1}.json`,
		});
	}
}

const summary = {
	totalRecords: records.length,
	generatedAt: new Date().toISOString(),
	registries: registriesInfo,
	breeds: [...new Set(records.map((r) => r.breed || "Unknown"))].sort(),
	dateRange:
		validDobDates.length > 0
			? {
					oldestDogTimestamp: Math.min(...validDobDates),
					youngestDogTimestamp: Math.max(...validDobDates),
					oldestDog: new Date(Math.min(...validDobDates)).toISOString(),
					youngestDog: new Date(Math.max(...validDobDates)).toISOString(),
				}
			: {
					oldestDogTimestamp: null,
					youngestDogTimestamp: null,
					oldestDog: null,
					youngestDog: null,
				},
};

fs.writeFileSync(
	path.join(outputDir, "summary.json"),
	JSON.stringify(summary, null, 2),
);
console.log(
	`📋 Summary report generated: ${path.join(outputDir, "summary.json")}`,
);
