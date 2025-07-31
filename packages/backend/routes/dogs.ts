// packages/backend/routes/dogs.ts

import { Router } from 'express';
import {
  getAllDogsHandler,
  getDogByIdHandler,
  createDogHandler,
  updateDogHandler,
  deleteDogHandler,
} from '../controllers/dogsController.js';

// ✅ Use correct auth middleware (Firebase) from your actual middleware file
import { verifyFirebaseToken } from '../middleware/firebaseAuthMiddleware.js';

// ✅ ValidateDogInput should match your Zod middleware for dog data
import { validateDogInput } from '../middleware/validateInput.js';

const router = Router();

// 🛡️ Auth-protect all endpoints with Firebase token verification
// ✅ Apply validation only where body data is used (POST/PUT)

router.get('/', verifyFirebaseToken, getAllDogsHandler);
router.get('/:id', verifyFirebaseToken, getDogByIdHandler);
router.post('/', verifyFirebaseToken, validateDogInput, createDogHandler);
router.put('/:id', verifyFirebaseToken, validateDogInput, updateDogHandler);
router.delete('/:id', verifyFirebaseToken, deleteDogHandler);

export default router;
