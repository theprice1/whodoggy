// packages/backend/services/registryService.ts
import { query } from '../db';
import fetch from 'node-fetch';

export interface Registry {
  id: string;
  name: string;
  url: string;
}

// Get a single registry by ID
export const getRegistry = async (id: string): Promise<Registry | null> => {
  try {
    const result = await query('SELECT id, name, url FROM registries WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0] as Registry;
  } catch (err) {
    console.error('Error fetching registry by id:', err);
    throw err;
  }
};

// Get all registries
export const getAllRegistriesService = async (): Promise<Registry[]> => {
  try {
    const result = await query('SELECT id, name, url FROM registries');
    return result.rows as Registry[];
  } catch (err) {
    console.error('Error fetching all registries:', err);
    throw err;
  }
};

// External call to a single registry mock server with timeout support
export const queryRegistry = async (
  registryUrl: string,
  microchipId: string,
  timeoutMs = 5000 // default 5 seconds timeout
): Promise<any | null> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(`${registryUrl}/search/${microchipId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn(`Registry at ${registryUrl} returned status ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      console.warn(`Request to ${registryUrl} timed out.`);
    } else {
      console.warn(`Failed to fetch from registry ${registryUrl}: ${err.message}`);
    }
    return null;
  }
};

// Query all registries in parallel for a microchip ID
export const queryAllRegistries = async (microchipId: string): Promise<any[]> => {
  try {
    const registries = await getAllRegistriesService();

    const fetchPromises = registries.map((registry) =>
      queryRegistry(registry.url, microchipId)
    );

    const results = await Promise.all(fetchPromises);

    // Filter out null (failed or no results)
    return results.filter((res) => res !== null);
  } catch (err) {
    console.error('Error querying all registries:', err);
    throw err;
  }
};
