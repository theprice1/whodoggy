import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import microchipRoutes from './routes/microchip'; // Import the microchip route

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// Routes
app.use('/api', microchipRoutes); // Route for microchip scanning

// Server initialization
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
