module.exports = {
  purge: ['.index.html', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Babbel Milliard', 'sans-serif'],
      serif: ['Leitura News', 'serif'],
    },
    extend: {
      transitionProperty: {
        'max-h': 'max-height',
      },
      zIndex: {
        '-1': '-1',
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
