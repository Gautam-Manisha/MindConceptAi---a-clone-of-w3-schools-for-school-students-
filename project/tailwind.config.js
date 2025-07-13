/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0.8',
          },
          '70%, 100%': {
            transform: 'scale(1.05)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};