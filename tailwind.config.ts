/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // If using App Router
  ],
  theme: {
    extend: {},
  },
  plugins: {
     "@tailwindcss/postcss": {},
  },
};
