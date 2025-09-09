// packages/backend/src/test.ts - Test setup for WhoDoggy backend
import { execSync } from "child_process";
import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config({ path: "../../.env" }); // Adjust path as needed

// Validate required environment variables for testing
const requiredEnvVars = ['DATABASE_URL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables for testing: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Run migrations before tests
try {
  console.log("Running database migrations before tests...");
  execSync("pnpm run migrate", { stdio: "inherit" });
  console.log("Database migrations completed successfully");
} catch (error) {
  console.error("Failed to run migrations:", error);
  process.exit(1);
}

// Optionally seed database before tests
// Uncomment below if you want to seed every test run
/*
try {
  console.log('Seeding database before tests...');
  execSync('pnpm run seed-db', { stdio: 'inherit' });
  console.log('Database seeding completed successfully');
} catch (error) {
  console.error('Failed to seed database:', error);
  process.exit(1);
}
*/

// Setup pg-promise DB connection to use in tests
const pgp = pgPromise({
  // Add any pg-promise configuration options here
  connect(client: any) {
    console.log('Connected to test database');
  },
  disconnect(client: any) {
    console.log('Disconnected from test database');
  },
  error(error: Error, e: any) {
    console.error('Database error in tests:', error);
  }
});

const db = pgp(process.env.DATABASE_URL || "");

// Test database connection
async function testDatabaseConnection(): Promise<void> {
  try {
    await db.one('SELECT NOW() as current_time');
    console.log('Test database connection successful');
  } catch (error) {
    console.error('Test database connection failed:', error);
    throw error;
  }
}

// Helper functions for test database management
export const testHelpers = {
  /**
   * Clean all test data from the database
   */
  async cleanDatabase(): Promise<void> {
    try {
      // Clean up test data in reverse dependency order
      await db.none('DELETE FROM dogs WHERE microchip_id LIKE $1', ['TEST_%']);
      await db.none('DELETE FROM registries WHERE name LIKE $1', ['Test%']);
      console.log('Test database cleaned successfully');
    } catch (error) {
      console.error('Failed to clean test database:', error);
      throw error;
    }
  },

  /**
   * Seed test data for WhoDoggy tests
   */
  async seedTestData(): Promise<void> {
    try {
      // Create test registries
      const testRegistry = await db.one(
        'INSERT INTO registries (name, country, contact) VALUES ($1, $2, $3) RETURNING id',
        ['Test Registry', 'Northern Ireland', 'test@registry.com']
      );

      // Create test dogs
      await db.none(
        'INSERT INTO dogs (microchip_id, name, breed, age, gender, owner_name, owner_email, owner_phone, address, registry_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
        ['TEST_123456789', 'Test Dog', 'Labrador', 5, 'Male', 'Test Owner', 'test@owner.com', '028 1234 5678', 'Test Address, Belfast', testRegistry.id]
      );

      console.log('Test data seeded successfully');
    } catch (error) {
      console.error('Failed to seed test data:', error);
      throw error;
    }
  },

  /**
   * Create a test microchip record
   */
  async createTestDog(microchipId: string, registryId?: number): Promise<any> {
    try {
      let testRegistryId = registryId;

      if (!testRegistryId) {
        const registry = await db.one(
          'INSERT INTO registries (name, country, contact) VALUES ($1, $2, $3) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id',
          ['Test Registry Default', 'Northern Ireland', 'test@default.com']
        );
        testRegistryId = registry.id;
      }

      const dog = await db.one(
        'INSERT INTO dogs (microchip_id, name, breed, age, gender, owner_name, owner_email, owner_phone, address, registry_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [microchipId, 'Test Dog', 'Test Breed', 3, 'Female', 'Test Owner', 'test@email.com', '028 9999 0000', 'Test City, NI', testRegistryId]
      );

      return dog;
    } catch (error) {
      console.error('Failed to create test dog:', error);
      throw error;
    }
  }
};

// Initialize test database connection
async function initializeTestDatabase(): Promise<void> {
  try {
    await testDatabaseConnection();
    console.log('Test database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize test database:', error);
    process.exit(1);
  }
}

// Cleanup function for test teardown
export async function teardownTests(): Promise<void> {
  try {
    await testHelpers.cleanDatabase();
    await pgp.end(); // Close all database connections
    console.log('Test teardown completed');
  } catch (error) {
    console.error('Error during test teardown:', error);
  }
}

// Handle process termination during tests
process.on('SIGINT', async () => {
  console.log('Received SIGINT during tests, cleaning up...');
  await teardownTests();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM during tests, cleaning up...');
  await teardownTests();
  process.exit(0);
});

// Initialize when this module is loaded
initializeTestDatabase().catch((error) => {
  console.error('Test initialization failed:', error);
  process.exit(1);
});

export { db, pgp };
