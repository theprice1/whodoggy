import { Pool, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

// PostgreSQL connection pool
export const pool = new Pool({ connectionString });

// Generic query helper
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const res: QueryResult<T> = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}

// Graceful shutdown
export async function shutdownPool() {
  await pool.end();
}
