// src/services/registryService.ts

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
async function queryRegistry(
  url: string,
  microchipId: string
): Promise<DogRecord> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

  try {
    const response = await fetch(`${url}${microchipId}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `Registry ${url} responded with status ${response.status}`
      );
    }

  const data = (await response.json()) as DogRecord;


    // Validate response: microchipId should be a non-empty string different from default placeholder
    if (
      !data.microchipId ||
      data.microchipId === 'string' ||
      data.microchipId.trim() === ''
    ) {
      throw new Error(`Registry ${url} returned no valid record`);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Query all registries concurrently and return the first successful DogRecord found.
 * If none found, returns null.
 */
export async function queryAllRegistries(
  microchipId: string
): Promise<DogRecord | null> {
  const queries = registryUrls.map((url) =>
    queryRegistry(url, microchipId).catch((err) => {
      // Log error but don't fail all queries
      console.warn(`Failed to fetch from ${url}: ${err.message}`);
      return null;
    })
  );

  // Wait for all to settle
  const results = await Promise.all(queries);

  // Return the first non-null valid result
  for (const result of results) {
    if (result) {
      return result;
    }
  }
  return null;
}

export async function getRegistry(id: string): Promise<DogRecord | null> {
  return await queryAllRegistries(id); // Use your existing logic
}

export async function getAllRegistriesService(): Promise<string[]> {
  return registryUrls; // Just returns the list
}

