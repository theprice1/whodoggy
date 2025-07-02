import express from 'express';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.delete('/:id', authenticate, async (req, res) => {
  // Implement deletion logic here
  res.json({ message: 'Data deletion successful' });
});

export default router;
