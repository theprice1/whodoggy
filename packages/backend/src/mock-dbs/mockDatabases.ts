// apps/backend/src/mock-dbs/mockDatabases.ts

export interface MicrochipRecord {
  id: string;
  name: string;
  breed: string;
  age: number;
  owner: {
    name: string;
    phone: string;
  };
  lastSeen: string;
  databaseName: string;
}

// Sample mock DB data for 3 out of 22 databases

export const mockDatabases: Record<string, MicrochipRecord[]> = {
  MockDB1: [
    {
      id: '1234567890',
      name: 'Fido',
      breed: 'Labrador',
      age: 5,
      owner: { name: 'Jane Doe', phone: '555-1234' },
      lastSeen: '2025-06-30',
      databaseName: 'MockDB1',
    },
    // more records...
  ],
  MockDB2: [
    {
      id: '0987654321',
      name: 'Rex',
      breed: 'German Shepherd',
      age: 3,
      owner: { name: 'John Smith', phone: '555-5678' },
      lastSeen: '2025-06-28',
      databaseName: 'MockDB2',
    },
    // more records...
  ],
  MockDB3: [
    // records here
  ],
  // add more up to MockDB22...
};
