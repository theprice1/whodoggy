// Shared mock data used by all mock registries

export interface DogInfo {
  microchipId: string;
  dogName: string;
  ownerName: string;
  breed: string;
  age: number;
  registryId: number;
}

export const mockDogs: DogInfo[] = [
  {
    microchipId: '1234567890',
    dogName: 'Fido',
    ownerName: 'Alice Smith',
    breed: 'Labrador',
    age: 5,
    registryId: 1,
  },
  {
    microchipId: '0987654321',
    dogName: 'Rex',
    ownerName: 'Bob Johnson',
    breed: 'German Shepherd',
    age: 3,
    registryId: 2,
  },
  // Add more mock dogs if needed
];
