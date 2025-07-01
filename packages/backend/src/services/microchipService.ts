// apps/backend/src/services/microchipService.ts
import { mockDatabases, MicrochipRecord } from '../mock-dbs/mockDatabases';

export const searchAllDatabases = (chipId: string): MicrochipRecord[] => {
  const results: MicrochipRecord[] = [];
  for (const dbName in mockDatabases) {
    const dbRecords = mockDatabases[dbName];
    const found = dbRecords.find((record) => record.id === chipId);
    if (found) {
      results.push(found);
    }
  }
  return results;
};
