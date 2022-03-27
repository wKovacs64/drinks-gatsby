const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        maroon: '#6d372a', // closest: yellow-900
        'burnt-orange': '#d09e45', // closest: orange-400
        cream: '#eedebf', // closest: orange-200
      },
      fontFamily: {
        body: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
      },
      transitionTimingFunction: {
        default: 'ease',
      },
    },
  },
};
