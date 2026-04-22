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
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
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
        'lc-fade-up': {
          '0%': { opacity: '0', transform: 'translateY(1.125rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'lc-soft-pulse': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
        'lc-splash-backdrop': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'lc-splash-panel': {
          '0%': { opacity: '0', transform: 'translateY(0.75rem) scale(0.91)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'lc-para-reveal': {
          '0%': { opacity: '0', transform: 'translateY(0.625rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'draw-stroke': 'draw-stroke 2s ease-out forwards',
        'fill-color': 'fill-color 1s ease-out 2s forwards',
        'lc-fade-up': 'lc-fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both',
        'lc-soft-pulse': 'lc-soft-pulse 5s ease-in-out infinite',
        'lc-splash-backdrop': 'lc-splash-backdrop 0.45s ease-out both',
        'lc-splash-panel': 'lc-splash-panel 0.78s cubic-bezier(0.22, 1, 0.36, 1) 0.06s both',
        'lc-para-reveal': 'lc-para-reveal 0.88s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}

