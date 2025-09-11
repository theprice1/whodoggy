// packages/shared/src/assets/colors.ts
export const BrandColors = {
  // Core brand colors from SVG designs
  trustBlue: '#2D89EF',
  dogGold: '#F5A623',

  // Extended palette for gradients
  trustBlueLight: '#5BA3F2',
  trustBlueDark: '#1E5AA8',
  dogGoldLight: '#F7B84B',
  dogGoldDark: '#D4941C',

  // Status colors from status icons
  successGreen: '#28A745',
  warningYellow: '#FFC107',
  errorRed: '#DC3545',
  infoBlue: '#17A2B8',

  // Neutral palette
  gray50: '#F9F9F9',
  gray100: '#F5F5F5',
  gray200: '#E0E0E0',
  gray300: '#CCCCCC',
  gray400: '#999999',
  gray500: '#666666',
  gray600: '#4A4A4A',
  gray700: '#2C3E50',
  gray800: '#1A1A1A',
  gray900: '#000000',
} as const;

export type BrandColorKey = keyof typeof BrandColors;
export default BrandColors;
