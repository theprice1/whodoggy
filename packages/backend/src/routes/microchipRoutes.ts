// packages/backend/src/routes/microchipRoutes.ts

import express from 'express';
import { getMicrochipById } from '../controllers/dogController.js';

const router = express.Router();

/**
 * GET /microchips/:id
 * Route to retrieve a single dog record by microchip ID.
 */
router.get('/:id', getMicrochipById);

export default router;
