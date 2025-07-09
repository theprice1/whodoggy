// packages/backend/src/routes/deleteData.ts

import express from 'express';
import { authenticate } from '../middleware/auth';
import { deleteMicrochipHandler } from '../controllers/deleteDataController';

const router = express.Router();

router.delete('/microchips/:id', authenticate, deleteMicrochipHandler);

export default router;
