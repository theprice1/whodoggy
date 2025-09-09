// packages/backend/src/db/client.ts - PostgreSQL client for WhoDoggy
import { Pool, type PoolClient, type QueryResult } from 'pg';
import path from "node:path";
import dotenv from "dotenv";

// Always resolve based on this file's actual directory
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Validate required environment variables
const requiredEnvVars = ['PGHOST', 'PGUSER', 'PGDATABASE', 'PGPASSWORD', 'PGPORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

export const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
  // Additional pool configuration for WhoDoggy
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
});

// Pool event handlers for monitoring
pool.on('connect', (client: PoolClient) => {
  console.log('New client connected to PostgreSQL');
});

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Helper functions for WhoDoggy operations

/**
 * Execute a query with automatic connection handling
 * @param text SQL query string
 * @param params Query parameters
 * @returns Query result
 */
export async function query(text: string, params?: any[]): Promise<QueryResult> {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    if (duration > 100) {
      console.log('Slow query detected:', { text, duration: `${duration}ms`, rows: res.rowCount });
    }

    return res;
  } catch (error) {
    console.error('Database query error:', { text, params, error });
    throw error;
  }
}

/**
 * Get a client from the pool for transactions
 * @returns Database client
 */
export async function getClient(): Promise<PoolClient> {
  try {
    return await pool.connect();
  } catch (error) {
    console.error('Error getting database client:', error);
    throw error;
  }
}

/**
 * Execute multiple queries in a transaction
 * @param callback Function containing the transaction logic
 * @returns Transaction result
 */
export async function transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getClient();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Test database connection
 * @returns Promise that resolves when connection is successful
 */
export async function testConnection(): Promise<void> {
  try {
    const result = await query('SELECT NOW() as current_time, version() as pg_version');
    console.log('Database connection successful');
    console.log('Database time:', result.rows[0]?.current_time);
    console.log('PostgreSQL version:', result.rows[0]?.pg_version);
  } catch (error) {
    console.error('Database connection test failed:', error);
    throw error;
  }
}

/**
 * WhoDoggy specific: Search for dog by microchip across all registries
 * @param microchipId The microchip ID to search for
 * @returns Dog record with registry information
 */
export async function findDogByMicrochip(microchipId: string): Promise<any> {
  const result = await query(
    `SELECT d.*, r.name as registry_name, r.country, r.contact
		 FROM dogs d
		 JOIN registries r ON d.registry_id = r.id
		 WHERE d.microchip_id = $1`,
    [microchipId]
  );

  return result.rows[0] || null;
}

/**
 * WhoDoggy specific: Get all registries with dog counts
 * @returns Array of registries with statistics
 */
export async function getRegistriesWithCounts(): Promise<any[]> {
  const result = await query(
    `SELECT r.*, COUNT(d.id) as dog_count
		 FROM registries r
		 LEFT JOIN dogs d ON r.id = d.registry_id
		 GROUP BY r.id
		 ORDER BY r.name`
  );

  return result.rows;
}

/**
 * Gracefully close the database pool
 * @returns Promise that resolves when pool is closed
 */
export async function closePool(): Promise<void> {
  try {
    await pool.end();
    console.log('Database pool closed');
  } catch (error) {
    console.error('Error closing database pool:', error);
    throw error;
  }
}

// Graceful shutdown handlers
process.on('SIGINT', async () => {
  console.log('Received SIGINT, closing database pool...');
  await closePool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, closing database pool...');
  await closePool();
  process.exit(0);
});

// If run directly, test the connection
if (require.main === module) {
  testConnection()
    .then(() => console.log('Database client test completed'))
    .catch((error) => {
      console.error('Database client test failed:', error);
      process.exit(1);
    });
}
