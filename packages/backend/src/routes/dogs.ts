import { Router } from 'express';
import {
  getAllDogsHandler,
  getDogByIdHandler,
  createDogHandler,
  updateDogHandler,
  deleteDogHandler,
} from '../controllers/dogController.js.js';

import { verifyFirebaseToken } from '../middleware/firebaseAuthMiddleware.js.js';
import { validateDogInput } from '../middleware/validateInput.js.js';

const router = Router();

router.get('/', verifyFirebaseToken, getAllDogsHandler);
router.get('/:id', verifyFirebaseToken, getDogByIdHandler);
router.post('/', verifyFirebaseToken, validateDogInput, createDogHandler);
router.put('/:id', verifyFirebaseToken, validateDogInput, updateDogHandler);
router.delete('/:id', verifyFirebaseToken, deleteDogHandler);

export default router;
