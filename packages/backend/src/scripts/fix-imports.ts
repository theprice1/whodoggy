// scripts/fix-imports.ts - Fix import extensions in TypeScript files
import fs from "node:fs";
import path from "node:path";

const targetDir = path.resolve("packages/backend");
const EXTENSION_FIX = /\.js(['"])/g;
const RELATIVE_IMPORT_FIX = /from\s+['"](\.\.?\/[^'"]*)['"]/g;
const PROBLEM_IMPORT_FIX = /from\s+['"](\.\.[\/\\])+['"]/g;

// Statistics tracking
let filesProcessed = 0;
let filesFixed = 0;
let problemImportsFound = 0;

function fixFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    let updated = content;
    let hasChanges = false;

    // Fix .js extensions to .js (keep them as .js for proper ES module resolution)
    if (EXTENSION_FIX.test(content)) {
      // Keep .js extensions for proper ES module resolution in Node.js
      console.log(`File ${filePath} already has .js extensions (keeping them)`);
    }

    // Fix problematic relative imports like '../../../../../../../'
    const problemMatches = content.match(PROBLEM_IMPORT_FIX);
    if (problemMatches) {
      problemImportsFound += problemMatches.length;
      console.warn(`Found ${problemMatches.length} problematic import(s) in ${filePath}:`);

      problemMatches.forEach(match => {
        console.warn(`  - ${match}`);
      });

      // Replace problematic imports with proper ones
      updated = updated.replace(
        /from\s+['"](\.\.[\/\\]){3,}['"]/g,
        `from '@prisma/client'` // Common replacement for Prisma imports
      );

      updated = updated.replace(
        /import\s+\{[^}]*\}\s+from\s+['"](\.\.[\/\\]){3,}['"];?/g,
        `import { PrismaClient } from '@prisma/client';`
      );

      hasChanges = true;
    }

    // Fix relative imports that might need .js extensions
    updated = updated.replace(RELATIVE_IMPORT_FIX, (match, importPath) => {
      // Only add .js if it's a relative import to a TypeScript file without an extension
      if (!importPath.includes('.') && (importPath.startsWith('./') || importPath.startsWith('../'))) {
        return match.replace(importPath, `${importPath}.js`);
      }
      return match;
    });

    if (updated !== content) {
      hasChanges = true;
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, updated, "utf8");
      filesFixed++;
      console.log(`Fixed: ${filePath}`);
    }

    filesProcessed++;

  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

function walkDir(dir: string): void {
  try {
    const entries = fs.readdirSync(dir);

    entries.forEach((entry) => {
      const entryPath = path.join(dir, entry);
      const stat = fs.statSync(entryPath);

      if (stat.isDirectory()) {
        // Skip node_modules and other directories we don't want to process
        if (!['node_modules', '.git', 'dist', 'build'].includes(entry)) {
          walkDir(entryPath);
        }
      } else if (entryPath.endsWith(".ts") || entryPath.endsWith(".js")) {
        fixFile(entryPath);
      }
    });
  } catch (error) {
    console.error(`Error walking directory ${dir}:`, error);
  }
}

// Enhanced import fixing for WhoDoggy project
function fixWhoDoggyImports(): void {
  console.log("Starting WhoDoggy import fixes...");
  console.log(`Target directory: ${targetDir}`);

  // Check if target directory exists
  if (!fs.existsSync(targetDir)) {
    console.error(`Target directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  walkDir(targetDir);

  console.log("\nImport fix summary:");
  console.log(`  Files processed: ${filesProcessed}`);
  console.log(`  Files fixed: ${filesFixed}`);
  console.log(`  Problematic imports found: ${problemImportsFound}`);

  if (problemImportsFound > 0) {
    console.log("\nRecommendations:");
    console.log("1. Check fixed imports to ensure they point to correct modules");
    console.log("2. Install missing dependencies if needed:");
    console.log("   npm install @prisma/client pg express");
    console.log("3. Update import paths to use proper relative paths or module names");
  }

  console.log("\nImport fix complete!");
}

// Common import fixes for WhoDoggy project
const COMMON_FIXES: Record<string, string> = {
  // Prisma imports
  '../../../../../../../': '@prisma/client',
  '../../../../../../': '@prisma/client',
  '../../../../../../../../': '@prisma/client',

  // Express imports
  'from "express"': 'from "express"',

  // Node.js built-ins
  'from "fs"': 'from "node:fs"',
  'from "path"': 'from "node:path"',
  'from "url"': 'from "node:url"',
};

function applyCommonFixes(content: string): string {
  let updated = content;

  Object.entries(COMMON_FIXES).forEach(([problematic, correct]) => {
    const regex = new RegExp(problematic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    updated = updated.replace(regex, correct);
  });

  return updated;
}

// Run the import fixer
if (require.main === module) {
  fixWhoDoggyImports();
}
