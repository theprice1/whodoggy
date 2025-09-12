import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./test-setup.ts"],
		deps: {
			optimizer: {
				web: {
					include: ["@testing-library/react-native"],
				},
			},
		},
	},
	resolve: {
		alias: {
			"react-native": "react-native-web",
			"react-native/Libraries/react-native/react-native-implementation":
				"react-native-web",
		},
	},
	define: {
		__DEV__: true,
		"process.env.NODE_ENV": '"test"',
	},
});
