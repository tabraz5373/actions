/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#FF9933',
          light: '#FFB366',
          dark: '#CC7A29',
        },
        emerald: {
          DEFAULT: '#50C878',
          light: '#7DD89A',
          dark: '#3FA060',
        },
        purple: {
          DEFAULT: '#7851A9',
          light: '#9A7ABD',
          dark: '#5F4187',
        },
        cream: {
          DEFAULT: '#FDF5E6',
          light: '#FFFBF0',
          dark: '#F5EDD8',
        },
        charcoal: {
          DEFAULT: '#36454F',
          light: '#5A6A75',
          dark: '#1E2A32',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        crimson: ['Crimson Text', 'serif'],
      },
      backgroundImage: {
        'sacred-pattern': "url('/patterns/sacred-geometry.svg')",
        'gradient-vastu': 'linear-gradient(135deg, #FF9933 0%, #7851A9 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
