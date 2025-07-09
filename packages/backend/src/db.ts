// src/db.ts
import { Pool, QueryResultRow } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  // Optional: Exit process on fatal DB errors
  process.exit(1);
});

/**
 * Query helper function for PostgreSQL.
 * Reuses pool connections and releases automatically.
 * @param text SQL query text
 * @param params Query parameters array
 * @returns Query rows typed as T[]
 */
export async function query<T extends QueryResultRow>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query<T>(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

/**
 * Gracefully shutdown DB pool on app termination.
 */
export async function shutdownDbPool() {
  await pool.end();
}

export default pool;
