import { Router } from 'express';
import { searchMicrochip } from '../controllers/searchController';
import { validateMicrochipId } from '../middleware/validateInput'; // optional, if you have this middleware
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// POST /api/search
// Middleware order: auth -> validate input -> controller
router.post('/', authMiddleware, validateMicrochipId, searchMicrochip);

export default router;
