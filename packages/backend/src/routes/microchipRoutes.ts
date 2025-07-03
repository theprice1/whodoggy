// src/routes/microchipRoutes.ts

import express from 'express';
import { getMicrochipById } from '../controllers/microchipController';

const router = express.Router();

// Define the route to get a microchip by ID
router.get('/:id', getMicrochipById);

export default router;
