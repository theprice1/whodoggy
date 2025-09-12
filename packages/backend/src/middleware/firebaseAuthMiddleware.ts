import type { NextFunction, Request, Response } from "express";
import type { auth } from "firebase-admin";
import admin from "../firebase/firebaseAdmin.js";

export interface AuthenticatedRequest extends Request {
	user?: auth.DecodedIdToken;
}

export const _verifyFirebaseToken = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const _authHeader = req.headers.authorization;
	if (!_authHeader || !_authHeader.startsWith("Bearer ")) {
		res.status(401).json({ error: "No authorization token provided" });
		return;
	}
	const _token = _authHeader.split(" ")[1];
	if (!_token) {
		res.status(401).json({ error: "Invalid authorization token format" });
		return;
	}
	try {
		const _decodedToken = await admin.auth().verifyIdToken(_token);
		req.user = _decodedToken;
		next();
	} catch (error) {
		console.error("Firebase token verification failed:", error);
		res.status(401).json({ error: "Invalid or expired token" });
	}
};
