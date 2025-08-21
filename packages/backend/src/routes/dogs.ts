import { Router } from "express";
import {
  createDogHandler,
  deleteDogHandler,
  getAllDogsHandler,
  getDogByIdHandler,
  updateDogHandler,
} from "../controllers/dogController.js";

import { verifyFirebaseToken } from "../middleware/firebaseAuthMiddleware.js";
import { validateDogInput } from "../middleware/validateInput.js";

const router: Router = Router();

router.get("/", verifyFirebaseToken, getAllDogsHandler);
router.get("/:id", verifyFirebaseToken, getDogByIdHandler);
router.post("/", verifyFirebaseToken, validateDogInput, createDogHandler);
router.put("/:id", verifyFirebaseToken, validateDogInput, updateDogHandler);
router.delete("/:id", verifyFirebaseToken, deleteDogHandler);

export default router;
