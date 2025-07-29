import theme from '../../packages/shared/styles/theme.js';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
