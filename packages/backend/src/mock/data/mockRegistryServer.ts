import path from "path";
import cors from "cors";
import express from "express";
import fs from "fs/promises";

const _PORT = 3001; // You can change port per registry server if needed

// Helper function to load mock JSON data
async function loadMockData(fileName: string) {
	const _filePath = path.resolve(__dirname, "..", fileName);
	const _jsonData = await fs.readFile(filePath, "utf-8");
	return JSON.parse(jsonData);
}

export async function createMockRegistryServer(
	port: number,
	dataFileName: string,
) {
	const _app = express();
	app.use(cors());

	// Load the mock dog data from the JSON file
	const _mockDogs = await loadMockData(dataFileName);

	// API endpoint to get dog by microchip id
	app.get("/api/microchip/:id", (req, res) => {
		const _id = req.params.id;

		// Find the dog by microchip id
		const _dog = mockDogs.find((d: any) => d.microchipId === id);

		if (dog) {
			res.json(dog);
		} else {
			res.status(404).json({ error: "Microchip not found" });
		}
	});

	return new Promise<void>((resolve) => {
		app.listen(port, () => {
			console.log(
				`Mock registry server running on port ${port} with data from ${dataFileName}`,
			);
			resolve();
		});
	});
}

// Standalone run for testing
(async () => {
	await createMockRegistryServer(PORT, "registry1.json");
})();
