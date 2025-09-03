import express from "express";
import { getAllRegistries, getRegistryById } from "..."; // ✅ ESM requires .js

const router: express.Router = express.Router();

router.get("/", getAllRegistries);
router.get("/:id", getRegistryById);

export default router;
