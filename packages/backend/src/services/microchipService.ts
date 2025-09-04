import { type MicrochipRecord, mockDatabases } from "../../../../../../../";

export async function getMicrochipData(id: string): Promise<MicrochipRecord[]> {
	const results: MicrochipRecord[] = [];

	for (const db of Object.values(mockDatabases)) {
		const _record = db.find(
			(entry: MicrochipRecord) => entry.microchipId === id,
		);
		if (record) {
			results.push(record);
		}
	}

	return results;
}
