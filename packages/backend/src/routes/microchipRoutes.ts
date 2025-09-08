// packages/backend/src/routes/microchipRoutes.ts
import { _getMicrochipById as getMicrochipById } from "../controllers/microchipController.js";
import { Router } from "express";

const router: Router = Router();

router.get("/:id", getMicrochipById);

export default router;
