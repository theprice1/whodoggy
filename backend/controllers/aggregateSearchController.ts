// controllers/aggregateSearchController.ts
import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

// List of all mock registry URLs
const registryEndpoints = Array.from({ length: 22 }, (_, i) => 
  `http://localhost:${4001 + i}/search`
);

router.post('/search', async (req: Request, res: Response) => {
  const { microchip_id } = req.body;

  if (!microchip_id) {
    return res.status(400).json({ error: 'microchip_id is required' });
  }

  try {
    // Prepare a request to all registries
    const searchPromises = registryEndpoints.map((url) =>
      axios.post(url, { microchip_id }).then(
        response => ({ success: true, data: response.data }),
        error => ({ success: false, error }) // allow all to settle
      )
    );

    const results = await Promise.all(searchPromises);

    // Find the first successful result
    const match = results.find(result => result.success && result.data?.microchip);

    if (match) {
      return res.status(200).json({ found: true, registry: match.data.registry, data: match.data.microchip });
    } else {
      return res.status(404).json({ found: false, message: 'Microchip not found in any registry' });
    }

  } catch (error) {
    console.error('Aggregator error:', error);
    return res.status(500).json({ error: 'Internal server error during aggregation' });
  }
});

export default router;
