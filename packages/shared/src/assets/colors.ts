// packages/shared/src/assets/colors.ts
export const Colors = {
  light: {
    primary: '#2D89EF',
    secondary: '#F5A623',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#2C3E50',
    textSecondary: '#666666',
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',
  },
  dark: {
    primary: '#4799F0',
    secondary: '#F7B84B',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#EAEAEA',
    textSecondary: '#999999',
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ColorName = keyof typeof Colors.light;
