// packages/shared/src/assets/images.ts
export const Images = {
  logo: {
    primary: 'logo.svg',
    dark: 'logo-dark.svg',
    icon: 'icon.png',
  },
  placeholders: {
    dog: 'placeholders/dog-placeholder.png',
    owner: 'placeholders/owner-placeholder.png',
    noImage: 'placeholders/no-image.png',
  },
  illustrations: {
    login: 'illustrations/login.svg',
    signup: 'illustrations/signup.svg',
    forgotPassword: 'illustrations/forgot-password.svg',
    emptyState: 'illustrations/empty-state.svg',
    success: 'illustrations/success.svg',
    error: 'illustrations/error.svg',
    noResults: 'illustrations/no-results.svg',
  },
  backgrounds: {
    splash: 'backgrounds/splash.png',
    hero: 'backgrounds/hero.jpg',
    pattern: 'backgrounds/pattern.svg',
  },
} as const;

export type ImageCategory = keyof typeof Images;
export type ImageName<T extends ImageCategory> = keyof typeof Images[T];
