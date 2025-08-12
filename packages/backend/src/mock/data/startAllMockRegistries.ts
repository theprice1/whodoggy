import { createMockRegistryServer } from './mockRegistryServer.js.js';

const startPort = 4101;
const numberOfRegistries = 22;

for (let i = 0; i < numberOfRegistries; i++) {
  const port = startPort + i;
  const dataFileName = `registry${i + 1}.json`; // define this BEFORE use
  createMockRegistryServer(port, dataFileName); // now TypeScript is happy
}
