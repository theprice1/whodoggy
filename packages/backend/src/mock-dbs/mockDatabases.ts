import { MicrochipRecord } from './types.js';
import fs from 'fs';
import path from 'path';

// Existing loading of mock data
const mockDataPath = path.resolve(__dirname, '../../mock_data/dogs.json'); // Adjust the path as necessary
const rawData = fs.readFileSync(mockDataPath, 'utf-8');
const allMockRecords: MicrochipRecord[] = JSON.parse(rawData);

// Group by registryName
const mockDatabases: Record<string, MicrochipRecord[]> = {};
allMockRecords.forEach((record) => {
  if (!mockDatabases[record.registryName]) {
    mockDatabases[record.registryName] = [];
  }
  mockDatabases[record.registryName].push(record);
});

// Add a fixed test record for unit tests
const fixedTestRecord: MicrochipRecord = {
  microchipId: '1234567890',
  dogName: 'Fido',
  breed: 'Labrador',
  gender: 'Male',
  dateOfBirth: '2018-01-01T00:00:00.000Z',
  ownerName: 'Test Owner',
  ownerPhone: '123-456-7890',
  ownerEmail: 'testowner@example.com',
  ownerCity: 'Test City',
  registeredAt: '2019-01-01T00:00:00.000Z',
  microchipImplantDate: '2018-06-01T00:00:00.000Z',
  registryName: 'TestRegistry',
  vaccinated: true,
  notes: 'Test record for unit tests',
  lastCheckup: '2024-01-01T00:00:00.000Z',
};

// Add fixed record to allMockRecords and grouped mockDatabases
allMockRecords.push(fixedTestRecord);
if (!mockDatabases[fixedTestRecord.registryName]) {
  mockDatabases[fixedTestRecord.registryName] = [];
}
mockDatabases[fixedTestRecord.registryName].push(fixedTestRecord);

export { MicrochipRecord, mockDatabases, allMockRecords };
