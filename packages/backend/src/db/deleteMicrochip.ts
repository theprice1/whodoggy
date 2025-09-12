// packages/backend/src/db/deleteMicrochip.ts
import { db } from "./index.js";

/**
 * Deletes a microchip record from the WhoDoggy database.
 * Used when removing a dog registration from the system.
 * @param userId - The Firebase UID of the owner
 * @param microchipId - The 15-digit microchip ID to delete
 * @returns number of rows deleted (0 if none found)
 */
export async function deleteMicrochipData(
	userId: string,
	microchipId: string,
): Promise<number> {
	try {
		const result = await db.result(
			"DELETE FROM dogs WHERE microchip_id = $1 AND owner_email = $2",
			[microchipId, userId],
		);

		console.log(
			`Deleted ${result.rowCount} microchip record(s) for chip ${microchipId}`,
		);
		return result.rowCount; // Return number of rows affected
	} catch (error) {
		console.error(`Error deleting microchip ${microchipId}:`, error);
		throw error;
	}
}

/**
 * Deletes a microchip record by microchip ID only (admin function)
 * @param microchipId - The 15-digit microchip ID to delete
 * @returns number of rows deleted (0 if none found)
 */
export async function deleteMicrochipById(
	microchipId: string,
): Promise<number> {
	try {
		const result = await db.result("DELETE FROM dogs WHERE microchip_id = $1", [
			microchipId,
		]);

		console.log(
			`Admin deleted ${result.rowCount} microchip record(s) for chip ${microchipId}`,
		);
		return result.rowCount;
	} catch (error) {
		console.error(`Error deleting microchip ${microchipId}:`, error);
		throw error;
	}
}

/**
 * Soft delete - marks a microchip record as inactive instead of deleting
 * Useful for maintaining audit trails in the registry
 * @param userId - The Firebase UID of the owner
 * @param microchipId - The 15-digit microchip ID to deactivate
 * @returns number of rows updated (0 if none found)
 */
export async function deactivateMicrochip(
	userId: string,
	microchipId: string,
): Promise<number> {
	try {
		const result = await db.result(
			`UPDATE dogs
			 SET updated_at = NOW(),
			     notes = COALESCE(notes, '') || ' [DEACTIVATED by owner]'
			 WHERE microchip_id = $1 AND owner_email = $2`,
			[microchipId, userId],
		);

		console.log(
			`Deactivated ${result.rowCount} microchip record(s) for chip ${microchipId}`,
		);
		return result.rowCount;
	} catch (error) {
		console.error(`Error deactivating microchip ${microchipId}:`, error);
		throw error;
	}
}

/**
 * Removes a dog from a specific registry (for cross-registry management)
 * @param microchipId - The 15-digit microchip ID
 * @param registryId - The ID of the registry to remove from
 * @returns number of rows deleted
 */
export async function removeFromRegistry(
	microchipId: string,
	registryId: number,
): Promise<number> {
	try {
		const result = await db.result(
			"DELETE FROM dogs WHERE microchip_id = $1 AND registry_id = $2",
			[microchipId, registryId],
		);

		console.log(
			`Removed chip ${microchipId} from registry ${registryId}, affected ${result.rowCount} records`,
		);
		return result.rowCount;
	} catch (error) {
		console.error(
			`Error removing microchip ${microchipId} from registry ${registryId}:`,
			error,
		);
		throw error;
	}
}

/**
 * Batch delete multiple microchips for cleanup operations
 * @param microchipIds - Array of microchip IDs to delete
 * @returns number of total rows deleted
 */
export async function batchDeleteMicrochips(
	microchipIds: string[],
): Promise<number> {
	if (microchipIds.length === 0) {
		return 0;
	}

	try {
		const placeholders = microchipIds
			.map((_, index) => `$${index + 1}`)
			.join(",");
		const result = await db.result(
			`DELETE FROM dogs WHERE microchip_id IN (${placeholders})`,
			microchipIds,
		);

		console.log(`Batch deleted ${result.rowCount} microchip records`);
		return result.rowCount;
	} catch (error) {
		console.error(`Error batch deleting microchips:`, error);
		throw error;
	}
}
