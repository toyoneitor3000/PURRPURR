import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f2ff',
          100: '#bfdefc',
          200: '#99c9fa',
          300: '#73b4f8',
          400: '#4da0f6',
          500: '#007bff',
          600: '#0069d9',
          700: '#0056b3',
          800: '#00438c',
          900: '#003066',
        },
        accent: {
          50: '#fff9db',
          100: '#fff3b8',
          200: '#ffec94',
          300: '#ffe670',
          400: '#ffdf4d',
          500: '#ffcc00', // Amarillo Base solicitado
          600: '#e6b800',
          700: '#b38f00',
          800: '#806600',
          900: '#4d3d00',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.1)',
          surface: 'rgba(255, 255, 255, 0.05)',
          highlight: 'rgba(255, 255, 255, 0.2)',
        },
        gray: {
          50:  '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#8a8a8a',
          700: '#4a4a4a',
          800: '#3a3a3a',
          900: '#2a2a2a',
          950: '#1a1a1a',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02))',
      },
      backdropBlur: {
        'xs': '2px',
        'satin': '16px',
        'matte': '24px',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;