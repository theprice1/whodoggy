import { pool } from "../../packages/backend/src/db.js";

async function seed() {
	try {
		console.log("Cleaning existing data...");

		// Delete existing data (order matters due to foreign keys)
		await pool.query("DELETE FROM microchips");
		await pool.query("DELETE FROM dogs");
		await pool.query("DELETE FROM owners");
		await pool.query("DELETE FROM registries");

		console.log("Inserting registries...");
		await pool.query(`
      INSERT INTO registries (id, name, base_url, country) VALUES
      (1, 'Registry One', 'https://registry1.example.com', 'USA'),
      (2, 'Registry Two', 'https://registry2.example.com', 'UK')
    `);

		console.log("Inserting owners...");
		const ownerResult = await pool.query<{ id: string }>(`
      INSERT INTO owners (id, name, email) VALUES
      (gen_random_uuid(), 'John Doe', 'john@example.com'),
      (gen_random_uuid(), 'Jane Smith', 'jane@example.com')
      RETURNING id
    `);

		const ownerIds = ownerResult.rows.map((row) => row.id);

		console.log("Inserting dogs...");
		await pool.query(
			`
      INSERT INTO dogs (id, name, microchip_id, breed, owner_id, registry_id) VALUES
      (gen_random_uuid(), 'Fido', 'MC123456', 'Labrador', $1, 1),
      (gen_random_uuid(), 'Spot', 'MC654321', 'Dalmatian', $2, 2)
      `,
			[ownerIds[0], ownerIds[1]],
		);

		console.log("Fetching dog IDs for microchip insertion...");
		const dogResult = await pool.query<{
			microchip_id: any;
			id: string;
		}>(`
      SELECT id, microchip_id FROM dogs WHERE microchip_id IN ('MC123456', 'MC654321')
    `);

		// Map chip numbers to dog IDs for microchip insertion
		const chipDogMap = new Map(
			dogResult.rows.map((row) => [row.microchip_id, row.id]),
		);

		console.log("Inserting microchips...");
		await pool.query(
			`
      INSERT INTO microchips (id, chip_number, dog_id) VALUES
      (gen_random_uuid(), 'MC123456', $1),
      (gen_random_uuid(), 'MC654321', $2)
      `,
			[chipDogMap.get("MC123456"), chipDogMap.get("MC654321")],
		);

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		await pool.end();
	}
}

seed();
