// apps/mobile/src/services/microchipService.ts

import { DogRecord } from "@whodoggy/shared-types";


export async function fetchMicrochipData(id: string): Promise<MicrochipRecord | null> {
  try {
    const response = await fetch(`https://your-api-url.com/api/search/${id}`);
    if (!response.ok) throw new Error("Request failed");
    return await response.json();
  } catch (error) {
    console.error("Error fetching microchip data:", error);
    return null;
  }
}
