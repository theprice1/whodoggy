// packages/backend/src/routes/index.ts
import express from "express";
import deleteDataRoutes from "./deleteData.js";
import dogsRoutes from "./dogs.js";
import microchipRoutes from "./microchipRoutes.js";

const router: express.Router = express.Router();

router.use("/microchips", microchipRoutes);
router.use("/deleteData", deleteDataRoutes);
router.use("/dogs", dogsRoutes);

export default router;
