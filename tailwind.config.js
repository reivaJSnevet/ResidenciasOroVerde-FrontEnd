/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.custom-scrollbar::-webkit-scrollbar': {
            width: '6px',
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
            background: 'transparent',
            borderRadius: '10px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
            background: '#555',
        },
      };

      addUtilities(newUtilities, ['responsive']);
    },
  ],
}