// packages/backend/src/routes/deleteData.ts

import express from 'express';
import { authenticate } from '../middleware/auth.js.js'; // ✅ Use .js for ESM compatibility
import deleteMicrochipHandler from '../controllers/deleteDataController.js.js'; // ✅ Assuming default export

const router = express.Router();

router.delete('/microchips/:id', authenticate, deleteMicrochipHandler);

export default router;
