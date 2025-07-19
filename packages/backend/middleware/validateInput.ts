// validateInput.ts
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const microchipSchema = z.object({
  microchipId: z.string().length(15), // adjust as needed
});

export const validateSearchInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    microchipSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.errors });
  }
};
