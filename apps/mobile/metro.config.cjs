// apps/mobile/metro.config.cjs
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Force Metro to resolve workspace packages
config.resolver.disableHierarchicalLookup = true;

// Explicitly set the project root
config.projectRoot = projectRoot;

// Set the entry point
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Fix the entry point resolution
      if (req.url === '/index.bundle') {
        req.url = '/index.bundle';
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
