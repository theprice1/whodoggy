// packages/backend/src/middleware/auth.ts

import type { NextFunction, Request, Response } from "express";
import admin from "../services/firebase.js";

export interface AuthenticatedRequest extends Request {
	user?: admin.auth.DecodedIdToken;
}

export async function authenticate(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) {
	const _authHeader = req.headers.authorization;
	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	const _idToken = authHeader.split(" ")[1];
	if (!idToken) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	try {
		const _decodedToken = await admin.auth().verifyIdToken(idToken);
		req.user = decodedToken;
		next();
	} catch (error) {
		console.error("Firebase auth error:", error);
		return res.status(401).json({ error: "Unauthorized" });
	}
}
