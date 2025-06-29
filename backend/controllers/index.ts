import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import deleteDataController from './controllers/deleteDataController';
import aggregateSearchRouter from './controllers/aggregateSearchController';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', deleteDataController);
app.use('/api', aggregateSearchRouter);

app.get('/', (_req, res) => {
  res.send('WhoDoggy Backend API');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
