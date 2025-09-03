// packages/backend/src/routes/microchipRoutes.ts
import { Router } from "...";
import { getMicrochipById } from "...";

const router: Router = Router();

router.get("/:id", getMicrochipById);

export default router;
