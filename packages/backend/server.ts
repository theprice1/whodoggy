// packages/backend/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import searchRoutes from './routes/search.js';
import dogsRoutes from './routes/dogs.js';
import ownersRoutes from './src/routes/owners.ts';
import registriesRoutes from './routes/registries.js';
import deleteDataController from './routes/deleteDataController.js';

import { errorHandler } from './src/middleware/errorHandler.ts';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Register all route handlers
app.use('/api/search', searchRoutes);
app.use('/api/dogs', dogsRoutes);
app.use('/api/owners', ownersRoutes);
app.use('/api/registries', registriesRoutes);
app.use('/api', deleteDataController);

// Global error handler (must be last)
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Backend server running on port ${port}`);
});
