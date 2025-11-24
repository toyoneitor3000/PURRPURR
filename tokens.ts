// Auto-generated design tokens based on design_system.md

export const tokens = {
  colors: {
    primary: '#2A003A', // Purpur Oscuro
    secondary: '#1A1A1A', // Gris Carbón
    accent: '#9D00FF',  // Púrpura Vibrante
    neutralLight: '#F8F8F8', // Blanco Suave
    neutralDark: '#808080'  // Gris Medio
  },
  typography: {
    fontFamily: {
      display: 'Montserrat, sans-serif',
      body: 'Roboto, sans-serif'
    },
    fontSize: {
      h1: '48px',
      h2: '36px',
      h3: '28px',
      p: '16px',
      small: '14px'
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    xl: '2rem',    // 32px
    xxl: '3rem'    // 48px
  }
} as const;

export type ColorToken = keyof typeof tokens.colors;
export type SpacingToken = keyof typeof tokens.spacing;
export type FontFamilyToken = keyof typeof tokens.typography.fontFamily;
export type FontSizeToken = keyof typeof tokens.typography.fontSize;
export type FontWeightToken = keyof typeof tokens.typography.fontWeight;
