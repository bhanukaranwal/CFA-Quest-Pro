/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'background': '#F8F9FA', // Light gray background
        'surface': '#FFFFFF',    // White for cards
        'primary': '#2c3e50',    // Deep charcoal blue
        'primary-hover': '#34495e',
        'accent': '#1abc9c',     // Vibrant teal
        'accent-hover': '#16a085',
        'text-primary': '#212529', // Dark gray for text
        'text-secondary': '#6C757D', // Lighter gray for secondary text
        'success': '#2ecc71',
        'danger': '#e74c3c',
        'warning': '#f39c12',
      }
    },
  },
  plugins: [],
};
