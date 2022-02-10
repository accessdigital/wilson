// Available tasks:
//   `gulp lint:styles`
//   `gulp lint:scripts`
//   `gulp build`
//   `gulp build:dist`
//   `gulp build:styles`
//   `gulp build:scripts`
//   `gulp watch`

const path = require('path'),
  sass = require('gulp-sass')(require('sass')),
  sassGlob = require('gulp-sass-glob'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  terser = require('gulp-terser'),
  gulpStylelint = require('gulp-stylelint'),
  runSequence = require('gulp4-run-sequence'),
  babel = require('gulp-babel');
livereload = require('gulp-livereload'),
  eslint = require('gulp-eslint-new');

const { series, watch, task, src, dest } = require('gulp');

const paths = {
  styles: {
    source: 'sass',
    destination: 'css'
  },
  scripts: {
    source: 'scripts',
    destination: 'js'
  }
};

const options = {
  css: {
    files: path.join(paths.styles.destination, '**/*.css'),
    file: path.join(paths.styles.destination, '/styles.css'),
    destination: path.join(paths.styles.destination)
  },
  sass: {
    files: path.join(paths.styles.source, '**/*.scss'),
    file: path.join(paths.styles.source, 'styles.scss'),
    destination: path.join(paths.styles.destination)
  },
  js: {
    files: path.join(paths.scripts.source, '**/*.js'),
    file: path.join(paths.scripts.source, 'scripts.js'),
    destination: path.join(paths.scripts.destination)
  },
};

// Manipulate the NODE_ENV indicator.
task('set-prod-node-env', async () => {
  return process.env.NODE_ENV = 'production';
});

task('set-dev-node-env', async () => {
  return process.env.NODE_ENV = 'development';
});

// Lint styles.
task('lint:styles', stylelint = () => {
  return src(options.sass.files)
    .pipe(gulpStylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

// Lint scripts.
task('lint:scripts', stylelint = () => {
  return src(options.js.files)
    .pipe(eslint({}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Build the theme assets for local development (i.e. full Tailwind classes).
task('build', callback => {
  runSequence(
    'lint:styles',
    'lint:scripts',
    'build:styles',
    'build:scripts',
    callback
  );
});

// Build the theme assets for distribution (i.e. Tailwind purge enabled).
task('build:dist', async callback => {
  runSequence(
    'set-prod-node-env',
    'lint:styles',
    'lint:scripts',
    'build:styles',
    'build:scripts',
    callback
  );
});

// Build Sass in to minified CSS.
task('build:styles', styles = () => {
  return src(options.sass.files)
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      require('postcss-import'),
      require('tailwindcss'),
      require('autoprefixer'),
    ]))
    .pipe(dest(options.css.destination))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(options.css.destination))
    .pipe(livereload());
});

// Minify and transpile JavaScript.
task('build:scripts', scripts = () => {
  return src(options.js.files)
    .pipe(rename({ suffix: '.min' }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(terser())
    .pipe(dest(options.js.destination))
    .pipe(livereload());
});

// Enable a watch task that automatically rebuilds Sass and JavaScript.
task('watch', develop = () => {
  livereload.listen();
  watch(options.sass.files, series('build:styles'));
  watch(options.js.files, series('build:scripts'));
});

// Declare the 'default' task which is used if 'gulp' command is used on its own.
task('default', async callback => {
  runSequence(
    'build:dist',
    callback
  );
});
