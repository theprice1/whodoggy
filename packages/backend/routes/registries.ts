// routes/registries.ts
import express from 'express';
import {
  getRegistryById,
  getAllRegistries,
} from '../controllers/registriesController.js';
const router = express.Router();
router.get('/', getAllRegistries);
router.get('/:id', getRegistryById);
export default router;
