// services/registryService.ts
import db from '../db';
export const getRegistry = async (id: string) => {
  const result = await db.query('SELECT * FROM registries WHERE id = $1', [id]);
  return result.rows[0];
};

export const getAllRegistriesService = async () => {
  const result = await db.query('SELECT * FROM registries');
  return result.rows;
};
