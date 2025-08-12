// packages/backend/src/services/ownerService.ts
import { db } from '../db.js.js';
import type { Owner } from '../types/types.js.js';

export const getOwner = async (id: string): Promise<Owner | null> => {
  try {
    const result = await db.any('SELECT id, name, email, phone FROM owners WHERE id = $1', [id]);
    if (result.length === 0) return null;
    return result[0] as Owner;
  } catch (err) {
    console.error('Error fetching owner by id:', err);
    throw err;
  }
};

export const getAllOwnersService = async (): Promise<Owner[]> => {
  try {
    const results = await db.any('SELECT id, name, email, phone FROM owners');
    return results as Owner[];
  } catch (err) {
    console.error('Error fetching all owners:', err);
    throw err;
  }
};
