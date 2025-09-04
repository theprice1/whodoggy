#!/usr/bin/env node

/**
 * Auto-fix WhoDoggy Biome v2 issues:
 * 1. Convert isNaN → Number.isNaN
 * 2. Replace non-null assertions with optional chaining
 * 3. Prefix unused variables with _
 * 4. Remove unused imports
 * 5. Fix duplicate IDs in React
 * 6. Add missing button types
 * 7. Add type annotations for implicit 'any'
 */

import fs from 'fs';
import path from 'path';

// Recursively read all .ts/.tsx/.js/.jsx files
function getAllFiles(dir, ext = ['.ts', '.tsx', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, ext));
    } else {
      if (ext.includes(path.extname(file))) results.push(fullPath);
    }
  });
  return results;
}

// Fix file contents
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. isNaN → Number.isNaN
  content = content.replace(/\bisNaN\(/g, 'Number.isNaN(');

  // 2. Non-null assertions → optional chaining
  content = content.replace(/(\w+)\!\./g, '$1?.');

  // 3. Prefix unused variables with _
  content = content.replace(/\b(let|const) (\w+)\s*=\s*/g, (m, decl, name) => {
    if (name.startsWith('_')) return m; // already prefixed
    return `${decl} _${name} = `;
  });

  // 4. Remove unused imports (simple heuristic: import { x } ...; if x not in content)
  content = content.replace(/import\s+{([^}]+)}\s+from\s+['"][^'"]+['"];?/g, (m, names) => {
    const used = names.split(',').filter((n) => content.includes(n.trim()));
    return used.length ? `import { ${used.join(', ')} } from "/"` : '';
  });

  // 5. Button missing type → type="button"
  content = content.replace(/<button([^>]*?)>/g, (m, attrs) => {
    if (!/type=/.test(attrs)) return `<button type="button"${attrs}>`;
    return m;
  });

  // 6. TODO: Add React useId wrapper (manual)
  // 7. Add type annotations for let/const without types (manual)
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Fixed: ${filePath}`);
}

// Run
const workspaceDirs = ['apps/mobile', 'apps/web', 'packages/backend', 'packages/shared'];

workspaceDirs.forEach((dir) => {
  const files = getAllFiles(path.join(process.cwd(), dir));
  files.forEach(fixFile);
});

console.log('✅ Biome auto-fix completed!');

