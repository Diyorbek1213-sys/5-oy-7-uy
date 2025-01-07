/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./Java/**/*.js",
    "./css/**/*.css"
  ],
  theme: {
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
};