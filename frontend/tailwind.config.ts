import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E7490',
          light: '#06b6d4',
          dark: '#155e75',
        },
        secondary: {
          DEFAULT: '#F97316',
          hover: '#ea580c',
        },
        background: {
          light: '#ECFEFF',
          teal: '#0E7490',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
