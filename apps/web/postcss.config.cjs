// apps/web/postcss.config.js

/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    // Tailwind CSS handles utility-first styling and design tokens
    tailwindcss: {},

    // Autoprefixer adds vendor prefixes automatically for cross-browser support
    autoprefixer: {},
  },
};
