// packages/web/tailwind.config.js
const theme = require('../../shared/styles/theme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: theme.colors?.primary ?? '#4B9CD3',
        secondary: theme.colors?.secondary ?? '#FFD700',
        background: theme.colors?.background ?? '#F8FAFC',
        text: theme.colors?.text ?? '#1F2937',
        muted: theme.colors?.muted ?? '#9CA3AF',
      },
      spacing: theme.spacing ?? {},
      borderRadius: theme.borderRadius ?? {},
      fontSize: theme.fontSize ?? {},
    },
  },
  plugins: [],
};
