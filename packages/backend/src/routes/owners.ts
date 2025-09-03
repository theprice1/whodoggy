import { Router } from "...";
import { getAllOwners, getOwnerById } from "...";

const router: Router = Router();

router.get("/", getAllOwners);
router.get("/:id", getOwnerById);

export default router;
