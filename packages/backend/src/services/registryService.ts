// src/services/registryService.ts

import fetch from 'node-fetch'; // or use global fetch if Node 18+

// List all 22 mock registry base URLs here
const registryUrls = [
  'http://localhost:4101/search/',
  'http://localhost:4102/search/',
  'http://localhost:4103/search/',
  'http://localhost:4104/search/',
  'http://localhost:4105/search/',
  'http://localhost:4106/search/',
  'http://localhost:4107/search/',
  'http://localhost:4108/search/',
  'http://localhost:4109/search/',
  'http://localhost:4110/search/',
  'http://localhost:4111/search/',
  'http://localhost:4112/search/',
  'http://localhost:4113/search/',
  'http://localhost:4114/search/',
  'http://localhost:4115/search/',
  'http://localhost:4116/search/',
  'http://localhost:4117/search/',
  'http://localhost:4118/search/',
  'http://localhost:4119/search/',
  'http://localhost:4120/search/',
  'http://localhost:4121/search/',
  'http://localhost:4122/search/',
];

// Type for the dog record you expect from registries
export interface DogRecord {
  microchipId: string;
  dogName: string;
  breed: string;
  ownerName: string;
  contact: string;
  registeredAt: string; // ISO string
  registryName: string;
  vaccinated: boolean;
  notes?: string;
  lastCheckup?: string; // ISO string
}

/**
 * Query a single registry by microchipId.
 * Returns DogRecord if found and valid, otherwise throws.
 */
async function queryRegistry(url: string, microchipId: string): Promise<DogRecord> {
  const response = await fetch(`${url}${microchipId}`);

  if (!response.ok) {
    throw new Error(`Registry ${url} responded with status ${response.status}`);
  }

  const data: DogRecord = await response.json();

  // Validate response (adjust this logic to your real data)
  if (!data.microchipId || data.microchipId === 'string') {
    throw new Error(`Registry ${url} returned no valid record`);
  }

  return data;
}

/**
 * Query all registries concurrently and return the first successful DogRecord found.
 * If none found, returns null.
 */
export async function queryAllRegistries(microchipId: string): Promise<DogRecord | null> {
  const promises = registryUrls.map(url => queryRegistry(url, microchipId));

  try {
    // Promise.any resolves as soon as one promise fulfills
    const firstResult = await Promise.any(promises);
    return firstResult;
  } catch (aggregateError) {
    // If all promises reject, Promise.any throws an AggregateError
    // You can inspect aggregateError.errors array for details if needed
    return null;
  }
}
