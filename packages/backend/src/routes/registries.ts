import {
  _getAllRegistries as getAllRegistries,
  _getRegistryById as getRegistryById
} from "../controllers/registriesController.js"; // ✅ ESM requires .js
import express from "express";

const router: express.Router = express.Router();

router.get("/", getAllRegistries);
router.get("/:id", getRegistryById);

export default router;
