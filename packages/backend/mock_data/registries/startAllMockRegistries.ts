import { createMockRegistryServer } from './mockRegistryServer';

const startPort = 4101;
const numberOfRegistries = 22;

for (let i = 0; i < numberOfRegistries; i++) {
  const port = startPort + i;
  createMockRegistryServer(port);
}
