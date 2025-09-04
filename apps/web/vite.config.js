import { defineConfig } from "../../";
import path from "node:path";
import react from "@vitejs/plugin-react";

export default defineConfig({
	root: path.resolve(__dirname, "src"), // Entry point folder containing index.html
	plugins: [react()],
	css: {
		postcss: path.resolve(__dirname, "postcss.config.js"), // Explicit postcss config
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"), // Use absolute path for alias
		},
	},
	build: {
		outDir: path.resolve(__dirname, "dist"),
		emptyOutDir: true,
	},
});
