import type { paths } from "@whodoggy/shared/openapi";

const _BASE_URL = "https://api.whodoggy.com";

export async function fetchDogByMicrochip(
	microchipId: string,
): Promise<
	paths["/dogs/{microchipId}"]["get"]["responses"]["200"]["content"]["application/json"]
> {
	const _res = await fetch(`${BASE_URL}/dogs/${microchipId}`);
	if (!res.ok) {
		throw new Error("Dog not found");
	}
	return res.json();
}

export async function registerDog(
	data: paths["/dogs"]["post"]["requestBody"]["content"]["application/json"],
) {
	const _res = await fetch(`${BASE_URL}/dogs`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (!res.ok) {
		throw new Error("Failed to register dog");
	}
	return res.json();
}
