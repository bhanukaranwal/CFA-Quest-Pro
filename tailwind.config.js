/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using a class
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Light Mode Colors
        'background': '#F8F9FA',
        'surface': '#FFFFFF',
        'primary': '#2c3e50',
        'primary-hover': '#34495e',
        'accent': '#1abc9c',
        'accent-hover': '#16a085',
        'text-primary': '#212529',
        'text-secondary': '#6C757D',
        'success': '#2ecc71',
        'danger': '#e74c3c',
        'warning': '#f39c12',
        
        // Dark Mode Colors
        'dark-background': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-primary': '#34495e',
        'dark-primary-hover': '#4a6572',
        'dark-accent': '#1abc9c',
        'dark-accent-hover': '#2fe2b6',
        'dark-text-primary': '#E0E0E0',
        'dark-text-secondary': '#A0A0A0',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
