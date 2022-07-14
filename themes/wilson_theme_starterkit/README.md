# Wilson Theme Starterkit

A theme for the Wilson installation profile, based on the Stable core theme. This is a starterkit and should be renamed for project use. This
theme uses the Tailwind 3.0 CSS framework.

## Tailwind help

Tailwind 3.0 uses the new Just In Time engine, meaning the that Tailwind classes are added to the CSS when they are detected as being used in source code (i.e. a Twig template or JS file).

See the `tailwind.config.js` file for a list of paths to monitor and for the safelist of classes to always include (i.e. to support markup provided by the database).

- [What is Tailwind?](https://tailwindcss.com/)
- [Configure tailwind.config.js](https://tailwindcss.com/docs/configuration)
- [Tailwind cheat sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [TailwindUI inspiration](https://tailwindui.com/components)

## Usage of this theme

The `node_modules` and `dist` (consisting of `css` and `js`) folders are Git ignored in this theme and must be built using `npm` commands as below.

Run the following steps:

- Run `npm install` in the wilson_theme_starterkit directory.
- Run `npm run build` in the wilson_theme_starterkit directory to get the up-to-date CSS and JS files.

To ensure that these are run with a managed version of Node, it's best to run these inside the project virtual machine.

The following commands are available:

### Local development - watch for changes

```bash
npm run dev
```

This will monitor for changes in the `src/js`, `src/scss` and `templates` folders and continually trigger a rebuild of the `dist` assets.

Alternatively you can watch styles and scripts separately.

```bash
npm run watch:styles
npm run watch:scripts
```

### Compile theme
```bash
npm run build
```

This command will run the following scripts:
- `build:styles` (lints and compiles CSS)
- `build:scripts` (lints and compiles JS)

### Compile theme (production-ready)

In addition to the default build script, a production version is also available:

```bash
npm run build:dist
```

This runs the same `build:styles` and `build:scripts` scripts in `npm run build`, but also sets the `NODE_ENV=production` and `BABEL_ENV=production` variables. These get used to minify and format CSS and JS. Ideally `npm run build:dist` should be run via CI to ensure released code is always optimised for production.

### Compile CSS
```bash
npm run build:styles
```

This command will run the following scripts:
- `stylelint`
  - checks code in SCSS files against a set of rules defined in`.stylelintrc`
- `sass`
  - compiles SCSS files from `src/sass` into CSS files in `dist`
  - any SCSS files prefixed with an `_` will get compiled into a main `styles.css`
  - any SCSS files without a prefix (e.g. component files) will get compiled into separate CSS files so that they can be included as Drupal libraries
- `postcss` - defined in `postcss.config.js`
  - ensures Tailwind CSS is included in compiled CSS
  - adds vendor prefixes to compiled CSS
  - minifies and formats CSS (if in production mode)

### Compile JS
```bash
npm run build:scripts
```

This command will run the following scripts:
- `eslint`
  - checks code in JS files against a set of rules defined in `eslintrc.json`
- `babel`
  - compiles ECMAScript 6 code from JS files in `source/js` into ECMAScript 5 compatible JS files in `dist/js`
  - minifies JS (if in production mode)

If this command is run in production mode and has `NODE_ENV=production` set (e.g. as part of `npm run build:dist`), the additional script will also be run:
- `prettier`
  - formats code in JS files to ensure it conforms to a consistent style

## npm JS and CSS libraries

As the `node_modules` folder will be excluded from the build artefact, you cannot directly link to npm package assets in Drupal libraries. You must therefore declare the JS and CSS files you need copying from `node_modules` to the theme's `dist` folder.

In package.json, declare the `node_modules` path for each CSS or JS file, separated by spaces:

```bash
"config": {
  "copyLibraryFiles": {
    "css": "./node_modules/@glidejs/glide/dist/css/glide.core.min.css ./node_modules/aos/dist/aos.css",
    "js": "./node_modules/@glidejs/glide/dist/glide.min.js ./node_modules/aos/dist/aos.js"
  }
}
```

After running `npm run build`, the listed files will be available at `dist/css/libraries` and `dist/js/libraries`, respectively. From here, you can now declare the library for use with Drupal in `wilson_theme_starterkit.libraries.yml`:

```bash
glide:
  css:
    theme:
      dist/css/libraries/glide.core.min.css: { minified: true }
  js:
    dist/js/libraries/glide.min.js: { minified: true }
  dependencies:
    - core/drupal
```

To attach the library to a Drupal Twig template, use:

```bash
{{ attach_library('wilson_theme_starterkit/glide') }}
```
