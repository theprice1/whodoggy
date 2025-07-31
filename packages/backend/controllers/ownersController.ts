import { Request, Response } from 'express';
import { getOwner, getAllOwnersService } from '../services/ownerService.js';

export const getAllOwners = async (_req: Request, res: Response) => {
  const owners = await getAllOwnersService();
  res.json(owners);
};

export const getOwnerById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const owner = await getOwner(req.params.id);
  owner ? res.json(owner) : res.status(404).json({ error: 'Owner not found' });
};
