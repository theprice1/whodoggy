import { Router } from "express";
import { getAllOwners, getOwnerById } from "../controllers/ownersController.js";

const router: Router = Router();

router.get("/", getAllOwners);
router.get("/:id", getOwnerById);

export default router;
