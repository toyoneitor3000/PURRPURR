import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark-blue': '#020617',
        'brand-mid-blue': '#0f172a',
        'brand-light-blue': '#1e293b',
        'brand-cyan': '#06b6d4',
        'brand-slate': '#cbd5e1',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        'style-script': ['var(--font-style-script)', 'cursive'],
      },
      backgroundImage: {
        'hero-pattern': "url('/background-hero.jpg')",
        'subtle-grid': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%230f172a'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      }
    },
  },
  plugins: [],
};
export default config;