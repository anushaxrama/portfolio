/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        'draw-stroke': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'fill-color': {
          '0%': { fillOpacity: '0' },
          '100%': { fillOpacity: '1' },
        },
      },
      animation: {
        'draw-stroke': 'draw-stroke 2s ease-out forwards',
        'fill-color': 'fill-color 1s ease-out 2s forwards',
      },
    },
  },
  plugins: [],
}

