// packages/backend/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import searchRoutes from './routes/search';
import dogsRoutes from './routes/dogs';
import ownersRoutes from './routes/owners';
import registriesRoutes from './routes/registries';
import deleteDataController from './routes/deleteDataController';  // add this import

import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/search', searchRoutes);
app.use('/api/dogs', dogsRoutes);
app.use('/api/owners', ownersRoutes);
app.use('/api/registries', registriesRoutes);
app.use('/api', deleteDataController);  // use the delete route

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
