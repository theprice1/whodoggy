import express from "express";
import { _getDogByMicrochipId } from "../services/dogService.js";

const router: express.Router = express.Router();

// GET /api/search/:microchipId
router.get("/:microchipId", async (req, res) => {
  const { microchipId } = req.params;

  try {
    // Search local database using existing service function
    const dog = await _getDogByMicrochipId(microchipId);

    if (dog) {
      // Return dog data with registry information
      return res.json(dog);
    } else {
      return res.status(404).json({
        message: "Dog not found in any registry.",
        searchedMicrochipId: microchipId
      });
    }
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      message: "Error searching for dog",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
