import {
	type MicrochipRecord,
	mockDatabases,
} from "../mock/mock-dbs/mockDatabases.js";

export async function getMicrochipData(id: string): Promise<MicrochipRecord[]> {
	const results: MicrochipRecord[] = [];

	for (const db of Object.values(mockDatabases)) {
		const _record = (db as MicrochipRecord[]).find(
			(entry: MicrochipRecord) => entry.microchipId === id,
		);
		if (_record) {
			results.push(_record);
		}
	}

	return results;
}
