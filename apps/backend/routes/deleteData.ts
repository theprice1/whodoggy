import { Router, Request, Response, NextFunction } from 'express';
import deleteDataController from '../controllers/deleteDataController'; // adjust path if needed

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteDataController(req, res);  // only 2 args now
  } catch (error) {
    next(error);
  }
});

export default router;
// This route handles POST requests to delete user data.
// It uses the deleteDataController to process the request and handle errors. 