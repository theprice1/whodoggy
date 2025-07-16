// packages/backend/services/dogService.ts
import { query } from '../db';

export interface Dog {
  id: string;
  name: string;
  breed: string;
  microchipId: string;
  ownerId: string;
  registryId: string;
}

// Get dog by microchip ID from local DB
export const getDogByMicrochip = async (microchipId: string): Promise<Dog | null> => {
  try {
    const result = await query(
      'SELECT id, name, breed, microchip_id AS "microchipId", owner_id AS "ownerId", registry_id AS "registryId" FROM dogs WHERE microchip_id = $1',
      [microchipId]
    );

    if (result.rows.length === 0) return null;
    return result.rows[0] as Dog;
  } catch (err) {
    console.error('Error fetching dog by microchip:', err);
    throw err;
  }
};

// Optional: Add more CRUD operations here as needed
