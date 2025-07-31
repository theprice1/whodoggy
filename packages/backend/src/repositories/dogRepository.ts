import db from '../db.js';

export async function findDogByMicrochipId(microchipId: string) {
  const result = await db.query(
    `SELECT d.*, o.name as owner_name, r.name as registry_name
     FROM dogs d
     LEFT JOIN owners o ON d.owner_id = o.id
     LEFT JOIN registries r ON d.registry_id = r.id
     WHERE d.microchip_id = $1`,
    [microchipId]
  );
  return result.rows[0] || null;
}
