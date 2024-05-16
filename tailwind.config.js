/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.emerald
      }
    },
    letterSpacing: {
      jsPDF: '0.5px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
