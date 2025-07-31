// packages/backend/services/dogService.ts
import { query } from '../db.js';

export interface Dog {
  id: string;
  name: string;
  breed: string;
  microchipId: string;
  ownerId: string;
  registryId: string;
}

// Utility to map camelCase to DB snake_case
const mapToDbKey = (key: string): string => {
  switch (key) {
    case 'microchipId': return 'microchip_id';
    case 'ownerId': return 'owner_id';
    case 'registryId': return 'registry_id';
    default: return key;
  }
};

// Get all dogs
export const getAllDogs = async (): Promise<Dog[]> => {
  try {
    const result = await query(`
      SELECT
        id,
        name,
        breed,
        microchip_id AS "microchipId",
        owner_id AS "ownerId",
        registry_id AS "registryId"
      FROM dogs
    `);
    return result.rows as Dog[];
  } catch (err) {
    console.error('[getAllDogs] Error:', err);
    throw err;
  }
};

// Get dog by ID
export const getDogById = async (id: string): Promise<Dog | null> => {
  try {
    const result = await query(`
      SELECT
        id,
        name,
        breed,
        microchip_id AS "microchipId",
        owner_id AS "ownerId",
        registry_id AS "registryId"
      FROM dogs
      WHERE id = $1
    `, [id]);

    return result.rows[0] ?? null;
  } catch (err) {
    console.error(`[getDogById] Error for ID ${id}:`, err);
    throw err;
  }
};

// Get dog by microchip ID
export const getDogByMicrochip = async (microchipId: string): Promise<Dog | null> => {
  try {
    const result = await query(`
      SELECT
        id,
        name,
        breed,
        microchip_id AS "microchipId",
        owner_id AS "ownerId",
        registry_id AS "registryId"
      FROM dogs
      WHERE microchip_id = $1
    `, [microchipId]);

    return result.rows[0] ?? null;
  } catch (err) {
    console.error(`[getDogByMicrochip] Error for microchipId ${microchipId}:`, err);
    throw err;
  }
};

// Create a new dog
export const createDog = async (dogData: Omit<Dog, 'id'>): Promise<Dog> => {
  const { name, breed, microchipId, ownerId, registryId } = dogData;
  try {
    const result = await query(`
      INSERT INTO dogs (name, breed, microchip_id, owner_id, registry_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        name,
        breed,
        microchip_id AS "microchipId",
        owner_id AS "ownerId",
        registry_id AS "registryId"
    `, [name, breed, microchipId, ownerId, registryId]);

    return result.rows[0] as Dog;
  } catch (err) {
    console.error('[createDog] Error creating dog:', err);
    throw err;
  }
};

// Update a dog by ID
export const updateDog = async (
  id: string,
  dogData: Partial<Omit<Dog, 'id'>>
): Promise<Dog | null> => {
  try {
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(dogData).forEach(([key, value], index) => {
      const dbKey = mapToDbKey(key);
      fields.push(`${dbKey} = $${index + 1}`);
      values.push(value);
    });

    if (fields.length === 0) return null;

    values.push(id); // final parameter for WHERE clause

    const result = await query(`
      UPDATE dogs
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING
        id,
        name,
        breed,
        microchip_id AS "microchipId",
        owner_id AS "ownerId",
        registry_id AS "registryId"
    `, values);

    return result.rows[0] ?? null;
  } catch (err) {
    console.error(`[updateDog] Error updating dog ${id}:`, err);
    throw err;
  }
};

// Delete dog by ID
export const deleteDog = async (id: string): Promise<boolean> => {
  try {
    const result = await query('DELETE FROM dogs WHERE id = $1', [id]);
    return result.rowCount > 0;
  } catch (err) {
    console.error(`[deleteDog] Error deleting dog ${id}:`, err);
    throw err;
  }
};
