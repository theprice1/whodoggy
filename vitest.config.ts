import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom", // For React components
		setupFiles: ["./test/setup.ts"],
		globals: true,
	},
	resolve: {
		alias: {
			"react-native": "react-native-web",
		},
	},
});
