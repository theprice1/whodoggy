// packages/backend/src/controllers/searchControllers.ts
import { Request, Response, Router } from 'express';
import { query } from '../db.js'; // Use generic query helper
import { z, ZodError, ZodIssue } from 'zod';
import { verifyFirebaseToken } from '../middleware/firebaseAuthMiddleware.js';

const router: Router = Router();

// Dog type for type-safe query
interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  microchip_id: string;
}

// Zod validation schema
const searchSchema = z.object({
  microchip_id: z.string().length(15, {
    message: 'microchip_id must be exactly 15 characters long.',
  }),
});

// POST /search endpoint
router.post(
  '/search',
  verifyFirebaseToken,
  async (req: Request, res: Response) => {
    try {
      const { microchip_id } = searchSchema.parse(req.body);

      // Query the database using the new query<T>() helper
      const results = await query<Dog>(
        'SELECT * FROM dogs WHERE microchip_id = $1 LIMIT 1',
        [microchip_id]
      );

      if (results.length === 0) {
        return res.status(404).json({ message: 'Microchip not found' });
      }

      return res.status(200).json({ data: results[0] });
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: { path: string; message: string }[] =
          error.issues.map((e: ZodIssue) => ({
            path: e.path.join('.'),
            message: e.message,
          }));
        return res.status(400).json({ errors: formattedErrors });
      }

      console.error('Search error:', error);
      return res
        .status(500)
        .json({ error: 'Server error during microchip search' });
    }
  }
);

export default router;
