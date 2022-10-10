const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const tailwindChildren = require("tailwind-children");
const tailwindVariables = require("tailwind-css-variables");

module.exports = {
  content: [
    // Paths where Tailwind should look to build a list of classes.
    "./templates/**/*.html.twig",
    "./src/js/**/*.js",
    "./*.theme",
  ],
  safelist: [
    // Tailwind classes to retain in the compiled output, regardless of
    // whether they're found in templates or JS. Add classes here which
    // might be used through the CMS WYSIWYG editor.
    // See https://tailwindcss.com/docs/content-configuration#safelisting-classes
    "border-b-2",
    "-ml-1/2-screen",
    "max-w-screen-xl",
    "max-w-screen-2xl",
    "p-10",
    "w-screen",
    // Regex patterns to safelist wider ranges of classes or to include
    // responsive classes or other variants.
    // See https://tailwindcss.com/docs/content-configuration#safelisting-classes
    {
      pattern: /^h-(6|10|12|24|36|40|48)/,
      variants: ["md"],
    },
    {
      pattern: /^w-(3\/12|6\/12)/,
      variants: ["md"],
    },
    // Make all background colours available, including for use via ::before pseudo-element.
    {
      pattern: /^bg-/,
      variants: ["before"],
    },
    // Make all text colours and associated styles available.
    {
      pattern: /^text-/,
    },
    // Support for stylised backdrops via pseudo-elements.
    // Example offset backdrop:
    // `relative before:bg-primary before:absolute before:top-1/2 before:right-0 before:bottom-0 before:left-0`
    {
      pattern: /^top-|^bottom-|^left-|^right-|^inset-0/,
      variants: ["before"],
    },
    {
      pattern: /absolute/,
      variants: ["before"],
    },
    {
      pattern: /backdrop-blur-sm|backdrop-blur$/,
      variants: ["before"],
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
      margin: {
        "1/2-screen": "50vw",
      },
      minHeight: {
        "1/4-screen": "25vh",
        "1/2-screen": "50vh",
        "3/4-screen": "75vh",
        80: "20rem", // 320px
        100: "25rem", // 400px
      },
      width: {
        // Utilities for setting widths to match grid columns with gaps.
        // See styles.scss for the source of these CSS variables.
        // Two column basis
        "1/2-cols": "var(--one-of-two-cols)",
        // Three column basis
        "1/3-cols": "var(--one-of-three-cols)",
        "2/3-cols": "var(--two-of-three-cols)",
        // Four column basis
        "1/4-cols": "var(--one-of-four-cols)",
        "2/4-cols": "var(--two-of-four-cols)",
        "3/4-cols": "var(--three-of-four-cols)",
      },
      gridTemplateColumns: {
        // Utilities for setting up specific grid column templates.
        // A [two thirds] | [one third] layout
        "2-pref-l": "var(--two-of-three-cols) var(--one-of-three-cols)",
        // A [one third] | [two thirds] layout
        "2-pref-r": "var(--one-of-three-cols) var(--two-of-three-cols)",
        // A semi-flexible [two thirds] | [one third] layout
        "2-pref-l-flex":
          "minmax(var(--one-of-three-cols), var(--two-of-three-cols)) auto",
        // A semi-flexible [one thirds] | [two third] layout
        "2-pref-r-flex":
          "auto minmax(var(--one-of-three-cols), var(--two-of-three-cols))",
      },
      zIndex: {
        1: "1",
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
