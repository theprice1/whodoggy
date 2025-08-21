// packages/backend/src/controllers/ownerController.ts
import type { Request, Response } from "express";
import { getAllOwnersService, getOwner } from "../services/ownerService.js"; // ✅ .js for ESM compatibility

export const getAllOwners = async (_req: Request, res: Response): Promise<void> => {
  try {
    const owners = await getAllOwnersService();
    res.json(owners);
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOwnerById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const owner = await getOwner(req.params.id);
    if (owner) {
      res.json(owner);
    } else {
      res.status(404).json({ error: "Owner not found" });
    }
  } catch (error) {
    console.error("Error fetching owner by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
