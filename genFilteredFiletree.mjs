import fs from 'fs';
import path from 'path';

const IGNORED_FOLDERS = new Set([
  'node_modules', '.git', 'dist', 'build', '.expo', '.next'
]);

const outputFile = path.resolve('docs', 'FILE_STRUCTURE.md');
const rootDir = process.cwd();

function generateTree(dir, prefix = '') {
  let treeStr = '';
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => !IGNORED_FOLDERS.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  entries.forEach((entry, i) => {
    const isLast = i === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    treeStr += prefix + pointer + entry.name + (entry.isDirectory() ? '/' : '') + '\n';

    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      treeStr += generateTree(path.join(dir, entry.name), newPrefix);
    }
  });

  return treeStr;
}

function main() {
  if (!fs.existsSync(path.dirname(outputFile))) {
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  }
  const tree = generateTree(rootDir);
  fs.writeFileSync(outputFile, tree, 'utf8');
  console.log(`File tree saved to ${outputFile}`);
}

main();
