// packages/backend/src/services/ownerService.ts
import { query } from '../db.js';
import type { Owner } from '../types/types.js';

export const getOwner = async (id: string): Promise<Owner | null> => {
  try {
    const results = await query<Owner>(
      'SELECT id, name, email, phone FROM owners WHERE id = $1',
      [id]
    );
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error('Error fetching owner by id:', err);
    throw err;
  }
};

export const getAllOwnersService = async (): Promise<Owner[]> => {
  try {
    const results = await query<Owner>('SELECT id, name, email, phone FROM owners');
    return results;
  } catch (err) {
    console.error('Error fetching all owners:', err);
    throw err;
  }
};
