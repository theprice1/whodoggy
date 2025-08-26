// packages/backend/src/services/dogService.ts
import { query } from "../db.js";
import type { DogWithDetails } from "../types/types.js";

export const findDogByMicrochip = async (microchipId: string): Promise<DogWithDetails | null> => {
  const sql = `
    SELECT d.id AS dog_id, d.name AS dog_name, d.breed, d.age,
           o.id AS owner_id, o.name AS owner_name, o.phone, o.email,
           r.id AS registry_id, r.name AS registry_name
    FROM microchips m
    JOIN dogs d ON m.dog_id = d.id
    JOIN owners o ON d.owner_id = o.id
    JOIN registries r ON m.registry_id = r.id
    WHERE m.microchip_id = $1
    LIMIT 1;
  `;

  const results = await query<DogWithDetails>(sql, [microchipId]);

  // Return the first result or null if not found
  // Use nullish coalescing to convert undefined to null
  return results.length > 0 ? (results[0] ?? null) : null;
};
