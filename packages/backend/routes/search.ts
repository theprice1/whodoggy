// routes/search.ts
import express from 'express';
import { searchDogByChip } from '../controllers/searchController';
const router = express.Router();
router.post('/', searchDogByChip);
export default router;
