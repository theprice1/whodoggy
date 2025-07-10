// services/ownerService.ts
import db from '../db';
export const getOwner = async (id: string) => {
  const result = await db.query('SELECT * FROM owners WHERE id = $1', [id]);
  return result.rows[0];
};

export const getAllOwnersService = async () => {
  const result = await db.query('SELECT * FROM owners');
  return result.rows;
};
