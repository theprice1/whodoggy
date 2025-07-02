// backend/mock-apis/createMockRegistry.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { faker } from '@faker-js/faker';

export function createMockRegistry(registryName: string, port: number) {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.post('/search', (req, res) => {
    const { microchip_id } = req.body;

    // Simulate 70% chance of success
    const found = Math.random() < 0.7;
    if (!microchip_id || !found) {
      return res.status(404).json({ message: 'Microchip not found' });
    }

    const result = {
      microchip_id,
      pet_name: faker.animal.dog(),
      species: 'dog',
      breed: faker.animal.dog(),
      date_registered: faker.date.past().toISOString().split('T')[0],
      registry_name: registryName,
      owner_contact: faker.internet.email(),
    };

    return res.json({ data: result });
  });

  app.listen(port, () => {
    console.log(`🐶 ${registryName} running at http://localhost:${port}/search`);
  });
}
