import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
	},
	resolve: {
		alias: {
			"@": "./src",
			"@whodoggy/shared": path.resolve("../../packages/shared/src"),
			"@whodoggy/api-client": path.resolve("../../packages/api-client/src"),
		},
	},
});
