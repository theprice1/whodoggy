import { Router } from 'express';
import { searchDogByMicrochip } from '../controllers/searchController.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuthMiddleware.js';
import { validateSearchInput } from '../middleware/validateInput.js';

const router = Router();

// POST /api/search
// Middleware: auth -> validate input -> controller
router.post('/', verifyFirebaseToken, validateSearchInput, searchDogByMicrochip);

export default router;
