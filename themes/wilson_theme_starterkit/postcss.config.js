const postcssImport = require("postcss-import");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const postcssConfig = {
  plugins: [postcssImport, tailwindcss, autoprefixer],
};

// Enable cssnano on production build.
if (process.env.NODE_ENV === "production") {
  postcssConfig.plugins.push(
    cssnano({
      preset: ["default"],
    })
  );
}

module.exports = postcssConfig;
