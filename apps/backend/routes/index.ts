import { Router } from 'express';
import deleteDataRouter from './deleteData';  // Correct import for the router

const router = Router();

router.use('/delete-data', deleteDataRouter);

export default router;
// This file sets up the main router for the application.
// It imports the deleteDataRouter and mounts it on the /delete-data path.
// This allows the application to handle requests related to deleting user data.
// The main router can be extended in the future to include more routes as needed.