// src/middleware/mockAuth.ts

import type { NextFunction, Request, Response } from "express";

export const mockAuth = (req: Request, _res: Response, next: NextFunction) => {
  (req as any).user = { uid: "test-user" }; // fake user for testing
  next();
};
