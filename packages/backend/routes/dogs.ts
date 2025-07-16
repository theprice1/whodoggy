import { Router } from 'express';
import {
  getAllDogsHandler,
  getDogByIdHandler,
  createDogHandler,
  updateDogHandler,
  deleteDogHandler,
} from '../controllers/dogsController';

import { authMiddleware } from '../middleware/authMiddleware';
import { validateDogInput } from '../middleware/validateInput';

const router = Router();

router.get('/', authMiddleware, getAllDogsHandler);
router.get('/:id', authMiddleware, getDogByIdHandler);
router.post('/', authMiddleware, validateDogInput, createDogHandler);
router.put('/:id', authMiddleware, validateDogInput, updateDogHandler);
router.delete('/:id', authMiddleware, deleteDogHandler);

export default router;
