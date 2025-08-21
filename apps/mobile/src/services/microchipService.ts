// apps/mobile/src/services/microchipService.ts

import { API_BASE_URL } from "../config/api.js";

export type MicrochipRecord = {
  microchipId: string;
  dogName: string;
  breed: string;
  dateOfBirth: string;
  gender: string;
  lastCheckup: string;
  microchipImplantDate: string;
  notes?: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerCity: string;
  registeredAt: string;
  registryName: string;
  vaccinated: boolean;
};

/**
 * Fetch microchip records by microchip ID
 * Returns an array of MicrochipRecord (empty if none found)
 */
export async function fetchMicrochipById(id: string): Promise<MicrochipRecord[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/microchips/${id}`);

    if (!response.ok) {
      // Could check for 404 specifically if you want
      return [];
    }

    const data = await response.json();

    // Assuming API returns { results: MicrochipRecord[] }
    return data.results as MicrochipRecord[];
  } catch (error) {
    console.error("Error fetching microchip data:", error);
    return [];
  }
}
