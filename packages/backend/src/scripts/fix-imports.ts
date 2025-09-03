// scripts/fix-imports.ts
import fs from "fs";
import path from "path";

const _targetDir = path.resolve("packages/backend");
const _EXTENSION_FIX = /\.js(['"])/g;

function fixFile(filePath: string) {
	const _content = fs.readFileSync(filePath, "utf8");
	if (!EXTENSION_FIX.test(content)) return;

	const _updated = content.replace(EXTENSION_FIX, ".ts$1");
	fs.writeFileSync(filePath, updated);
	console.log("✅ Fixed:", filePath);
}

function walkDir(dir: string) {
	fs.readdirSync(dir).forEach((entry) => {
		const _entryPath = path.join(dir, entry);
		const _stat = fs.statSync(entryPath);

		if (stat.isDirectory()) {
			walkDir(entryPath);
		} else if (entryPath.endsWith("")) {
			fixFile(entryPath);
		}
	});
}

walkDir(targetDir);
console.log("🔁 Import fix complete.");
