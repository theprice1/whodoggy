import { createUser, getUsers, Router } from "../../../../../../../"; // Importing controller functions

const router: Router = Router();

// Define routes for users
router.get("/", getUsers); // GET /api/users
router.post("/", createUser); // POST /api/users

export default router; // Export the user routes
