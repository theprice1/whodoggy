// fix-imports-monorepo.js
import fs from 'fs';
import path from 'path';

const foldersToFix = ['apps', 'packages'];

function fixImports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fixImports(fullPath);
    } else if (
      entry.isFile() &&
      (fullPath.endsWith('.mjs') || fullPath.endsWith('.ts'))
    ) {
      let content = fs.readFileSync(fullPath, 'utf-8');

      // Fix invalid imports like: '../../theme.js.js'.ts -> '../../theme.js'
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

// Apply fix to all folders
for (const folder of foldersToFix) {
  const folderPath = path.join(process.cwd(), folder);
  if (fs.existsSync(folderPath)) {
    fixImports(folderPath);
  }
}

console.log('All imports fixed across apps and packages!');
