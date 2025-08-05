// packages/backend/src/routes/deleteData.ts

import express from 'express';
import { authenticate } from '../middleware/auth.js'; // ✅ Use .js for ESM compatibility
import deleteMicrochipHandler from '../controllers/deleteDataController.js'; // ✅ Assuming default export

const router = express.Router();

router.delete('/microchips/:id', authenticate, deleteMicrochipHandler);

export default router;
