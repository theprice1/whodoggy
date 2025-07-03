import express from 'express';
import microchipRoutes from './microchipRoutes';
import deleteDataRoutes from './deleteData';

const router = express.Router();

// Routes for managing microchip data
router.use('/microchips', microchipRoutes);

// Routes for handling data deletion
router.use('/deleteData', deleteDataRoutes);

export default router;
