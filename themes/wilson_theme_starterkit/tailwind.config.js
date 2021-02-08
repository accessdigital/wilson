const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary': {
        light: '#FFE21A',
        DEFAULT: '#fac800',
        dark: '#E1AF00',
        contrast: '#252525',
      },
      'secondary': {
        light: '#3e3e3e',
        DEFAULT: '#252525',
        dark: '#151515',
        contrast: '#eeeeee',
      },
      'tertiary': {
        light: '#8e8e8e',
        DEFAULT: '#6b6b6b',
        dark: '#464646',
        contrast: '#ffffff',
      },
      'black': '#000000',
      'white': '#ffffff',
      'green': colors.green,
      'red': colors.red,
      'grey': colors.trueGray,
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '152': '38rem',
      },
      boxShadow: {
        'halo': '0 0 0 6px rgba(0, 0, 0, 0.15)',
      },
      minHeight: {
        '1/4-screen': '25vh',
        '1/2-screen': '50vh',
        '3/4-screen': '75vh',
      }
    },
  },
  variants: {
    extend: {
      margin: ['last', 'children'],
      padding: ['last', 'children'],
      width: ['children'],
      height: ['children'],
      position: ['children'],
      inset: ['children'],
      display: ['children'],
      borderStyle: ['hover', 'focus'],
      borderRadius: ['children'],
      scale: ['group-hover'],
      flexGrow: ['children'],
    },
  },
  plugins: [
    require('tailwindcss-children'),
    plugin(function({ addUtilities }) {
      const blendMode = {
        '.bg-blend-normal': {
          backgroundBlendMode: 'normal',
        },
        '.bg-blend-multiply': {
          backgroundBlendMode: 'multiply',
        },
        '.bg-blend-screen': {
          backgroundBlendMode: 'screen',
        },
        '.bg-blend-overlay': {
          backgroundBlendMode: 'overlay',
        },
      }
      addUtilities(blendMode, {
        variants: ['responsive', 'hover'],
      });
    })
  ],
  corePlugins: {
    container: false,
  },
}
