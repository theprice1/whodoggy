import request from 'supertest';
import express from 'express';
import deleteDataController from '../routes/deleteDataController';

const app = express();
app.use(express.json());
app.use('/api', deleteDataController);

describe('DELETE /api/microchip/:id', () => {
  it('should return 401 without Authorization header', async () => {
    const res = await request(app).delete('/api/microchip/123');
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('No auth token provided');
  });

  it('should delete microchip with valid auth header', async () => {
    const res = await request(app)
      .delete('/api/microchip/123')
      .set('Authorization', 'Bearer dummy-token');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Deleted microchip 123');
  });
});
