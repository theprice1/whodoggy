import { vi } from "vitest";

// Mock React Native modules for jsdom environment
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock Expo modules
vi.mock("expo-constants", () => ({
	default: {
		appOwnership: "standalone",
		expoVersion: "1.0.0",
	},
}));

// Mock React Native platform detection
vi.mock("react-native", async () => {
	const RN = await vi.importActual("react-native-web");
	return {
		...RN,
		Platform: {
			OS: "web",
			select: vi.fn((obj) => obj.web || obj.default),
		},
	};
});

// Set React Native development flag
Object.defineProperty(globalThis, "__DEV__", {
	writable: true,
	value: true,
});
