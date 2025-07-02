import express from 'express';
import microchipRoutes from './microchipRoutes';
import deleteDataRoutes from './deleteData';

const router = express.Router();

router.use('/microchips', microchipRoutes);
router.use('/deleteData', deleteDataRoutes);

export default router;
