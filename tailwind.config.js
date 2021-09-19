module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary' : '#264653',
        'secondary' : '#2A9D8F',
        'burnt-sienna' : '#E76F51',
        'rob-roy' : '#E9C46A',
      },
      backgroundColor : () => ({
        'overlay' : 'rgba(38, 70, 83, .45)'
      })
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
