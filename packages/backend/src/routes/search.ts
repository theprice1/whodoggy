// packages/backend/src/routes/search.ts
import express from 'express';
import fetch from 'node-fetch';

const router: express.Router = express.Router();

// List of registry URLs
const registryPorts = Array.from({ length: 22 }, (_, i) => 4101 + i);
const registryUrls = registryPorts.map(
  (port) => `http://127.0.0.1:${port}/search`
);

// GET /api/search/:microchipId
router.get('/:microchipId', async (req, res) => {
  const { microchipId } = req.params;

  for (const url of registryUrls) {
    try {
      const response = await fetch(`${url}/${microchipId}`);
      if (response.ok) {
        const data = await response.json();
        return res.json({ source: url, ...data });
      }
    } catch {
      // silently ignore failures — move to next registry
    }
  }

  return res.status(404).json({ message: 'Dog not found in any registry.' });
});

export default router;
