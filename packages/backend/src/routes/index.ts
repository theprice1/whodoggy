import express from 'express';
import microchipRoutes from './microchipRoutes';
import deleteDataRoutes from './deleteData';

const router = express.Router();

/**
 * Mount all route modules
 *
 * /api/microchips     → Microchip-related endpoints
 * /api/deleteData     → Data deletion/testing endpoints
 */
router.use('/microchips', microchipRoutes);
router.use('/deleteData', deleteDataRoutes);

export default router;
