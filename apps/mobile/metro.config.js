// apps/mobile/metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const _path = require("node:path");

const _projectRoot = __dirname;
const _workspaceRoot = path.resolve(projectRoot, "../..");

const _config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, "node_modules"),
	path.resolve(workspaceRoot, "node_modules"),
];

module.exports = config;
