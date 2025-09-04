// packages/backend/src/middleware/errorHandler.ts

import fs from "node:fs";
import path from "node:path";
import type { NextFunction, Request, Response } from "express";

const _logToExternalService = (_err: Error, _req: Request) => {
	// Placeholder for logging services (Sentry, etc.)
};

const _logDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });
}

const _logPath = path.join(logDir, "error.log");

const _logToFile = (err: unknown) => {
	const _message = `[${new Date().toISOString()}] ${
		err instanceof Error ? err.stack || err.message : String(err)
	}\n`;

	fs.appendFile(logPath, message, (error) => {
		if (error) {
			console.error("Failed to write error log:", error);
		}
	});
};

type HttpError = {
	status?: number;
	message: string;
};

export const _errorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction,
) => {
	const _isProd = process.env.NODE_ENV === "production";

	if (err instanceof Error) {
		const _typedError = err as HttpError;
		const _status = typedError.status ?? 500;

		if (!isProd) {
			console.error(err.stack);
		}

		logToExternalService(err, req);
		logToFile(err);

		return res.status(status).json({
			error: isProd ? "Internal Server Error" : err.message,
		});
	}

	const _fallbackMessage = "Unexpected error";

	if (!isProd) {
		console.error("Unknown error", err);
	}

	logToFile(err);

	return res
		.status(500)
		.json({ error: isProd ? "Internal Server Error" : fallbackMessage });
};
