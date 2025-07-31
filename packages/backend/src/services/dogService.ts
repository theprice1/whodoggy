// src/services/dogService.ts
import { db } from '../db.js';
import { DogWithDetails } from '../types/types.js';

export const findDogByMicrochip = async (
  microchipId: string
): Promise<DogWithDetails | null> => {
  const query = `
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

  const result = (await db.oneOrNone(query, [
    microchipId,
  ])) as DogWithDetails | null;

  return result;
};
