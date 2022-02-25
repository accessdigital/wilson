# Wilson Theme Starterkit

A theme for the Wilson installation profile, based on the Stable core theme. This is a starterkit and should be renamed for project use. This
theme uses the Tailwind 2.0 CSS framework.

## Tailwind help

- [What is Tailwind?](https://tailwindcss.com/)
- [Configure tailwind.config.js](https://tailwindcss.com/docs/configuration)
- [Tailwind cheat sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [TailwindUI inspiration](https://tailwindui.com/components)

## Usage of this theme

The `node_modules` and `dist` (consisting of `css` and `js`) folders are Git ignored in this theme and must be built using `npm` commands as below.

Run the following steps:

- Run `npm install` in the wilson_theme_starterkit directory.
- Run `npm run build` in the wilson_theme_starterkit directory to get the up-to-date CSS file.

To ensure that these are run with a managed version of Node, it's best to run these inside the project virtual machine.

The following commands are available:

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

This runs the same `build:styles` and `build:scripts` scripts in `npm run build`, but also sets the `NODE_ENV=production` and `BABEL_ENV=production` variables. These get used to minify CSS and JS as well as [purging Tailwind](#tailwind-purging) of unused classes. Ideally `npm run build:dist` should be run via CI to ensure released code is always optimised for production.

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
  - minifies CSS (if in production mode)

### Compile JS
```bash
npm run build:scripts
```

This command will run the following scripts:
- `eslint`
  - checks code in JS files against a set of rules defined in `eslintrc.json`
- `babel`
  - compiles ECMAScript 6 code from JS files in `source/js` into ECMAScript 5 compatible JS files in `dist/js`

### Watch for changes:

#### CSS
```bash
npm run watch:styles
```

#### JS
```bash
npm run watch:scripts
```

#### All
```bash
npm run dev
```

## Tailwind purging

To dramatically reduce the size of the compiled theme CSS, Tailwind Purge is enabled on this theme when built via `npm run build:dist`. Use `npm run build` locally to compile CSS with all Tailwind classes.

Only Tailwind classes that are used in the template files or SASS will be included in the purged CSS. To use Tailwind classes in config (e.g. in Webform fields), you must add the class to the `purge:options:safelist` in `tailwind.config.js`.

You can also tell Tailwind to scan more paths when assessing what to purge (e.g. a directory containing a React app). Add the relative path of the `purge:content` section in `tailwind.config.js`.
