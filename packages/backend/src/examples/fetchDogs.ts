// src/examples/fetchDogs.ts
import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function fetchDogs() {
  try {
    const res = await pool.query('SELECT id, name, breed, microchip_id FROM dogs LIMIT 10;');
    console.log('Dogs:', res.rows);
  } catch (error) {
    console.error('Error querying dogs:', error);
  } finally {
    await pool.end();
  }
}

fetchDogs();
