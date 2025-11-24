import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors (Electric Blue)
        primary: {
          50: '#e0f2ff',
          100: '#bfdefc',
          200: '#99c9fa',
          300: '#73b4f8',
          400: '#4da0f6',
          500: '#007bff', // Base primary
          600: '#0069d9',
          700: '#0056b3',
          800: '#00438c',
          900: '#003066',
        },
        // Accent colors (Vibrant Orange)
        accent: {
          50: '#fff1e0',
          100: '#ffe0bf',
          200: '#ffc999',
          300: '#ffb373',
          400: '#ff9c4d',
          500: '#ff7f00', // Base accent
          600: '#e67300',
          700: '#b35900',
          800: '#804000',
          900: '#4d2600',
        },
        // Neutral colors (Grayscale for Dark Mode)
        gray: {
          50:  '#f8f9fa', // Lightest gray for light mode text/background
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#8a8a8a', // Secondary text
          700: '#4a4a4a', // Border/Divider
          800: '#3a3a3a', // Card/Element Background
          900: '#2a2a2a', // Background Medium Dark
          950: '#1a1a1a', // Background Darkest
        },
        // Semantic colors
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545',
        info:    '#17a2b8',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '0': '0px',
        '1': '4px',    // 0.25rem
        '2': '8px',    // 0.5rem
        '3': '12px',   // 0.75rem
        '4': '16px',   // 1rem
        '5': '20px',   // 1.25rem
        '6': '24px',   // 1.5rem
        '8': '32px',   // 2rem
        '10': '40px',  // 2.5rem
        '12': '48px',  // 3rem
        '16': '64px',  // 4rem
        '20': '80px',  // 5rem
        '24': '96px',  // 6rem
        '32': '128px', // 8rem
        '40': '160px', // 10rem
        '48': '192px', // 12rem
        '56': '224px', // 14rem
        '64': '256px', // 16rem
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem', // 2px
        'md': '0.375rem', // 6px
        'lg': '0.5rem',    // 8px
        'xl': '0.75rem',   // 12px',
        '2xl': '1rem',     // 16px',
        '3xl': '1.5rem',   // 24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
    },
  },
  plugins: [],
};

export default config;
