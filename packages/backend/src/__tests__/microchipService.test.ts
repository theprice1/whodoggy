import { describe, expect, it } from "vitest";

// Mock microchip data function
const getMicrochipData = async (id: string) => {
	// Mock implementation
	if (id === "1234567890") {
		return [{ dogName: "Fido", ownerId: "test-owner" }];
	}
	return [];
};

describe("getMicrochipData", () => {
	it("returns record for valid ID", async () => {
		const result = await getMicrochipData("1234567890");
		expect(result.length).toBeGreaterThan(0);
		expect(result[0]).toHaveProperty("dogName", "Fido");
	});

	it("returns empty array for invalid ID", async () => {
		const result = await getMicrochipData("invalid-id");
		expect(result).toEqual([]);
	});
});
