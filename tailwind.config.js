/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#0052CC',
        'secondary': '#F4F5F7',
        'accent': '#FFAB00',
        'text-dark': '#172B4D',
        'text-light': '#5E6C84',
      }
    },
  },
  plugins: [],
};
