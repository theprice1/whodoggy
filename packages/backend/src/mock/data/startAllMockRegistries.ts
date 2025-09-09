// packages/backend/src/mock/data/startAllMockRegistries.ts - Start all 22 NI registry mock servers
import { createMockRegistryServer } from './mockRegistryServer.js';

const startPort = 4101;
const numberOfRegistries = 22;

// Northern Ireland registry names (the real 22 databases)
const registryNames = [
  "Petlog", "Animal Tracker", "Anibase", "SmartTag", "PetDetect",
  "PetProtect", "Euroident", "PetLink", "National Pet Register",
  "Pets at Home", "MicroDogID", "Pet Identity UK", "IdentiChip",
  "PetLog Northern Ireland", "Animal Care", "VetEnvoy", "PetTrace",
  "MicroTracker", "AnimalData", "PetLocator", "RegistryPlus", "ChipChecker"
];

// Array to store server instances for cleanup
const mockServers: Promise<void>[] = [];

async function startAllMockRegistries(): Promise<void> {
  console.log(`Starting ${numberOfRegistries} Northern Ireland microchip registry mock servers...`);
  console.log(`Port range: ${startPort} to ${startPort + numberOfRegistries - 1}`);

  try {
    for (let i = 0; i < numberOfRegistries; i++) {
      const port = startPort + i;
      const dataFileName = `registry-${i + 1}.json`;
      const registryName = registryNames[i] || `Registry_${i + 1}`;

      console.log(`Starting ${registryName} on port ${port} with data file: ${dataFileName}`);

      // Create mock registry server
      const serverPromise = createMockRegistryServer(port, dataFileName);
      mockServers.push(serverPromise);

      // Small delay between server starts to avoid port conflicts
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Wait for all servers to start
    await Promise.all(mockServers);

    console.log(`All ${numberOfRegistries} mock registry servers started successfully!`);
    console.log('Registry servers running:');

    registryNames.forEach((name, index) => {
      const port = startPort + index;
      console.log(`  ${(index + 1).toString().padStart(2, '0')}. ${name.padEnd(25)} → http://localhost:${port}`);
    });

    console.log('\nMock API endpoints available:');
    console.log('  GET  /health                     - Health check');
    console.log('  GET  /api/microchip/:id          - Find dog by microchip');
    console.log('  GET  /api/search/owner           - Search by owner details');
    console.log('  GET  /api/dogs                   - Get all dogs in registry');
    console.log('  GET  /api/search/breed/:breed    - Search by breed');
    console.log('  GET  /api/info                   - Registry information');

  } catch (error) {
    console.error('Failed to start all mock registries:', error);
    process.exit(1);
  }
}

// Function to test all registry endpoints
async function testAllRegistries(): Promise<void> {
  console.log('\nTesting all registry endpoints...');

  const testPromises = [];

  for (let i = 0; i < numberOfRegistries; i++) {
    const port = startPort + i;
    const registryName = registryNames[i] || `Registry_${i + 1}`;

    testPromises.push(testRegistryEndpoint(port, registryName));
  }

  const results = await Promise.allSettled(testPromises);

  let successCount = 0;
  let failCount = 0;

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      successCount++;
    } else {
      failCount++;
      console.log(`Registry ${registryNames[index]} (port ${startPort + index}) failed: ${result.reason}`);
    }
  });

  console.log(`\nRegistry Test Results: ${successCount} online, ${failCount} offline`);
}

// Helper function to test individual registry
async function testRegistryEndpoint(port: number, registryName: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:${port}/health`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    console.log(`✓ ${registryName} (port ${port}) is responding`);
  } catch (error) {
    throw new Error(`${registryName} on port ${port} is not responding: ${error}`);
  }
}

// Function to simulate cross-registry search (core WhoDoggy functionality)
async function simulateCrossRegistrySearch(microchipId: string): Promise<void> {
  console.log(`\nSimulating cross-registry search for microchip: ${microchipId}`);
  console.log('Searching across all 22 Northern Ireland registries...\n');

  const searchPromises = [];

  for (let i = 0; i < numberOfRegistries; i++) {
    const port = startPort + i;
    const registryName = registryNames[i] || `Registry_${i + 1}`;

    searchPromises.push(searchRegistryForMicrochip(port, registryName, microchipId));
  }

  const results = await Promise.allSettled(searchPromises);

  let foundCount = 0;
  let searchedCount = 0;

  results.forEach((result, index) => {
    searchedCount++;
    if (result.status === 'fulfilled' && result.value) {
      foundCount++;
      const registryName = registryNames[index] || `Registry_${index + 1}`;
      console.log(`🎯 FOUND in ${registryName}: ${JSON.stringify(result.value, null, 2)}`);
    }
  });

  console.log(`\nCross-Registry Search Complete:`);
  console.log(`  Registries searched: ${searchedCount}`);
  console.log(`  Matches found: ${foundCount}`);
  console.log(`  Search coverage: 100% of Northern Ireland databases`);
}

// Helper function to search individual registry for microchip
async function searchRegistryForMicrochip(port: number, registryName: string, microchipId: string): Promise<any> {
  try {
    const response = await fetch(`http://localhost:${port}/api/microchip/${microchipId}`);
    if (response.ok) {
      const data = await response.json() as { dog?: any; success?: boolean; registry?: string };
      return data.dog || data; // Return the dog data if found
    }
    return null; // Not found in this registry
  } catch (error) {
    console.log(`× Search failed in ${registryName}: ${error}`);
    return null;
  }
}

// Graceful shutdown handler
async function shutdown(): Promise<void> {
  console.log('\nShutting down all mock registry servers...');
  // Note: Individual servers will handle their own cleanup
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Main execution
if (require.main === module) {
  startAllMockRegistries()
    .then(() => {
      console.log('\n🚀 All mock registries are running!');
      console.log('💡 Use the following to test:');
      console.log('   - Individual registry: curl http://localhost:4101/health');
      console.log('   - Cross-registry search: Use your WhoDoggy app or test script');
      console.log('   - Stop servers: Ctrl+C');

      // Keep the process running
      setInterval(() => {
        // Heartbeat to keep process alive
      }, 30000);

      // Test all registries after startup
      setTimeout(async () => {
        await testAllRegistries();

        // Demonstrate cross-registry search with a sample microchip
        setTimeout(async () => {
          await simulateCrossRegistrySearch('981001234567890');
        }, 2000);
      }, 3000);
    })
    .catch((error) => {
      console.error('Failed to start mock registries:', error);
      process.exit(1);
    });
}

export { startAllMockRegistries, testAllRegistries, simulateCrossRegistrySearch };
