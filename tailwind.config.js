module.exports = {
  purge: ['.index.html', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      serif: ['Roboto Slab', 'serif'],
    },
    extend: {
      transitionProperty: {
        'max-h': 'max-height',
      },
    },
  },
  variants: {
    extend: {
      height: ['active', 'focus', 'hover'],
      maxHeight: ['active', 'focus', 'hover'],
      cursor: ['hover'],
      transitionProperty: ['active', 'focus', 'hover'],
    },
  },
  plugins: [],
};
