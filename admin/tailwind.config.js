/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B3A4B',
        terracotta: '#E29578',
        warmCream: '#FDF6EC',
        nearBlack: '#1A1A1A',
        ivory: '#FEFDF5',
        softRed: '#C1121F',
      }
    },
  },
  plugins: [],
}
