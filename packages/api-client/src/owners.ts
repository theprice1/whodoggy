// packages/api-client/src/owners.ts
import type { ApiResponse, Owner } from "./types";

const BASE_URL = process.env.WHODOGGY_API_URL || "http://localhost:4000/api";

export async function getOwnerById(ownerId: string): Promise<ApiResponse<Owner>> {
  const res = await fetch(`${BASE_URL}/owners/${ownerId}`);
  return res.json();
}

export async function getAllOwners(): Promise<ApiResponse<Owner[]>> {
  const res = await fetch(`${BASE_URL}/owners`);
  return res.json();
}
