// packages/backend/src/controllers/microchipController.ts
import type { Request, Response } from "express";
import { query } from "../db";

export async function getMicrochipById(req: Request, res: Response): Promise<void> {
  const microchipId = (req.params.id || "").trim();

  if (!microchipId) {
    res.status(400).json({ error: "Microchip ID is required" });
    return;
  }

  try {
    const rows = await query("SELECT * FROM dogs WHERE microchip_id = $1 LIMIT 1", [microchipId]);

    if (rows.length === 0) {
      res.status(404).json({ error: "Microchip not found" });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("DB query error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
