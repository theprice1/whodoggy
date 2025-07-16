import { Request, Response } from 'express'; // Importing types for Express

// Controller function to handle GET /api/users
export const getUsers = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Fetching all users' });
};

// Controller function to handle POST /api/users
export const createUser = (req: Request, res: Response) => {
  const { username, email } = req.body;
  // Logic to create a user in your database
  res.status(201).json({ message: 'User created', username, email });
};
