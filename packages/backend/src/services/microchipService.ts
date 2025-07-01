// src/services/microchipService.ts
export interface MicrochipRecord {
  id: string;
  name: string;
  breed: string;
  owner: { name: string; phone: string };
  lastSeen: string;
  databaseName?: string;
}

// Example mock DB
const mockDatabases: Record<string, MicrochipRecord[]> = {
  MockDB1: [
    {
      id: '1234567890',
      name: 'Fido',
      breed: 'Labrador',
      owner: { name: 'Jane Doe', phone: '555-1234' },
      lastSeen: '2025-06-30',
      databaseName: 'MockDB1',
    },
    // more records ...
  ],
  // Add more databases...
};

export async function getMicrochipData(id: string): Promise<MicrochipRecord[]> {
  const results: MicrochipRecord[] = [];
  for (const dbName in mockDatabases) {
    const found = mockDatabases[dbName].find(record => record.id === id);
    if (found) results.push(found);
  }
  return results;
}
