// packages/api-client/src/dogs.ts
import { Dog, ApiResponse } from "./types";

const BASE_URL = process.env.WHODOGGY_API_URL || "http://localhost:4000/api";

export async function getDogByChip(microchipId: string): Promise<ApiResponse<Dog>> {
  const res = await fetch(`${BASE_URL}/dogs/${microchipId}`);
  return res.json();
}

export async function getAllDogs(): Promise<ApiResponse<Dog[]>> {
  const res = await fetch(`${BASE_URL}/dogs`);
  return res.json();
}
