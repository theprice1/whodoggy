// packages/backend/src/middleware/errorHandler.ts

import fs from "fs";
import path from "path";
import type { NextFunction, Request, Response } from "express";

const logToExternalService = (_err: Error, _req: Request) => {
  // Placeholder for logging services (Sentry, etc.)
};

const logDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logPath = path.join(logDir, "error.log");

const logToFile = (err: unknown) => {
  const message = `[${new Date().toISOString()}] ${
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

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const isProd = process.env.NODE_ENV === "production";

  if (err instanceof Error) {
    const typedError = err as HttpError;
    const status = typedError.status ?? 500;

    if (!isProd) {
      console.error(err.stack);
    }

    logToExternalService(err, req);
    logToFile(err);

    return res.status(status).json({
      error: isProd ? "Internal Server Error" : err.message,
    });
  }

  const fallbackMessage = "Unexpected error";

  if (!isProd) {
    console.error("Unknown error", err);
  }

  logToFile(err);

  return res.status(500).json({ error: isProd ? "Internal Server Error" : fallbackMessage });
};
