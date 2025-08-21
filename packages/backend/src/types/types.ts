// src/types/types.ts

export interface DogWithDetails {
  dog_id: string;
  dog_name: string;
  breed: string;
  age: number;
  owner_id: string;
  owner_name: string;
  phone: string;
  email: string;
  registry_id: string;
  registry_name: string;
}

export interface MicrochipRecord {
  microchipId: string;
  dogName: string;
  breed: string;
  gender: "Male" | "Female";
  dateOfBirth: string; // ISO string
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerCity: string;
  registeredAt: string;
  microchipImplantDate: string;
  registryName: string;
  vaccinated: boolean;
  notes: string;
  lastCheckup: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone?: string;
}
