// src/routes/dogs.ts
import express from "express";
import {
	getDogs,
	getDogById,
	getDogByMicrochipId,
	createDog,
	updateDog,
	deleteDog,
} from "...";

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
