import type { ApiResponse, Owner } from "./types.js";

const BASE_URL = process.env.WHODOGGY_API_URL || "http://localhost:4000/api";

export async function getOwner(ownerId: string): Promise<ApiResponse<Owner>> {
  const res = await fetch(`${BASE_URL}/owners/${ownerId}`);
  return res.json() as Promise<ApiResponse<Owner>>;
}

export async function getOwners(): Promise<ApiResponse<Owner[]>> {
  const res = await fetch(`${BASE_URL}/owners`);
  return res.json() as Promise<ApiResponse<Owner[]>>;
}
