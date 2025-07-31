import { Router, Response } from 'express';
import { deleteMicrochipData } from '../db/deleteMicrochip.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuthMiddleware'; // No extension needed with NodeNext

const router = Router();

/**
 * DELETE /api/microchip/:id
 * Deletes a microchip entry owned by the authenticated user
 */
router.delete(
  '/microchip/:id',
  verifyFirebaseToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.uid;
    const microchipId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: user not authenticated' });
    }

    if (!microchipId || microchipId.length !== 15) {
      return res.status(400).json({ error: 'Invalid or missing microchip ID (expected 15 characters)' });
    }

    try {
      const result = await deleteMicrochipData(userId, microchipId);

      if (!result) {
        return res.status(404).json({ error: 'No matching record found or unauthorized' });
      }

      return res.status(200).json({ message: 'Microchip data deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting microchip:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
