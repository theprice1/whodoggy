import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL environment variable');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
});

// Better error logging with stack trace, optional graceful shutdown
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err.stack ?? err);
  process.exit(1); // exit with failure code
});

type QueryParams = Array<string | number | boolean | null>;

export const query = (
  text: string,
  params?: QueryParams
): Promise<QueryResult> => pool.query(text, params);

export const queryRows = async <T = any>(
  text: string,
  params?: QueryParams
): Promise<T[]> => {
  const result = await pool.query(text, params);
  return result.rows;
};

export { pool };
