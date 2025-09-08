// packages/backend/src/routes/deleteData.ts

import { authenticate } from "../middleware/auth.js"; //
import express from "express";
import deleteMicrochipHandler from "../controllers/deleteDataController.js"; //

const router: express.Router = express.Router();

router.delete("/microchips/:id", authenticate, deleteMicrochipHandler);

export default router;
