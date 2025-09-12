import { API_BASE_URL } from "@whodoggy/shared";

export interface MicrochipRecord {
  id: string;
  microchipId: string;
  dogName: string;
  dogBreed: string;
  ownerName: string;
  ownerContact: string;
  registryName: string;
  registrationDate: string;
  isActive: boolean;
}

export interface SearchResponse {
  success: boolean;
  results: MicrochipRecord[];
  message?: string;
}

/**
 * Search for a microchip record by ID
 */
export const searchMicrochip = async (id: string): Promise<MicrochipRecord[]> => {
  if (!id?.trim()) {
    throw new Error('Microchip ID is required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/microchips/${id}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch microchip data: ${response.status} ${errorText}`);
    }

    const data = await response.json() as SearchResponse;

    if (!data.success) {
      throw new Error(data.message || 'Search failed');
    }

    return data.results as MicrochipRecord[];
  } catch (error) {
    console.error('Microchip search error:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('An unexpected error occurred while searching');
  }
};

/**
 * Get all microchip registries
 */
export const getRegistries = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/registries`);

    if (!response.ok) {
      throw new Error(`Failed to fetch registries: ${response.status}`);
    }

    const data = await response.json();
    return data.registries || [];
  } catch (error) {
    console.error('Registry fetch error:', error);
    throw new Error('Failed to load registry list');
  }
};
