// src/routes/microchipRoutes.ts

import express from 'express';
import { getMicrochipById } from '../controllers/microchipController';

const router = express.Router();

router.get('/:id', getMicrochipById);

export default router;
