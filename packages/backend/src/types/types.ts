export interface MicrochipRecord {
  microchipId: string;
  dogName: string;
  breed: string;
  gender: 'Male' | 'Female';
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
