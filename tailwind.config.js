/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slideInBounce: 'slideInBounce 1s ease-out',
      },
      keyframes: {
        slideInBounce: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          '60%': {
            transform: 'translateY(-10%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      }
    },
  },
  plugins: [],
}

