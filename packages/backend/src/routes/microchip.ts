// packages/backend/src/routes/microchip.ts

import express, { Request, Response } from 'express';
import { Client } from 'pg'; // For PostgreSQL queries

const router: express.Router = express.Router();

// PostgreSQL Client Initialization
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'whodoggy',
  password: 'password', // Update with your actual password or use environment variables
  port: 5432,
});

client.connect().catch((err) => {
  console.error('Failed to connect to PostgreSQL:', err);
});

// POST /microchip - Get dog data by microchip number
router.post('/microchip', async (req: Request, res: Response) => {
  const { chipId } = req.body;

  if (!chipId) {
    return res.status(400).json({ error: 'Microchip ID is required' });
  }

  try {
    const result = await client.query(
      'SELECT * FROM microchip_data WHERE microchip_number = $1',
      [chipId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Microchip not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err);
    return res.status(500).json({ error: 'Database query failed' });
  }
});

export default router;
