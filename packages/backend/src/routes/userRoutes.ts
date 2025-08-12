import { Router } from 'express'; // Importing Router from Express
import { getUsers, createUser } from '../controllers/userController.js.js'; // Importing controller functions

const router = Router();

// Define routes for users
router.get('/', getUsers); // GET /api/users
router.post('/', createUser); // POST /api/users

export default router; // Export the user routes
