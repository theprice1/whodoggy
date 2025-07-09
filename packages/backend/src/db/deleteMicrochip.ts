// packages/backend/src/db/deleteMicrochip.ts

import  db  from './index';

export async function deleteMicrochipData(userId: string, microchipId: string): Promise<void> {
  const result = await db.result(
    'DELETE FROM dogs WHERE microchip_id = $1 AND owner_id = $2',
    [microchipId, userId]
  );

  if (result.rowCount === 0) {
    throw new Error('No matching record found or unauthorized');
  }
}
