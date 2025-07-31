// packages/backend/routes/deleteDataController.ts

import express from 'express';
import { deleteMicrochipHandler } from '../controllers/deleteDataController.js'; // ✅ Use .ts extension
import { verifyFirebaseToken } from '../middleware/firebaseAuthMiddleware.js';    // ✅ Use .ts extension

const router = express.Router();

// DELETE /api/microchip/:id (protected route)
router.delete('/microchip/:id', verifyFirebaseToken, deleteMicrochipHandler);

export default router;
