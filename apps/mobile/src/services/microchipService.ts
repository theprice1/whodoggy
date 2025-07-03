// apps/mobile/src/services/microchipService.ts

import { API_BASE_URL } from '../config/api';

export interface MicrochipRecord {
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
}

export async function fetchMicrochipById(id: string): Promise<MicrochipRecord[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/microchips/${id}`);
    if (!response.ok) {
      // handle 404 or other errors
      return [];
    }
    const data = await response.json();
    return data.results as MicrochipRecord[];
  } catch (error) {
    console.error('Error fetching microchip data:', error);
    return [];
  }
}
