// src/repositories/dogRepository.ts
import { query } from '../db';

export interface DogRecord {
  microchipId: string;
  dogName: string;
  breed: string;
  ownerName: string;
  contact: string;
  registeredAt: string;
  registryName: string;
  vaccinated: boolean;
  notes?: string;
  lastCheckup?: string;
}

export async function findDogByMicrochip(microchipId: string): Promise<DogRecord | null> {
  const sql = `
    SELECT microchip_id AS "microchipId",
           dog_name AS "dogName",
           breed,
           owner_name AS "ownerName",
           contact,
           registered_at AS "registeredAt",
           registry_name AS "registryName",
           vaccinated,
           notes,
           last_checkup AS "lastCheckup"
    FROM dogs
    WHERE microchip_id = $1
    LIMIT 1;
  `;
  const results = await query<DogRecord>(sql, [microchipId]);
  return results.length > 0 ? results[0] : null;
}
