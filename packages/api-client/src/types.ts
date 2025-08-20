// packages/api-client/src/types.ts

export interface Dog {
  id: string; // UUID
  microchipId: string;
  name: string;
  breed: string;
  age: number;
  registryId: string; // foreign key
  ownerId: string; // foreign key
}

export interface Owner {
  id: string; // UUID
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Registry {
  id: string; // UUID
  name: string;
  country: string;
  contactEmail: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
