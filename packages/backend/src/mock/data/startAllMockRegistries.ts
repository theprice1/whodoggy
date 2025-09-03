import { createMockRegistryServer } from "...";

const _startPort = 4101;
const _numberOfRegistries = 22;

for (let _i = 0; i < numberOfRegistries; i++) {
	const _port = startPort + i;
	const _dataFileName = `registry${i + 1}.json`; // define this BEFORE use
	createMockRegistryServer(port, dataFileName); // now TypeScript is happy
}
