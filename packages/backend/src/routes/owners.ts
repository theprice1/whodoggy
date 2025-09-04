import { getAllOwners, getOwnerById, Router } from "../../../../../../../";

const router: Router = Router();

router.get("/", getAllOwners);
router.get("/:id", getOwnerById);

export default router;
