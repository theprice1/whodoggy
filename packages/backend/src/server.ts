import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { _errorHandler } from "./middleware/errorHandler.js";
import deleteDataRoutes from "./routes/deleteData.js";
import dogsRoutes from "./routes/dogs.js";
import registriesRoutes from "./routes/registries.js";
import searchRoutes from "./routes/search.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/search", searchRoutes);
app.use("/api/dogs", dogsRoutes);
app.use("/api/registries", registriesRoutes);
app.use("/api", deleteDataRoutes);

// Global error handler
app.use(_errorHandler);

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`✅ WhoDoggy backend running on http://localhost:${port}`);
});
