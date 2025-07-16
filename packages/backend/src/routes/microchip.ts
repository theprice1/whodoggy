import express from 'express';
import axios from 'axios';
import { Client } from 'pg'; // For PostgreSQL queries

const router = express.Router();

// PostgreSQL Client Initialization
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'whodoggy',
  password: 'password', // Make sure to set this correctly
  port: 5432,
});

client.connect();

// POST request to get dog data by microchip number
router.post('/microchip', async (req, res) => {
  const { chipId } = req.body; // Extract chip ID from the request body

  if (!chipId) {
    return res.status(400).send({ error: 'Microchip ID is required' });
  }

  try {
    // Query the database for the microchip data
    const result = await client.query(
      'SELECT * FROM microchip_data WHERE microchip_number = $1',
      [chipId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ error: 'Microchip not found' });
    }

    return res.status(200).json(result.rows[0]); // Return dog details
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Database query failed' });
  }
});

export default router;
