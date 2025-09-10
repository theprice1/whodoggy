export const WhoDoggyColors = {
  // Primary brand colors
  primary: '#2D89EF',      // Trust Blue
  secondary: '#F5A623',    // Dog Gold

  // Neutral colors
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#2C3E50',
  textSecondary: '#666666',
  border: '#E0E0E0',

  // Semantic colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',

  // Dark mode
  dark: {
    primary: '#4799F0',
    secondary: '#F7B84B',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#EAEAEA',
    textSecondary: '#999999',
    border: '#2C3E50',
  }
} as const;

export type ColorName = keyof typeof WhoDoggyColors;
