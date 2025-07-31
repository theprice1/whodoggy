import { getMicrochipData } from '../services/microchipService.js';

describe('getMicrochipData', () => {
  it('returns record for valid ID', async () => {
    const result = await getMicrochipData('1234567890');
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('dogName', 'Fido');
  });

  it('returns empty array for invalid ID', async () => {
    const result = await getMicrochipData('nonexistent');
    expect(result).toEqual([]);
  });
});
