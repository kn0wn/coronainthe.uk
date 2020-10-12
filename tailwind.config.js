module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      sans: 'Space Mono',
    },
    colors: {
      white: '#FFFAFB',
      grey: {
        default: '#272727',
        light: '#d3d0cb',
      },
      red: '#FF4545',
    },
    extend: {
      spacing: {
        68: '18rem',
      },
    },
  },
  corePlugins: {
    animation: false,
  },
  plugins: [],
}
