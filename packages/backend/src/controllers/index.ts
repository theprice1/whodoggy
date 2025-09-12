// src/controllers/index.ts - Main WhoDoggy Backend Server
import cors from "cors";
import dotenv from "dotenv";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import morgan from "morgan";

// Import WhoDoggy controllers
import { aggregateSearchRouter } from "./aggregateSearchController.js";
import {
	getAllUsers,
	getCurrentUser,
	getSessionStats,
	login,
	logout,
	requireRole,
	signup,
	verifyToken,
} from "./authController.js";

// Load environment variables
dotenv.config();

// Create Express application
const app: express.Express = express();
const PORT = parseInt(process.env.PORT || "3000");

// Middleware setup
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "*",
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error("Unhandled error:", err);
	res.status(500).json({
		error: "Internal server error",
		code: "SERVER_ERROR",
	});
});

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
	res.json({
		service: "WhoDoggy Backend API",
		version: "1.0.0",
		status: "operational",
		description: "UK/Northern Ireland Microchip Registry Search System",
		endpoints: {
			authentication: [
				"POST /api/auth/signup",
				"POST /api/auth/login",
				"POST /api/auth/logout",
				"GET /api/auth/me",
			],
			search: ["GET /api/search/:microchipId", "GET /api/registries"],
			admin: ["GET /api/admin/users", "GET /api/admin/sessions"],
		},
		registries: {
			total: 22,
			coverage: "UK and Northern Ireland DEFRA-approved databases",
		},
	});
});

// API Status endpoint
app.get("/api/status", (req: Request, res: Response) => {
	res.json({
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
		memory: process.memoryUsage(),
		environment: process.env.NODE_ENV || "development",
		system: "WhoDoggy UK Microchip Registry",
	});
});

// Authentication routes
app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);
app.post("/api/auth/logout", verifyToken, logout);
app.get("/api/auth/me", verifyToken, getCurrentUser);

// Protected admin routes
app.get("/api/admin/users", verifyToken, requireRole("admin"), getAllUsers);
app.get(
	"/api/admin/sessions",
	verifyToken,
	requireRole("admin"),
	getSessionStats,
);

// Main search functionality - core WhoDoggy feature
app.use("/api", aggregateSearchRouter);

// 404 handler for unknown routes
app.use("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: "Endpoint not found",
		code: "NOT_FOUND",
		message: `Route ${req.method} ${req.originalUrl} does not exist`,
		availableEndpoints: "/api/status for system information",
	});
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error("Global error handler:", err);

	// Handle specific error types
	if (err.name === "ValidationError") {
		return res.status(400).json({
			error: "Validation failed",
			code: "VALIDATION_ERROR",
			details: err.message,
		});
	}

	if (err.name === "UnauthorizedError") {
		return res.status(401).json({
			error: "Authentication required",
			code: "AUTH_REQUIRED",
		});
	}

	// Default error response
	res.status(500).json({
		error: "Internal server error",
		code: "SERVER_ERROR",
		message:
			process.env.NODE_ENV === "development"
				? err.message
				: "Something went wrong",
	});
});

// Graceful shutdown handling
process.on("SIGTERM", () => {
	console.log("SIGTERM signal received: closing HTTP server");
	server.close(() => {
		console.log("HTTP server closed");
	});
});

process.on("SIGINT", () => {
	console.log("SIGINT signal received: closing HTTP server");
	server.close(() => {
		console.log("HTTP server closed");
	});
});

// Start server
const server = app.listen(PORT, () => {
	console.log(`WhoDoggy Backend Server Started`);
	console.log(`Port: ${PORT}`);
	console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
	console.log(`UK Microchip Registry System: 22 DEFRA-approved databases`);
	console.log(`Server ready at http://localhost:${PORT}`);
	console.log(`Health check: http://localhost:${PORT}/api/status`);
	console.log(`Authentication: http://localhost:${PORT}/api/auth/login`);
	console.log(`Search example: http://localhost:${PORT}/api/search/MC-100001`);
});

// Export for testing
export { app, server };
export default app;
