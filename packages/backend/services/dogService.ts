import { query } from '../db';

export type Dog = {
  id: string;
  microchip_id: string;
  name: string;
  owner: string;
  registry: string;
};

// Fetch all dogs
export async function getAllDogs(): Promise<Dog[]> {
  const result = await query('SELECT * FROM dogs');
  return result.rows;
}

// Fetch one dog by ID
export async function getDogById(id: string): Promise<Dog | null> {
  const result = await query('SELECT * FROM dogs WHERE id = $1', [id]);
  return result.rows[0] || null;
}

// Create new dog
export async function createDog(data: Omit<Dog, 'id'>): Promise<Dog> {
  const { microchip_id, name, owner, registry } = data;
  const result = await query(
    `INSERT INTO dogs (microchip_id, name, owner, registry)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [microchip_id, name, owner, registry]
  );
  return result.rows[0];
}

// Update dog by ID
export async function updateDog(id: string, data: Partial<Omit<Dog, 'id'>>): Promise<Dog | null> {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key in data) {
    fields.push(`${key} = $${idx++}`);
    values.push(data[key as keyof typeof data]);
  }

  if (fields.length === 0) return null;

  values.push(id);
  const sql = `UPDATE dogs SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await query(sql, values);
  return result.rows[0] || null;
}

// Delete dog by ID
export async function deleteDog(id: string): Promise<boolean> {
  const result = await query('DELETE FROM dogs WHERE id = $1', [id]);
  return result.rowCount > 0;
}
