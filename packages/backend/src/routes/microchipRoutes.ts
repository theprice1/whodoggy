// packages/backend/src/routes/microchipRoutes.ts

import { Router } from "express";
import { _getMicrochipById as getMicrochipById } from "../controllers/microchipController.js";

const router: Router = Router();

router.get("/:id", getMicrochipById);

export default router;
