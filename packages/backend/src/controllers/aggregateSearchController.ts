import axios from "axios";
// controllers/aggregateSearchController.ts
import express, { type Request, type Response } from "express";

const router: express.Router = express.Router();

// Define the expected structure of a registry response
interface RegistryResponse {
	registry: string;
	microchip: string;
}

// Define the structure of each search result
interface SearchResult {
	success: boolean;
	data?: RegistryResponse;
	error?: any;
}

// List of all mock registry URLs
const _registryEndpoints = Array.from(
	{ length: 22 },
	(_, i) => `http://localhost:${4001 + i}/search`,
);

router.post("/search", async (req: Request, res: Response) => {
	const { microchip_id } = req.body;

	if (!microchip_id) {
		return res.status(400).json({ error: "microchip_id is required" });
	}

	try {
		// Prepare a request to all registries
		const searchPromises: Promise<SearchResult>[] = registryEndpoints.map(
			(url) =>
				new Promise<SearchResult>((resolve) => {
					axios
						.post(url, { microchip_id })
						.then((response) => {
							resolve({
								success: true,
								data: response.data as RegistryResponse,
							});
						})
						.catch((error) => {
							resolve({ success: false, error });
						});
				}),
		);
		// Execute all search requests in parallel

		const results: SearchResult[] = await Promise.all(searchPromises);

		// Find the first successful result with a microchip
		const _match = results.find(
			(result) => result.success && result.data?.microchip,
		);

		if (match && match.data) {
			return res.status(200).json({
				found: true,
				registry: match.data.registry,
				data: match.data.microchip,
			});
		} else {
			return res
				.status(404)
				.json({ found: false, message: "Microchip not found in any registry" });
		}
	} catch (error) {
		console.error("Aggregator error:", error);
		return res
			.status(500)
			.json({ error: "Internal server error during aggregation" });
	}
});

export default router;
// Note: This code assumes that each registry service is running on a different port from 4001 to 4022.
// Adjust the port range as necessary based on your actual service setup.
