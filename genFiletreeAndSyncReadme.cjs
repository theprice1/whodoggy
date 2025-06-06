const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const docsReadmePath = path.join(rootDir, 'docs', 'README.md');
const rootReadmePath = path.join(rootDir, 'README.md');

function generateTreeCommand() {
  // You can customize ignore list if needed
  const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.expo', '.next'];
  const ignorePattern = ignoreDirs.join('|');
  return `tree -I "${ignorePattern}" -L 6 /F /A`;
}

function syncReadmeAndAppendFiletree() {
  try {
    const docsContent = fs.readFileSync(docsReadmePath, 'utf8');
    fs.writeFileSync(rootReadmePath, docsContent);
    console.log('Root README.md synced with docs/README.md');

    const treeOutput = execSync(generateTreeCommand(), { encoding: 'utf8' });

    const filetreeSection = `

---

## Project File Structure

\`\`\`
${treeOutput.trim()}
\`\`\`
`;

    fs.appendFileSync(rootReadmePath, filetreeSection);
    console.log('File tree appended to root README.md');
  } catch (error) {
    console.error('Error:', error);
  }
}

syncReadmeAndAppendFiletree();
// Run the script
// node genFiletreeAndSyncReadme.cjs