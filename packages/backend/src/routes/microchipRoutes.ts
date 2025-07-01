// apps/backend/src/routes/microchipRoutes.ts
import { Router } from 'express';
import { searchMicrochip } from '../controllers/microchipController';

const router = Router();

router.get('/microchips/:id', searchMicrochip);

export default router;
