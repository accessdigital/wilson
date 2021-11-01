# Wilson Theme Starterkit

A theme for the Wilson installation profile, based on the Stable core theme. This is a starterkit and should be renamed for project use. This
theme uses the Tailwind 2.0 CSS framework.

## Tailwind help

- [What is Tailwind?](https://tailwindcss.com/)
- [Configure tailwind.config.js](https://tailwindcss.com/docs/configuration)
- [Tailwind cheat sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [TailwindUI inspiration](https://tailwindui.com/components)

## Usage of this theme

The `node_modules`, `css` and `js` folders are Git ignored in this theme and must be built using `npm` & `gulp` commands as below.

Run the following steps:

- Run `npm install` in the wilson_theme_starterkit directory.
- Run `gulp build` in the wilson_theme_starterkit directory to get the up-to-date CSS file.

To ensure that these are run with a managed version of Node, it's best to run these inside the project virtual machine.

There are more gulp tasks available by running the following whilst inside the theme folder:
- `gulp lint`
- `gulp lint:css`
- `gulp build`
- `gulp build:dist`
- `gulp build:styles`
- `gulp build:scripts`
- `gulp watch`

When building the theme for production (via CI for instance) use the `gulp build:dist` command to ensure the Tailwind CSS is purged of un-used classes. See below for more information.

## Tailwind purging (on `gulp build:dist` only)

To dramatically reduce the size of the compiled theme CSS, Tailwind Purge is enabled on this theme when built via `gulp build:dist`. Use `gulp build` locally to compile CSS with all Tailwind classes.

Only Tailwind classes that are used in the template files or SASS will be included in the purged CSS. To use Tailwind classes in config (e.g. in Webform fields), you must add the class to the `purge:options:safelist` in `tailwind.config.js`.

You can also tell Tailwind to scan more paths when assessing what to purge (e.g. a directory containing a React app). Add the relative path of the `purge:content` section in `tailwind.config.js`.
