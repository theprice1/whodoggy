// routes/dogs.ts
import express from 'express';
import {
  getDogById,
  createDog,
  updateDog,
  deleteDog,
  getAllDogs
} from '../controllers/dogsController';
const router = express.Router();
router.get('/', getAllDogs);
router.get('/:id', getDogById);
router.post('/', createDog);
router.put('/:id', updateDog);
router.delete('/:id', deleteDog);
export default router;
