// packages/backend/src/routes/microchipRoutes.ts
import { getMicrochipById, Router } from "../../../../../../../";

const router: Router = Router();

router.get("/:id", getMicrochipById);

export default router;
