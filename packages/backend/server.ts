import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import searchRoutes from './src/routes/search.js';
import dogsRoutes from './src/routes/dogs.js';
import ownersRoutes from './src/routes/owners.js';
import registriesRoutes from './src/routes/registries.js';
import deleteDataRoutes from './src/routes/deleteData.js';

import { errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/search', searchRoutes);
app.use('/api/dogs', dogsRoutes);
app.use('/api/owners', ownersRoutes);
app.use('/api/registries', registriesRoutes);
app.use('/api', deleteDataRoutes);

// Global error handler
app.use(errorHandler);

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ WhoDoggy backend running on http://localhost:${port}`);
});
