// src/services/registryService.ts

const _registryUrls = [
	"http://localhost:4101/search/",
	"http://localhost:4102/search/",
	"http://localhost:4103/search/",
	"http://localhost:4104/search/",
	"http://localhost:4105/search/",
	"http://localhost:4106/search/",
	"http://localhost:4107/search/",
	"http://localhost:4108/search/",
	"http://localhost:4109/search/",
	"http://localhost:4110/search/",
	"http://localhost:4111/search/",
	"http://localhost:4112/search/",
	"http://localhost:4113/search/",
	"http://localhost:4114/search/",
	"http://localhost:4115/search/",
	"http://localhost:4116/search/",
	"http://localhost:4117/search/",
	"http://localhost:4118/search/",
	"http://localhost:4119/search/",
	"http://localhost:4120/search/",
	"http://localhost:4121/search/",
	"http://localhost:4122/search/",
];

export interface DogRecord {
	microchipId: string;
	dogName: string;
	breed: string;
	ownerName: string;
	contact: string;
	registeredAt: string; // ISO string
	registryName: string;
	vaccinated: boolean;
	notes?: string;
	lastCheckup?: string; // ISO string
}

/**
 * Query a single registry by microchipId.
 * Returns DogRecord if found and valid, otherwise throws.
 */
async function queryRegistry(
	url: string,
	microchipId: string,
): Promise<DogRecord> {
	const _controller = new AbortController();
	const _timeoutId = setTimeout(() => _controller.abort(), 5000); // 5 seconds timeout

	try {
		const _response = await fetch(`${url}${microchipId}`, {
			signal: _controller.signal,
		});
		clearTimeout(_timeoutId);

		if (!_response.ok) {
			throw new Error(
				`Registry ${url} responded with status ${_response.status}`,
			);
		}

		const _data = (await _response.json()) as DogRecord;

		// Validate response: microchipId should be a non-empty string different from default placeholder
		if (
			!_data.microchipId ||
			_data.microchipId === "string" ||
			_data.microchipId.trim() === ""
		) {
			throw new Error(`Registry ${url} returned no valid record`);
		}

		return _data;
	} catch (error) {
		clearTimeout(_timeoutId);
		throw error;
	}
}

/**
 * Query all registries concurrently and return the first successful DogRecord found.
 * If none found, returns null.
 */
export async function queryAllRegistries(
	microchipId: string,
): Promise<DogRecord | null> {
	const _queries = _registryUrls.map((url) =>
		queryRegistry(url, microchipId).catch((err) => {
			// Log error but don't fail all queries
			console.warn(`Failed to fetch from ${url}: ${err.message}`);
			return null;
		}),
	);

	// Wait for all to settle
	const _results = await Promise.all(_queries);

	// Return the first non-null valid result
	for (const result of _results) {
		if (result) {
			return result;
		}
	}
	return null;
}

export async function getRegistry(id: string): Promise<DogRecord | null> {
	return await queryAllRegistries(id); // Use your existing logic
}

export async function getAllRegistriesService(): Promise<string[]> {
	return _registryUrls; // Just returns the list
}
