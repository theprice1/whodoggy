import type { ApiResponse, Registry } from "./types.js";

const BASE_URL = process.env.WHODOGGY_API_URL || "http://localhost:4000/api";

export async function getRegistry(registryId: string): Promise<ApiResponse<Registry>> {
  const res = await fetch(`${BASE_URL}/registries/${registryId}`);
  return res.json() as Promise<ApiResponse<Registry>>;
}

export async function getRegistries(): Promise<ApiResponse<Registry[]>> {
  const res = await fetch(`${BASE_URL}/registries`);
  return res.json() as Promise<ApiResponse<Registry[]>>;
}
