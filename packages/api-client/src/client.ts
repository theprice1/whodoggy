// packages/api-client/src/client.ts

/**
 * A placeholder API client for WhoDoggy.
 * Replace this with real API request logic later.
 */
export class WhoDoggyApiClient {
  constructor(private baseUrl: string) { }

  /**
   * Example method to fetch dog data by microchip ID.
   * Replace with real fetch logic later.
   */
  async getDogByChipId(chipId: string) {
    return {
      chipId,
      name: "Placeholder Dog",
      breed: "Unknown",
    };
  }
}
