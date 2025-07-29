// packages/web/tailwind.config.js
const { theme } = require('../../shared/styles/theme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        background: theme.colors.background,
        text: theme.colors.text,
        muted: theme.colors.muted,
      },
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      fontSize: theme.fontSize,
    },
  },
  plugins: [],
};
