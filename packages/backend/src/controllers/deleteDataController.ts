import express, { Request, Response } from 'express';
import { deleteMicrochipData } from '../db/deleteMicrochip';
import { AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

async function deleteMicrochipHandler(req: AuthenticatedRequest, res: Response) {
  const userId = req.user?.uid;
  const microchipId = req.params.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: user not authenticated' });
  }

  try {
    await deleteMicrochipData(userId, microchipId);
    res.status(200).json({ message: 'Microchip data deleted successfully' });
  } catch (error: any) {
    if (error.message === 'No matching record found or unauthorized') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Error deleting microchip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

router.delete('/microchip/:id', deleteMicrochipHandler);

export default router;
