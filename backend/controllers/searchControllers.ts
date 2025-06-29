// controllers/searchController.ts
import express, { Request, Response } from 'express';
import { pool } from '../db';

// This controller handles search requests for microchips
// It allows users to search for microchips by their ID
const router = express.Router();

// POST endpoint to search for a microchip by its ID
// Expects a JSON body with the microchip_id field
router.post('/search', async (req: Request, res: Response) => {
  const { microchip_id } = req.body;

  if (!microchip_id) {
    return res.status(400).json({ error: 'microchip_id is required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM microchips WHERE microchip_id = $1',
      [microchip_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Microchip not found' });
    }

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Server error during microchip search' });
  }
});

// Export the router to be used in the main application
// This allows the search functionality to be integrated into the main Express app
export default router;
