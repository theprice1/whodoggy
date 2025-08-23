// packages/api-client/src/registries.ts
import type { ApiResponse, Registry } from "./types";

const BASE_URL = process.env.WHODOGGY_API_URL || "http://localhost:4000/api";

export async function getRegistryById(registryId: string): Promise<ApiResponse<Registry>> {
  const res = await fetch(`${BASE_URL}/registries/${registryId}`);
  return res.json();
}

export async function getAllRegistries(): Promise<ApiResponse<Registry[]>> {
  const res = await fetch(`${BASE_URL}/registries`);
  return res.json();
}
