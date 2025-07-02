// backend/controllers/deleteDataController.ts
import express, { Request, Response } from 'express';

const router = express.Router();

// Middleware assumes req.user is set by your auth middleware
router.delete('/microchips/:id', (req: Request, res: Response) => {
  const userId = (req as any).user?.id; // Cast if needed

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: User not found in request' });
  }

  // Your deletion logic here
  console.log(`Deleting microchip ${req.params.id} for user ${userId}`);

  res.status(200).json({ message: 'Data deletion successful' });
});

export default router;
