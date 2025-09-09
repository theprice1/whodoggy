// src/mock/data/mockRegistryServer.ts
import fs from "node:fs/promises";
import path from "node:path";
import cors from "cors";
import express, { type Request, type Response } from "express";

const PORT = 3001; // You can change port per registry server if needed

// Type definition for mock dog data
interface MockDog {
  id: number;
  microchipId: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  address: string;
  registryId: number;
  createdAt: string;
  updatedAt: string;
}

// Helper function to load mock JSON data
async function loadMockData(fileName: string): Promise<MockDog[]> {
  const filePath = path.resolve(__dirname, "..", fileName);
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData) as MockDog[];
}

export async function createMockRegistryServer(
  port: number,
  dataFileName: string,
): Promise<void> {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Load the mock dog data from the JSON file
  const mockDogs = await loadMockData(dataFileName);

  // Health check endpoint
  app.get("/health", (req: Request, res: Response) => {
    res.json({
      status: "healthy",
      registry: dataFileName,
      port: port,
      timestamp: new Date().toISOString()
    });
  });

  // API endpoint to get dog by microchip id
  app.get("/api/microchip/:id", (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: "Microchip ID is required" });
      return;
    }

    // Find the dog by microchip id
    const dog = mockDogs.find((d: MockDog) => d.microchipId === id);

    if (dog) {
      res.json({
        success: true,
        registry: dataFileName,
        dog: dog,
        searchTime: new Date().toISOString()
      });
    } else {
      res.status(404).json({
        error: "Microchip not found in this registry",
        registry: dataFileName,
        microchipId: id
      });
    }
  });

  // API endpoint to search dogs by owner details
  app.get("/api/search/owner", (req: Request, res: Response) => {
    const { name, email, phone } = req.query;

    if (!name && !email && !phone) {
      res.status(400).json({ error: "At least one search parameter is required" });
      return;
    }

    const results = mockDogs.filter((dog: MockDog) => {
      const nameMatch = name ? dog.ownerName.toLowerCase().includes((name as string).toLowerCase()) : true;
      const emailMatch = email ? dog.ownerEmail.toLowerCase().includes((email as string).toLowerCase()) : true;
      const phoneMatch = phone ? dog.ownerPhone.includes(phone as string) : true;

      return nameMatch && emailMatch && phoneMatch;
    });

    res.json({
      success: true,
      registry: dataFileName,
      results: results,
      total: results.length,
      searchTime: new Date().toISOString()
    });
  });

  // API endpoint to get all dogs in this registry
  app.get("/api/dogs", (req: Request, res: Response) => {
    res.json({
      success: true,
      registry: dataFileName,
      dogs: mockDogs,
      total: mockDogs.length
    });
  });

  // API endpoint to search dogs by breed
  app.get("/api/search/breed/:breed", (req: Request, res: Response) => {
    const breed = req.params.breed;

    if (!breed) {
      res.status(400).json({ error: "Breed parameter is required" });
      return;
    }

    const results = mockDogs.filter((dog: MockDog) =>
      dog.breed.toLowerCase().includes(breed.toLowerCase())
    );

    res.json({
      success: true,
      registry: dataFileName,
      breed: breed,
      results: results,
      total: results.length
    });
  });

  // Registry info endpoint
  app.get("/api/info", (req: Request, res: Response) => {
    res.json({
      registryName: dataFileName.replace('.json', ''),
      totalDogs: mockDogs.length,
      port: port,
      endpoints: [
        `GET /health`,
        `GET /api/microchip/:id`,
        `GET /api/search/owner?name=&email=&phone=`,
        `GET /api/dogs`,
        `GET /api/search/breed/:breed`,
        `GET /api/info`
      ],
      country: "Northern Ireland",
      status: "active"
    });
  });

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: any) => {
    console.error(`Registry ${dataFileName} Error:`, err);
    res.status(500).json({
      error: "Internal registry error",
      registry: dataFileName
    });
  });

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: "Endpoint not found",
      registry: dataFileName,
      availableEndpoints: [
        `GET /health`,
        `GET /api/microchip/:id`,
        `GET /api/search/owner`,
        `GET /api/dogs`,
        `GET /api/search/breed/:breed`,
        `GET /api/info`
      ]
    });
  });

  return new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`✅ Mock registry server '${dataFileName}' running on port ${port}`);
      console.log(`   Health check: http://localhost:${port}/health`);
      console.log(`   Registry info: http://localhost:${port}/api/info`);
      resolve();
    });

    server.on('error', (err: Error) => {
      console.error(`❌ Failed to start registry '${dataFileName}' on port ${port}:`, err);
      reject(err);
    });
  });
}

// Function to create a registry server with specific registry data
export async function createRegistryServer(registryId: number, registryName: string, port: number): Promise<void> {
  const dataFileName = `registry-${registryId}.json`;

  try {
    await createMockRegistryServer(port, dataFileName);
    console.log(`🏥 ${registryName} registry (ID: ${registryId}) started on port ${port}`);
  } catch (error) {
    console.error(`❌ Failed to start ${registryName} registry:`, error);
    throw error;
  }
}

// Standalone run for testing
if (require.main === module) {
  (async () => {
    try {
      await createMockRegistryServer(PORT, "registry1.json");
    } catch (error) {
      console.error("Failed to start mock registry server:", error);
      process.exit(1);
    }
  })();
}
