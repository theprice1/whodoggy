// src/__tests__/setup.ts
import { execSync } from 'child_process';

// Run migrations and seed DB before tests (optional, adapt as needed)
beforeAll(() => {
  execSync('pnpm run migrate');
  execSync('pnpm run seed-db');
});
