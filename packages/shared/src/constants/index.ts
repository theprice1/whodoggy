// WhoDoggy Application Constants

export const APP_CONFIG = {
	name: "WhoDoggy",
	version: "1.0.0",
	description: "Microchip Registry Application",
} as const;

export const API_ENDPOINTS = {
	microchip: "/api/microchip",
	dogs: "/api/dogs",
	owners: "/api/owners",
	registries: "/api/registries",
	search: "/api/search",
} as const;

export const MICROCHIP_PATTERNS = {
	ISO_11784_11785: /^\d{15}$/,
	AVID: /^[A-Za-z0-9]{10}$/,
	HOME_AGAIN: /^[A-Za-z0-9]{9,10}$/,
} as const;

export const SUPPORTED_REGISTRIES = [
	"Pet Microchip Lookup",
	"AAHA Universal Pet Microchip Lookup",
	"Found Animals Registry",
	"Free Pet Chip Registry",
	"National Board of Veterinary Medical Examiners",
] as const;

export const ERROR_MESSAGES = {
	NETWORK_ERROR:
		"Network connection error. Please check your internet connection.",
	INVALID_MICROCHIP: "Invalid microchip ID format.",
	DOG_NOT_FOUND: "No dog found with this microchip ID.",
	SERVER_ERROR: "Server error. Please try again later.",
} as const;

export const SUCCESS_MESSAGES = {
	DOG_FOUND: "Dog found successfully!",
	OWNER_CONTACTED: "Owner has been contacted.",
	REGISTRY_UPDATED: "Registry information updated.",
} as const;
