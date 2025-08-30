// packages/backend/src/routes/microchipRoutes.ts
import { Router } from "express";
import { getMicrochipById } from "../controllers/microchipController.js";

const router: Router = Router();

router.get("/:id", getMicrochipById);

export default router;
