// apps/mobile/metro.config.cjs
/* CommonJS on purpose: Metro uses require() to load this file */
const path = require("path");
const { getDefaultConfig } = require("@expo/metro-config");

/**
 * Absolute paths we’ll reference
 */
const projectRoot = __dirname;                          // apps/mobile
const monorepoRoot = path.resolve(projectRoot, "../.."); // repo root
const sharedSrc = path.resolve(monorepoRoot, "packages/shared/src");

const config = getDefaultConfig(projectRoot);

/**
 * 1) Make Metro watch your monorepo packages (so edits in @whodoggy/shared trigger rebuilds).
 *    You can list specific packages or just the whole repo root; being explicit is usually faster.
 */
config.watchFolders = [
  path.resolve(monorepoRoot, "packages/shared"),
];

/**
 * 2) Ensure all modules resolve from a single node_modules (avoid dup Reacts).
 *    With pnpm, node_modules lives at the repo root; we also add the app’s node_modules for safety.
 */
config.resolver.nodeModulesPaths = [
  path.resolve(monorepoRoot, "node_modules"),
  path.resolve(projectRoot, "node_modules"),
];

/**
 * 3) Force Metro to use the single copies of react and react-native from the app (or root).
 *    This avoids "Invalid hook call" from duplicate React copies.
 */
config.resolver.extraNodeModules = {
  react: path.resolve(monorepoRoot, "node_modules/react"),
  "react-native": path.resolve(monorepoRoot, "node_modules/react-native"),
};

/**
 * 4) (Optional but handy) Alias @whodoggy/shared to its source folder.
 *    This makes imports like `import { x } from '@whodoggy/shared'` point at your TS sources.
 *    Metro (0.76+) supports resolver.alias.
 */
config.resolver.alias = {
  "@whodoggy/shared": sharedSrc,
};

/**
 * 5) Don’t let Metro walk up the tree and accidentally pull another copy of deps.
 *    (Available on current Metro versions; harmless if ignored.)
 */
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
