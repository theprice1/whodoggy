// apps/web/vitest.config.ts
import { defineConfig } from "...";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		exclude: ["node_modules", "dist"],
	},
	resolve: {
		alias: {
			"@whodoggy/shared": "/packages/shared/src",
		},
	},
});
