import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import deleteDataRouter from './controllers/deleteDataController';
import searchRouter from './controllers/searchController';

// Import necessary modules and routers for the backend server
dotenv.config();

// Load environment variables from .env file
// Ensure that the .env file is loaded before using any environment variables
const app = express();

// Middleware setup
app.use(cors());                // Enable CORS for all origins (adjust if needed)
app.use(express.json());        // Parse JSON bodies
app.use(morgan('dev'));         // HTTP request logger for dev debugging

// Routes
app.use('/api', deleteDataRouter);

// Root endpoint for quick server check
app.get('/', (_req: Request, res: Response) => {
  res.send('WhoDoggy Backend API');
});

// Ensure that the searchRouter is mounted correctly
// This router should handle search-related requests
// It is important to mount it under the same base path as deleteDataRouter
// so that both can coexist under the /api path
// If searchRouter is not mounted, it will not handle any requests
// This is crucial for the functionality of the search feature in the application
app.use('/api', searchRouter); // ✅ This must be present


// Global error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

export default app;
// This is the main entry point for the backend server.
// It sets up the Express application, middleware, and routes.
// The server listens on the specified port and provides a root endpoint for quick checks.
// The deleteDataRouter handles the data deletion logic, which is defined in a separate file.
// The server also includes error handling middleware to catch unhandled errors and respond with a 500 status code.
// The server uses environment variables for configuration, loaded from a .env file using dotenv.
// The server uses CORS to allow cross-origin requests, and morgan for logging HTTP requests in development mode.
// The server is designed to be modular, allowing for easy expansion with additional routes and middleware as needed.
// The server is ready to handle requests for data deletion, with proper authentication checks in place.
// The server is structured to be easily testable and maintainable, following best practices for Express applications.  