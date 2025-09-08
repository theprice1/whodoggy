// packages/backend/src/middleware/errorHandler.ts

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import type { NextFunction, Request, Response } from "express";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const _logToExternalService = (_err: Error, _req: Request) => {
  // Placeholder for logging services (Sentry, etc.)
};

const _logDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(_logDir)) {
  fs.mkdirSync(_logDir, { recursive: true });
}

const _logPath = path.join(_logDir, "error.log");

const _logToFile = (err: unknown) => {
  const _message = `[${new Date().toISOString()}] ${err instanceof Error ? err.stack || err.message : String(err)
    }\n`;

  fs.appendFile(_logPath, _message, (error) => {
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
    const _status = _typedError.status ?? 500;

    if (!_isProd) {
      console.error(err.stack);
    }

    _logToExternalService(err, req);
    _logToFile(err);

    return res.status(_status).json({
      error: _isProd ? "Internal Server Error" : err.message,
    });
  }

  const _fallbackMessage = "Unexpected error";

  if (!_isProd) {
    console.error("Unknown error", err);
  }

  _logToFile(err);

  return res
    .status(500)
    .json({ error: _isProd ? "Internal Server Error" : _fallbackMessage });
};
