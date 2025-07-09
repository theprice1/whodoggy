// Example shared types

export interface DogRecord {
  microchipId: string;
  name: string;
  breed: string;
  dateOfBirth?: string;
  ownerName: string;
  ownerContact: string;
}

export interface UserAuthPayload {
  userId: string;
  email: string;
  roles: string[];
}
