// Fixed ownersController.ts - All TypeScript errors resolved
import type { Request, Response } from 'express';
import { prisma } from '../../prisma/prismaClient.js';
import type { Dog, Prisma } from '@prisma/client';

// Type definitions for the microchip registry context
interface MicrochipRegistryDog extends Dog {
  registrySource?: string;
  lastVerified?: Date;
}

interface RegistrySearchResult {
  registryName: string;
  dogs: MicrochipRegistryDog[];
  searchTime: number;
}

interface OwnerStatistics {
  ownerEmail: string;
  ownerName: string;
  dogCount: number;
  registryCount: number;
  lastActivity: Date;
}

interface OwnerGroup {
  ownerEmail: string;
  ownerName: string;
  ownerPhone: string;
  address: string;
  dogs: Dog[];
  dogCount: number;
}

export class OwnersController {

  // Get all owners (grouped by owner email from dog records)
  async getAllOwners(req: Request, res: Response) {
    try {
      const dogs = await prisma.dog.findMany();

      // Group dogs by owner email since owner info is in dog records
      const ownerGroups: Record<string, Dog[]> = {};

      dogs.forEach((dog: Dog) => {
        const ownerKey = dog.ownerEmail;
        if (!ownerGroups[ownerKey]) {
          ownerGroups[ownerKey] = [];
        }
        ownerGroups[ownerKey].push(dog);
      });

      const owners: OwnerGroup[] = Object.entries(ownerGroups).map(([email, dogsArray]) => {
        // Ensure we have at least one dog to get owner info from
        const firstDog = dogsArray[0];
        if (!firstDog) {
          throw new Error(`No dogs found for owner ${email}`);
        }

        return {
          ownerEmail: email,
          ownerName: firstDog.ownerName,
          ownerPhone: firstDog.ownerPhone,
          address: firstDog.address,
          dogs: dogsArray,
          dogCount: dogsArray.length
        };
      });

      res.json(owners);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch owners' });
    }
  }

  // Fixed: Add dog to owner
  async addDogToOwner(req: Request, res: Response) {
    try {
      const ownerEmail = req.params.ownerEmail;
      const dogData = req.body;

      // Check if ownerEmail is provided
      if (!ownerEmail) {
        return res.status(400).json({ error: 'Owner email is required' });
      }

      // Function that was causing the error - now properly typed
      const validateDog = (dog: Partial<Dog>): boolean => {
        return !!(dog.microchipId && dog.name && dog.breed && dog.ownerEmail);
      };

      if (!validateDog(dogData)) {
        return res.status(400).json({ error: 'Invalid dog data' });
      }

      // Ensure owner email matches the URL parameter
      const dogToCreate = {
        ...dogData,
        ownerEmail: ownerEmail
      };

      const newDog = await prisma.dog.create({
        data: dogToCreate
      });

      res.json(newDog);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add dog to owner' });
    }
  }

  // Fixed: Update owner's dog - removed invalid fields
  async updateOwnerDog(req: Request, res: Response) {
    try {
      const ownerEmail = req.params.ownerEmail;
      const dogId = req.params.dogId;
      const updateData = req.body;

      // Check required parameters
      if (!ownerEmail || !dogId) {
        return res.status(400).json({ error: 'Owner email and dog ID are required' });
      }

      // Function with only valid Dog model fields
      const prepareDogUpdate = (dog: Partial<Dog>): Prisma.DogUpdateInput => {
        const validFields: Prisma.DogUpdateInput = {};

        if (dog.name !== undefined) validFields.name = dog.name;
        if (dog.breed !== undefined) validFields.breed = dog.breed;
        if (dog.age !== undefined) validFields.age = dog.age;
        if (dog.gender !== undefined) validFields.gender = dog.gender;
        if (dog.ownerName !== undefined) validFields.ownerName = dog.ownerName;
        if (dog.ownerPhone !== undefined) validFields.ownerPhone = dog.ownerPhone;
        if (dog.address !== undefined) validFields.address = dog.address;

        return validFields;
      };

      const updatedDog = await prisma.dog.update({
        where: {
          id: parseInt(dogId),
          ownerEmail: ownerEmail
        },
        data: prepareDogUpdate(updateData)
      });

      res.json(updatedDog);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update dog' });
    }
  }

  // Fixed: Search registries with proper microchip handling
  async searchOwnersByDogMicrochip(req: Request, res: Response) {
    try {
      const microchipId = req.params.microchipId;

      // Handle undefined microchipId
      if (!microchipId) {
        return res.status(400).json({ error: 'Microchip ID is required' });
      }

      // Search across multiple registries - key for NI microchip database integration
      const searchRegistries = async (searchMicrochipId: string): Promise<RegistrySearchResult[]> => {
        const registryResults: RegistrySearchResult[] = [];

        // Mock implementation - replace with actual registry API calls
        const mockRegistries = [
          'Petlog', 'Animal Tracker', 'Anibase', 'SmartTag', 'PetDetect'
        ];

        for (const registry of mockRegistries) {
          try {
            // Simulate registry search - search for dogs with matching microchip
            const dogs = await prisma.dog.findMany({
              where: {
                microchipId: searchMicrochipId
              }
            });

            registryResults.push({
              registryName: registry,
              dogs: dogs as MicrochipRegistryDog[],
              searchTime: Date.now()
            });
          } catch (error) {
            console.error(`Error searching ${registry}:`, error);
          }
        }

        return registryResults;
      };

      const searchResults = await searchRegistries(microchipId);
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search registries' });
    }
  }

