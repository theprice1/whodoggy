// scripts/fix-imports.ts
import fs from 'fs';
import path from 'path';

const targetDir = path.resolve('packages/backend');
const EXTENSION_FIX = /\.js(['"])/g;

function fixFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!EXTENSION_FIX.test(content)) return;

  const updated = content.replace(EXTENSION_FIX, '.ts$1');
  fs.writeFileSync(filePath, updated);
  console.log('✅ Fixed:', filePath);
}

function walkDir(dir: string) {
  fs.readdirSync(dir).forEach((entry) => {
    const entryPath = path.join(dir, entry);
    const stat = fs.statSync(entryPath);

    if (stat.isDirectory()) {
      walkDir(entryPath);
    } else if (entryPath.endsWith('.ts')) {
      fixFile(entryPath);
    }
  });
}

walkDir(targetDir);
console.log('🔁 Import fix complete.');
