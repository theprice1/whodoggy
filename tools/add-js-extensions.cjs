/* Adds `.js` to relative import/export specifiers for NodeNext ESM.
   Handles:  import ... from './x'
             export * from './x'
             export { foo } from '../y/index'
   Resolves './file', './file.ts', './file.tsx', './dir/index.ts[x]' to the right `.js` path. */

const fs = require("node:fs");
const path = require("node:path");

const extsToCheck = [".ts", ".tsx", ".mts", ".cts"];
const rx = /\b(from\s*|import\s*)(['"])(\.{1,2}\/[^'"]+)(['"])/g;

function fileExists(p) {
  try { fs.accessSync(p, fs.constants.F_OK); return true; } catch { return false; }
}

function resolveToJs(specifier, basedir) {
  // absolute on disk for probing
  const abs = path.resolve(basedir, specifier);
  // If specifier already ends with known source ext → replace with .js
  for (const ext of extsToCheck) {
    if (abs.endsWith(ext) && fileExists(abs)) {
      return specifier.replace(new RegExp(`${ext}$`), ".js");
    }
  }
  // If specifier has .js already, leave it
  if (abs.endsWith(".js")) return specifier;

  // Try as a file without ext
  for (const ext of extsToCheck) {
    if (fileExists(abs + ext)) return specifier + ".js";
  }
  // Try as a directory with index
  for (const ext of extsToCheck) {
    if (fileExists(path.join(abs, "index" + ext))) return path.join(specifier, "index.js").replace(/\\/g, "/");
  }
  // Fallback: just append .js (best effort)
  return specifier + ".js";
}

function processFile(file) {
  const src = fs.readFileSync(file, "utf8");
  let changed = false;
  const out = src.replace(rx, (m, prefix, q1, spec, q2) => {
    const next = resolveToJs(spec, path.dirname(file));
    if (next !== spec) changed = true;
    return `${prefix}${q1}${next}${q2}`;
  });
  if (changed) fs.writeFileSync(file, out, "utf8");
  return changed;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx|mts|cts)$/.test(e.name)) processFile(p);
  }
}

const roots = process.argv.slice(2);
if (roots.length === 0) {
  console.error("Usage: node tools/add-js-extensions.cjs <dir1> <dir2> ...");
  process.exit(1);
}
for (const r of roots) walk(r);

console.log("Done: added .js extensions where needed.");
