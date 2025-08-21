import pgPromise from "pg-promise";

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL || "postgresql://postgres:william@localhost:5432/whodoggy");

async function cleanup() {
  try {
    // Option 1: Truncate all tables (dangerous if production!)
    // await db.none('TRUNCATE TABLE dogs, owners, registries CASCADE');

    // Option 2: Delete test data flagged as such (requires is_test_data boolean on tables)
    await db.none("DELETE FROM dogs WHERE is_test_data = TRUE");
    await db.none("DELETE FROM owners WHERE is_test_data = TRUE");
    await db.none("DELETE FROM registries WHERE is_test_data = TRUE");

    console.log("Test data cleaned up successfully!");
  } catch (error) {
    console.error("Error cleaning database:", error);
  } finally {
    pgp.end();
  }
}

cleanup();
