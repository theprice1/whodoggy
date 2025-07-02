import express from 'express';
import { authenticate } from '../middleware/auth';
import { getMicrochipData } from '../services/microchipService';

const router = express.Router();

router.get('/:id', authenticate, async (req, res) => {
  const microchipId = req.params.id;
  const results = await getMicrochipData(microchipId);

  if (!results.length) {
    return res.status(404).json({ message: 'Microchip ID not found in any database' });
  }

  res.json({ results });
});

export default router;
