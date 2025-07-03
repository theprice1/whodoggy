const BASE_URL = 'http://localhost:3000/api'; // Change this to your backend URL in prod/dev

export interface DogInfo {
  microchipId: string;
  dogName: string;
  breed: string;
  dateOfBirth: string;
  gender: string;
  vaccinated: boolean;
  lastCheckup: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerCity: string;
  notes: string;
  // Add other fields as needed
}

export async function fetchMicrochipData(microchipId: string): Promise<DogInfo[]> {
  try {
    const response = await fetch(`${BASE_URL}/microchips/${microchipId}`);
    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }
    const data = await response.json();
    return data.results as DogInfo[];
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}
