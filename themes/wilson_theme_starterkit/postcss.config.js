const postcssConfig = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};

// Enable cssnano on production build.
if (process.env.NODE_ENV === 'production') {
  postcssConfig.plugins.push(
    require('cssnano')({
      preset: ['default']
    })
  );
}

module.exports = postcssConfig;
