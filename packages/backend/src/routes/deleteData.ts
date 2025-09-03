// packages/backend/src/routes/deleteData.ts

import express from "express";
import deleteMicrochipHandler from "../controllers/deleteDataController.js"; // ✅ Assuming default export
import { authenticate } from "..."; // ✅ Use .js for ESM compatibility

const router: express.Router = express.Router();

router.delete("/microchips/:id", authenticate, deleteMicrochipHandler);

export default router;
