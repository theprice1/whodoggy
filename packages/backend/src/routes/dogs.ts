// src/routes/dogs.ts

import {
  _createDog as createDog,
  _deleteDog as deleteDog,
  _getDogById as getDogById,
  _getDogByMicrochipId as getDogByMicrochipId,
  _getDogs as getDogs,
  _updateDog as updateDog,
} from "../controllers/dogController.js";
import express from "express";

const router: express.Router = express.Router();

// GET /dogs - Get all dogs (with optional search and filter)
router.get("/", getDogs);

// GET /dogs/:id - Get dog by ID
router.get("/:id", getDogById);

// GET /dogs/microchip/:microchipId - Get dog by microchip ID
router.get("/microchip/:microchipId", getDogByMicrochipId);

// POST /dogs - Create a new dog
router.post("/", createDog);

// PUT /dogs/:id - Update a dog
router.put("/:id", updateDog);

// DELETE /dogs/:id - Delete a dog
router.delete("/:id", deleteDog);

export default router;
