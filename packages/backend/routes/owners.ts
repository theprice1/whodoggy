import { Router } from 'express';
import { getAllOwners, getOwnerById } from '../controllers/ownersController';

const router = Router();

router.get('/', getAllOwners);
router.get('/:id', getOwnerById);

export default router;
