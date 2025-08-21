// src/mock-dbs/types.ts

export interface MicrochipRecord {
  microchipId: string;
  dogName: string;
  breed: string;
  gender: "Male" | "Female";
  dateOfBirth: string; // ISO date string
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerCity: string;
  registeredAt: string; // ISO date string
  microchipImplantDate: string; // ISO date string
  registryName: string;
  vaccinated: boolean;
  notes: string;
  lastCheckup: string; // ISO date string
}