  // Fixed: Validate ownership with correct field types
  async validateOwnershipByDog(req: Request, res: Response) {
    try {
      const ownerEmail = req.params.ownerEmail;
      const dogData = req.body;

      // Check required parameters
      if (!ownerEmail) {
        return res.status(400).json({ error: 'Owner email is required' });
      }

      // Function with correct Dog model fields only
      const checkDogOwnership = (dog: Pick<Dog, 'microchipId' | 'ownerEmail'>): boolean => {
        return dog.ownerEmail === ownerEmail && !!dog.microchipId;
      };

      const isValidOwnership = checkDogOwnership(dogData);

      if (!isValidOwnership) {
        return res.status(403).json({ error: 'Invalid ownership claim' });
      }

      // Verify against local database
      const dogs = await prisma.dog.findMany({
        where: {
          ownerEmail: ownerEmail,
          microchipId: dogData.microchipId
        }
      });

      res.json({
        verified: !!dogs.length,
        dogs
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to validate ownership' });
    }
  }

  // Fixed: Statistics with proper typing
  async getOwnerStatistics(req: Request, res: Response) {
    try {
      const dogs = await prisma.dog.findMany();

      // Function that was causing the error - now properly typed
      const statistics: Record<string, OwnerStatistics> = {};

      dogs.forEach((dog: Dog) => {
        const ownerKey = dog.ownerEmail;
        if (!statistics[ownerKey]) {
          statistics[ownerKey] = {
            ownerEmail: dog.ownerEmail,
            ownerName: dog.ownerName,
            dogCount: 0,
            registryCount: 1, // This would be calculated from actual registry data
            lastActivity: dog.updatedAt
          };
        }
        statistics[ownerKey].dogCount += 1;
        if (dog.updatedAt > statistics[ownerKey].lastActivity) {
          statistics[ownerKey].lastActivity = dog.updatedAt;
        }
      });

      res.json(statistics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate statistics' });
    }
  }

  // Fixed: Aggregated data with proper typing
  async getAggregatedData(req: Request, res: Response) {
    try {
      const rawStats = await prisma.dog.groupBy({
        by: ['createdAt'],
        _count: {
          id: true
        }
      });

      // Function that was causing the error - now properly typed
      const processedStats = rawStats.map((stat: { createdAt: Date; _count: { id: number } }) => ({
        date: stat.createdAt.toISOString().split('T')[0],
        dogCount: stat._count.id
      }));

      res.json(processedStats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to aggregate data' });
    }
  }

  // Additional method for microchip registry integration
  async searchAllRegistries(req: Request, res: Response) {
    try {
      const microchipId = req.params.microchipId;

      // Handle undefined microchipId
      if (!microchipId) {
        return res.status(400).json({ error: 'Microchip ID is required' });
      }

      // This is where you'd integrate with the actual 22 NI databases
      const ni_registries = [
        'Petlog', 'Animal Tracker', 'Anibase', 'SmartTag', 'PetDetect',
        'PetProtect', 'Euroident', 'PetLink', 'National Pet Register',
        'Pets at Home', 'MicroDogID', 'Pet Identity UK', 'IdentiChip',
        'PetLog Northern Ireland', 'Animal Care', 'VetEnvoy', 'PetTrace',
        'MicroTracker', 'AnimalData', 'PetLocator', 'RegistryPlus', 'ChipChecker'
      ];

      const results = await Promise.allSettled(
        ni_registries.map(async (registry) => {
          // Each registry would have its own API integration
          // This is where you'd make actual HTTP requests to each database
          return {
            registry,
            data: await this.queryRegistry(registry, microchipId),
            timestamp: new Date()
          };
        })
      );

      res.json({
        microchipId,
        totalRegistries: ni_registries.length,
        results: results.map((result, index) => ({
          registry: ni_registries[index],
          success: result.status === 'fulfilled',
          data: result.status === 'fulfilled' ? result.value : null,
          error: result.status === 'rejected' ? result.reason : null
        }))
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to search all registries' });
    }
  }

  private async queryRegistry(registryName: string, microchipId: string) {
    // Mock implementation - replace with actual API calls to each registry
    // Each registry will have different API endpoints and authentication
    return {
      found: Math.random() > 0.7, // Mock found/not found
      ownerInfo: {
        name: 'Mock Owner',
        contact: 'mock@email.com'
      }
    };
  }
}

export default new OwnersController();
