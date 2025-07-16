// packages/backend/routes/deleteDataController.ts

import express from 'express';
import { deleteMicrochipHandler } from '../controllers/deleteDataController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.delete('/microchip/:id', authMiddleware, deleteMicrochipHandler);

export default router;
