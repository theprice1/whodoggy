// fix-imports.js
import fs from 'fs';
import path from 'path';

const rootDirs = [
  './apps/web/src',
  './apps/mobile/src',
  './packages/backend/src',
];

// Regex to find import statements with trailing `.ts` or `.tsx` outside quotes
const importRegex = /(import\s.+?from\s+['"])(.+?)(\.tsx?|\.ts)(['"])(;?)/g;

// Helper to fix a single file
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix trailing extensions outside quotes
  content = content.replace(importRegex, (_, start, p1, ext, quote, semi) => {
    // Remove the extension before the closing quote
    return `${start}${p1}${quote}${semi || ''}`;
  });

  // Fix unterminated quotes - add closing quote if missing
  // Match import lines missing a closing quote
  content = content.replace(/(import\s.+?from\s+['"])([^'"]+)(;?)(\r?\n)/g, (match, start, pathPart, semi, nl) => {
    // Check if pathPart ends with a quote - if not add closing quote and semicolon if missing
    if (!pathPart.endsWith(`'`) && !pathPart.endsWith(`"`)) {
      return `${start}${pathPart}'${semi ? semi : ';'}${nl}`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Fixed imports in: ${filePath}`);
}

// Recursive directory traversal
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
      fixFile(fullPath);
    }
  }
}

// Run fixes for all root dirs
for (const dir of rootDirs) {
  const absoluteDir = path.resolve(dir);
  if (fs.existsSync(absoluteDir)) {
    walkDir(absoluteDir);
  } else {
    console.warn(`Directory not found: ${absoluteDir}`);
  }
}
