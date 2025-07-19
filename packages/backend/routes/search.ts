import { Router } from 'express';
import { searchDogByMicrochip } from '../controllers/searchController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateSearchInput } from '../middleware/validateInput.js';

const router = Router();

// POST /api/search
// Middleware: auth -> validate input -> controller
router.post('/', authMiddleware, validateSearchInput, searchDogByMicrochip);

export default router;
