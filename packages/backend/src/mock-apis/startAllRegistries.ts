import { spawn } from 'child_process';
import path from 'path';

const totalRegistries = 22;
const basePort = 4101;
const openapiDir = path.resolve(__dirname, '../../openapi');

for (let i = 1; i <= totalRegistries; i++) {
  const fileName = `registry${i}.yaml`;
  const port = basePort + i - 1;
  const filePath = path.join(openapiDir, fileName);

  const child = spawn(
    'npx',
    ['@stoplight/prism-cli', 'mock', filePath, '-p', port.toString()],
    {
      stdio: 'inherit',
      shell: true,
    }
  );

  child.on('error', (err) => {
    console.error(`❌ Error starting mock for registry${i}:`, err);
  });
}
