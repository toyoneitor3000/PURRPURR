import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
        },
        secondary: {
          DEFAULT: '#EC4899',
          light: '#F472B6',
          dark: '#DB2777',
        },
        accent: {
          DEFAULT: '#14B8A6',
        },
        surface: {
           50: '#F8FAFC',
           100: '#F1F5F9',
           900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;