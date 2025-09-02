// packages/api-client/src/dogs.ts
import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';

export async function getDogs() {
  const response = await axios.get(`${API_URL}/api/dogs`);
  return response.data;
}

export async function getDogById(id: string) {
  const response = await axios.get(`${API_URL}/api/dogs/${id}`);
  return response.data;
}

export async function createDog(dog: any) {
  const response = await axios.post(`${API_URL}/api/dogs`, dog);
  return response.data;
}

export async function updateDog(id: string, dog: any) {
  const response = await axios.put(`${API_URL}/api/dogs/${id}`, dog);
  return response.data;
}

export async function deleteDog(id: string) {
  const response = await axios.delete(`${API_URL}/api/dogs/${id}`);
  return response.data;
}
