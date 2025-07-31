// packages/backend/src/routes/deleteData.ts

import express from 'express';
import { authenticate } from '../middleware/auth.js'; // Confirm this middleware exists and exports 'authenticate'
// If deleteMicrochipHandler is a default export, import without {}
import deleteMicrochipHandler from '../controllers/deleteDataController.js';

const router = express.Router();

router.delete('/microchips/:id', authenticate, deleteMicrochipHandler);

export default router;
