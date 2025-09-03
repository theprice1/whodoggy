// fix-imports.js
import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'apps/web');

function fixImports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fixImports(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.mjs')) {
      let content = fs.readFileSync(fullPath, 'utf-8');

      // Fix invalid import statements like: '../../theme.js.js'.ts -> '../../theme.js'
      const fixedContent = content.replace(
        /(['"])(.*?\.js)\.js['"]\.ts/g,
        '$1$2$1'
      );

      if (fixedContent !== content) {
        fs.writeFileSync(fullPath, fixedContent, 'utf-8');
        console.log(`Fixed imports in: ${fullPath}`);
      }
    }
  }
}

fixImports(rootDir);
console.log('All imports fixed!');
