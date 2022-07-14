const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const tailwindChildren = require("tailwind-children");
const tailwindVariables = require("tailwind-css-variables");

module.exports = {
  content: [
    // Paths where Tailwind should look to build a list of classes.
    "./templates/**/*.html.twig",
    "./scripts/**/*.js",
    "./*.theme",
  ],
  safelist: [
    // Tailwind classes to retain in the compiled output, regardless of
    // whether they're found in templates or JS. Add classes here which
    // might be used through the CMS WYSIWYG editor.
    // See https://tailwindcss.com/docs/content-configuration#safelisting-classes
    "border-b-2",
    "bg-tertiary",
    "bg-fixed",
    "h-6",
    "h-24",
    "h-40",
    "max-w-screen-2xl",
    "p-10",
    "text-align-center",
    "text-primary",
    "text-secondary",
    "text-tertiary",
    "text-tertiary-contrast",
    {
      // Regex pattern to safelist wide ranges of classes.
      pattern: /^bg-grey-|bg-green-|bg-blend-/,
    },
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: {
        light: "#FFE21A",
        DEFAULT: "#fac800",
        dark: "#E1AF00",
        contrast: "#252525",
      },
      secondary: {
        light: "#3e3e3e",
        DEFAULT: "#252525",
        dark: "#151515",
        contrast: "#eeeeee",
      },
      tertiary: {
        light: "#8e8e8e",
        DEFAULT: "#6b6b6b",
        dark: "#464646",
        contrast: "#ffffff",
      },
      black: "#000000",
      white: "#ffffff",
      green: colors.green,
      red: colors.red,
      grey: colors.neutral,
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        152: "38rem",
      },
      boxShadow: {
        halo: "0 0 0 6px rgba(0, 0, 0, 0.15)",
      },
      minHeight: {
        "1/4-screen": "25vh",
        "1/2-screen": "50vh",
        "3/4-screen": "75vh",
      },
    },
  },
  plugins: [
    tailwindChildren,
    tailwindVariables({}, {}),
    plugin(({ addUtilities }) => {
      const blendMode = {
        ".bg-blend-normal": {
          backgroundBlendMode: "normal",
        },
        ".bg-blend-multiply": {
          backgroundBlendMode: "multiply",
        },
        ".bg-blend-screen": {
          backgroundBlendMode: "screen",
        },
        ".bg-blend-overlay": {
          backgroundBlendMode: "overlay",
        },
      };
      addUtilities(blendMode, {
        variants: ["responsive", "hover"],
      });
    }),
  ],
  corePlugins: {
    container: false,
  },
};
