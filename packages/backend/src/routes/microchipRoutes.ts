// packages/backend/src/routes/microchipRoutes.ts
import { Router } from "express";
import { getMicrochipById } from "../controllers/microchipController";

const router = Router();

router.get("/:id", getMicrochipById);

export default router;
