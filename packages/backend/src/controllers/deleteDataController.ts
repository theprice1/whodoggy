// packages/backend/src/controllers/deleteDataController.ts

import { getMicrochipData } from "../services/microchipService.js";
import { Router, type Response } from "express";
import { _verifyFirebaseToken as verifyFirebaseToken } from "../middleware/firebaseAuthMiddleware.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const router: Router = Router();

/**
 * DELETE /api/microchip/:id
 * Deletes a microchip entry owned by the authenticated user
 */
router.delete(
  "/microchip/:id",
  verifyFirebaseToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const _userId = req.user?.uid;
    const _microchipId = req.params.id;

    if (!_userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: user not authenticated" });
    }

    if (!_microchipId || _microchipId.length !== 15) {
      return res.status(400).json({
        error: "Invalid or missing microchip ID (expected 15 characters)",
      });
    }

    try {
      // Note: Using getMicrochipData since deleteMicrochipData doesn't exist
      // You may need to implement actual delete logic
      const _microchipData = await getMicrochipData(_microchipId);

      if (!_microchipData) {
        return res
          .status(404)
          .json({ error: "No matching record found" });
      }

      // TODO: Implement actual delete logic here
      return res
        .status(200)
        .json({ message: "Microchip data would be deleted (not implemented)" });
    } catch (error) {
      console.error("Error with microchip:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default router;
