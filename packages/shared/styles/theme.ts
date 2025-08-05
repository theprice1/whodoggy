export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    muted: string;
  };
  spacing: {
    px: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
  };
  borderRadius: {
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
  };
  fontSize: {
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
};

const theme: Theme = {
  colors: {
    primary: '#4B9CD3',
    secondary: '#FFD700',
    background: '#F8FAFC',
    text: '#1F2937',
    muted: '#9CA3AF',
  },
  spacing: {
    px: '1px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
  },
  borderRadius: {
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  fontSize: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
};

export default theme;
