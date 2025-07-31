// packages/backend/services/ownerService.ts
import { query } from '../db.js';

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

// Get owner by ID
export const getOwnerById = async (id: string): Promise<Owner | null> => {
  try {
    const result = await query('SELECT id, name, email, phone FROM owners WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0] as Owner;
  } catch (err) {
    console.error('Error fetching owner by id:', err);
    throw err;
  }
};

// Optional: Add more CRUD operations here as needed
