import { mockDatabases } from '../mock-dbs/mockDatabases';

export async function getMicrochipData(microchipId: string) {
  // Simulate async database lookups
  const results = [];

  for (const db of mockDatabases) {
    const record = db.find((entry) => entry.microchipId === microchipId);
    if (record) results.push(record);
  }

  return results;
}
