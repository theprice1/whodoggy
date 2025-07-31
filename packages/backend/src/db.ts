// src/db.ts
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

export const db = pgp({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'whodoggy',
  user: process.env.DB_USER || 'your_username',      // Replace with your default username or set env var
  password: process.env.DB_PASSWORD || 'your_password', // Replace with your default password or set env var
});

// Optional: function to close the connection pool gracefully
export async function shutdownDbPool(): Promise<void> {
  await pgp.end();
}
