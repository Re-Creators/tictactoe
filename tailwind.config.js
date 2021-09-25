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
        'btn-hover' : '#E35835',
        'btn-click' : '#E0461F'
      },
      backgroundColor : () => ({
        'overlay' : 'rgba(38, 70, 83, .45)',
      }),
      keyframes : {
        scaleUp : {
          '0%' : {transform : 'scale(0.5)'},
          '100%' : {transform : 'scale(1)'}
        }
      },
      animation : {
        scaleUp : 'scaleUp .3s ease'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
