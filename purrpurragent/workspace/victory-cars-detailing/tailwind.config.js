/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'dark-blue': '#020617', // Fondo ultra oscuro
          'mid-blue': '#0f172a',  // Fondo secundario
          'accent-blue': '#1e3a8a', // Azul corporativo medio
          'cyan': '#06b6d4',      // El color del "Detailing" y acentos vibrantes
          'cyan-hover': '#0891b2',
          'slate': '#94a3b8',     // Texto secundario
          'white': '#ffffff',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'], // Para "VICTORY CARS"
        'style-script': ['var(--font-style-script)', 'cursive'], // Para "Detailing"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right, #020617 0%, #0f172a 100%)',
        'blue-glow': 'conic-gradient(from 180deg at 50% 50%, #020617 0deg, #1e3a8a 180deg, #06b6d4 360deg)',
      },
    },
  },
  plugins: [],
};
