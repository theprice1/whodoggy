// backend/mock-apis/registry1.ts

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4001; // Unique port for registry 1

app.use(cors());
app.use(express.json());

// Mock data
const registry1 = [
  {
    microchip_id: '985141111111111',
    pet_name: 'Luna',
    species: 'dog',
    breed: 'Border Collie',
    date_registered: '2024-04-12',
    registry_name: 'PetTrace UK',
    owner_contact: 'contact1@example.com',
  },
  // add more if needed
];

// POST /search endpoint
app.post('/search', (req, res) => {
  const { microchip_id } = req.body;

  if (!microchip_id) {
    return res.status(400).json({ error: 'microchip_id required' });
  }

  const match = registry1.find((entry) => entry.microchip_id === microchip_id);

  if (match) {
    return res.status(200).json({ data: match });
  } else {
    return res.status(404).json({ message: 'Microchip not found in Registry 1' });
  }
});

app.listen(PORT, () => {
  console.log(`🟢 Mock Registry 1 running on http://localhost:${PORT}`);
});

