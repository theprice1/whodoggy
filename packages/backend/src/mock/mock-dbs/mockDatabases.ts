import fs from "node:fs";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define MicrochipRecord type locally
interface MicrochipRecord {
	microchipId: string;
	dogName: string;
	breed: string;
	gender: string;
	dateOfBirth: string;
	ownerName: string;
	ownerPhone: string;
	ownerEmail: string;
	ownerCity: string;
	registeredAt: string;
	microchipImplantDate: string;
	registryName: string;
	vaccinated: boolean;
	notes?: string;
	lastCheckup?: string;
}

// Fixed path - dogs.json is at src/dogs.json
const _mockDataPath = path.resolve(__dirname, "../../dogs.json");
const _rawData = fs.readFileSync(_mockDataPath, "utf-8");
const allMockRecords: MicrochipRecord[] = JSON.parse(_rawData);

const mockDatabases: { [key: string]: MicrochipRecord[] } = {};

allMockRecords.forEach((record) => {
	if (!mockDatabases[record.registryName]) {
		mockDatabases[record.registryName] = [];
	}
	mockDatabases[record.registryName]?.push(record);
});

const fixedTestRecord: MicrochipRecord = {
	microchipId: "1234567890",
	dogName: "Fido",
	breed: "Labrador",
	gender: "Male",
	dateOfBirth: "2018-01-01T00:00:00.000Z",
	ownerName: "Test Owner",
	ownerPhone: "123-456-7890",
	ownerEmail: "testowner@example.com",
	ownerCity: "Test City",
	registeredAt: "2019-01-01T00:00:00.000Z",
	microchipImplantDate: "2018-06-01T00:00:00.000Z",
	registryName: "TestRegistry",
	vaccinated: true,
	notes: "Test record for unit tests",
	lastCheckup: "2024-01-01T00:00:00.000Z",
};

allMockRecords.push(fixedTestRecord);

if (!mockDatabases[fixedTestRecord.registryName]) {
	mockDatabases[fixedTestRecord.registryName] = [];
}
mockDatabases[fixedTestRecord.registryName]?.push(fixedTestRecord);

export { allMockRecords, fixedTestRecord, mockDatabases };
export type { MicrochipRecord };
