// backend/mock-apis/startAllRegistries.ts
import { createMockRegistry } from './createMockRegistry';

const registries = [
  'UK Pet Registry', 'ChipSecure', 'VetID Central', 'PetTrace UK', 'CanineID',
  'AnimalTrackers', 'MicroDog Ltd', 'PetSafe Registry', 'DogID UK', 'PetLink UK',
  'National Microchip DB', 'SafePaws', 'GuardianChip', 'PupSecure',
  'Rescue Registry', 'PetGuard', 'K9 Tracker', 'HomePaws', 'BarkID', 'Tag-a-Dog',
  'DoggoTrack', 'StraySafe'
];

registries.forEach((name, i) => {
  const port = 4001 + i;
  createMockRegistry(name, port);
});
