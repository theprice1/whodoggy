import type { ApiResponse, Dog } from "./types.js";

const BASE_URL = process.env.WHODOGGY_API_URL || "http://localhost:4000/api";

export async function getDog(microchipId: string): Promise<ApiResponse<Dog>> {
  const res = await fetch(`${BASE_URL}/dogs/${microchipId}`);
  return res.json() as Promise<ApiResponse<Dog>>;
}

export async function getDogs(): Promise<ApiResponse<Dog[]>> {
  const res = await fetch(`${BASE_URL}/dogs`);
  return res.json() as Promise<ApiResponse<Dog[]>>;
}
