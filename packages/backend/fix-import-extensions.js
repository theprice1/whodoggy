import path from "path";
import fs from "fs/promises";

const _dirPath = path.resolve("./src");

const _importRegex = /(import\s+.*?\s+from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g;

async function fixFileImports(filePath) {
	let _content = await fs.readFile(filePath, "utf8");

	content = content.replace(importRegex, (match, start, importPath, end) => {
		if (
			importPath.endsWith(".js") ||
			importPath.endsWith(".json") ||
			importPath.endsWith(".css") ||
			importPath.endsWith("")
		) {
			return match;
		}
		return `${start}${importPath}.js${end}`;
	});

	await fs.writeFile(filePath, content, "utf8");
	console.log(`Fixed imports in: ${filePath}`);
}

async function walkDir(dir) {
	const _entries = await fs.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const _fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walkDir(fullPath);
		} else if (entry.isFile() && fullPath.endsWith("")) {
			await fixFileImports(fullPath);
		}
	}
}

walkDir(dirPath)
	.then(() => console.log("All imports fixed!"))
	.catch((err) => console.error("Error fixing imports:", err));
