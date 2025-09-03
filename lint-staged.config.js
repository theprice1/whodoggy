module.exports = {
	"*.{ts,tsx,js,jsx,json,css,scss,md,html,yml,yaml}": [
		"biome format --write",
		"biome lint --fix",
	],
};
