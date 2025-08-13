// packages/backend/src/routes/index.ts

import express from 'express';
import microchipRoutes from './microchipRoutes.js';
import deleteDataRoutes from './deleteData.js';

const router = express.Router();

router.use('/microchips', microchipRoutes);
router.use('/deleteData', deleteDataRoutes);

export default router;
