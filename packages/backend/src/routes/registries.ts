import express from 'express';
import {
  getRegistryById,
  getAllRegistries,
} from '../controllers/registriesController.js'; // ✅ ESM requires .js

const router: express.Router = express.Router();

router.get('/', getAllRegistries);
router.get('/:id', getRegistryById);

export default router;
