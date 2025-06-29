// backend/controllers/deleteDataController.ts
import { Request, Response } from 'express';

// Extend the Request interface to include the authenticated user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export async function deleteDataController(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized: User not found in request' });
    return;
  }

  try {
    // TODO: Replace this with actual deletion logic
    console.log(`Deleting data for user ${userId}`);

    res.status(200).json({ message: 'Data deletion successful' });
  } catch (error) {
    console.error('Data deletion failed:', error);
    res.status(500).json({ error: 'Data deletion failed' });
  }
}

export default deleteDataController;
// Ensure the file './deleteDataController.ts' exists in the same directory.
// If it does not exist, create it or update the path below to the correct location.