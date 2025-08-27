import express from "express";
import type { Request, Response } from "express";
import { dogService } from "../services/dogService.js";

const router: express.Router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Dog ID is required" });
    }
    const dog = await dogService.getDogById(id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const dogData = req.body;
    if (!dogData || !dogData.name) {
      return res.status(400).json({ error: "Dog data incomplete" });
    }
    const dog = await dogService.createDog(dogData);
    res.status(201).json(dog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export { router as dogsRouter };
