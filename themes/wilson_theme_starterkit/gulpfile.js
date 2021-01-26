// Available tasks:
//   `gulp lint`
//   `gulp lint:css`
//   `gulp build`
//   `gulp build:styles`
//   `gulp build:scripts`
//   `gulp watch`

const gulp = require('gulp'),
      path = require('path'),
      sass = require('gulp-sass'),
      sassGlob = require('gulp-sass-glob'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      postcss = require('gulp-postcss'),
      terser = require('gulp-terser'),
      gulpStylelint = require('gulp-stylelint'),
      runSequence = require('gulp4-run-sequence'),
      babel = require('gulp-babel');
      livereload = require('gulp-livereload');

const { series, parallel, watch, task, src, dest } = require('gulp');

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

const sassOptions = {
  outputStyle: 'expanded'
};

const prefixerOptions = {
  browsers: ['last 2 versions']
};

// Create the tasks.
task('lint', function(callback) {
  runSequence(
    'lint:css',
    callback
  );
});

task('lint:css', function stylelint() {
  return src(options.sass.files)
    .pipe(gulpStylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

task('build', function(callback) {
  runSequence(
    'lint:css',
    'build:styles',
    'build:scripts',
    callback
  );
});

task('build:styles', function styles() {
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

task('build:scripts', function scripts() {
  return src(options.js.files)
    .pipe(rename({ suffix: '.min' }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(terser())
    .pipe(dest(options.js.destination))
    .pipe(livereload());
});

task('watch', function develop() {
  livereload.listen();
  watch(options.sass.files, series('build:styles'));
  watch(options.js.files, series('build:scripts'));
});
