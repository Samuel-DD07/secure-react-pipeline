// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'primary':'#0E0E0E',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
