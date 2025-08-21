// packages/backend/src/db/deleteMicrochip.ts

import { db } from "./index.js";

/**
 * Deletes a microchip record belonging to a specific user.
 * @param userId - The Firebase UID of the owner
 * @param microchipId - The 15-digit microchip ID to delete
 * @returns number of rows deleted (0 if none)
 */
export async function deleteMicrochipData(userId: string, microchipId: string): Promise<number> {
  const result = await db.result("DELETE FROM dogs WHERE microchip_id = $1 AND owner_id = $2", [
    microchipId,
    userId,
  ]);

  return result.rowCount; // ✅ Return number of rows affected
}
