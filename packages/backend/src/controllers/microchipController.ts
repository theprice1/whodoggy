// packages/backend/src/controllers/microchipController.ts
import type { Request, Response } from "express";

// Mock database of microchips — update as needed to match real schema
const mockMicrochips = [
  { microchipId: "1", name: "Dog A", breed: "Labrador" },
  { microchipId: "2", name: "Dog B", breed: "Beagle" },
];

// Controller for getting a microchip by ID
export async function getMicrochipById(req: Request, res: Response): Promise<void> {
  const microchipId = (req.params.id || "").trim();

  if (!microchipId) {
    res.status(400).json({ error: "Microchip ID is required" });
    return;
  }

  // Simulate async operation (e.g., DB lookup or external API call)
  const microchip = mockMicrochips.find((m) => m.microchipId === microchipId);

  if (!microchip) {
    res.status(404).json({ error: "Microchip not found" });
    return;
  }

  res.status(200).json(microchip);
}
