import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#D61F3C',
          deep:    '#8B1124',
          dark:    '#B8182E',
        },
        cream: '#F0EAD2',
        dark:   '#1A1A1A',
        body:   '#555555',
        muted:  '#888888',
        border: '#C0B898',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'sans-serif'],
        body:    ['var(--font-inter)',  'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
export default config
