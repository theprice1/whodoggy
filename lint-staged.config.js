module.exports = {
  "apps/**/src/**/*.{ts,tsx,js,jsx,json,css,md}": ["biome format --write", "biome lint --fix"],
  "packages/**/src/**/*.{ts,tsx,js,jsx,json,css,md}": ["biome format --write", "biome lint --fix"]
};
