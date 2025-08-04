// src/__tests__/microchipRoutes.test.ts

import request from 'supertest';
import express from 'express';
import microchipRoutes from '../routes/microchipRoutes.ts';
import { mockAuth } from '../middleware/mockAuth.ts';

const app = express();
app.use(express.json());

// Use mockAuth instead of real authenticate middleware during tests
app.use('/api/microchips', mockAuth, microchipRoutes);

describe('GET /api/microchips/:id', () => {
  it('returns 200 and microchip data for valid ID', async () => {
    const response = await request(app).get('/api/microchips/1234567890');
    expect(response.status).toBe(200);
    expect(response.body.results[0]).toHaveProperty('dogName', 'Fido');
  });

  it('returns 404 for invalid ID', async () => {
    const response = await request(app).get('/api/microchips/nonexistent');
    expect(response.status).toBe(404);
  });
});
