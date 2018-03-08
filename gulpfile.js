'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require('babelify');
const sourcemaps = require('gulp-sourcemaps');

const pathsSrc = {
  js: './src/js/**/*.js',
  jsEntry: './src/js/main.js',
  views: './src/views/**/*.html',
  styles: {
    src: './src/styles/sass/partials',
    main: './src/styles/sass/main.scss',
    files: './src/styles/sass/**/*.scss'
  }
}

const pathsDist = {
  js: './dist/js',
  styles: './dist/styles/css',
  views: './dist/views'
}

gulp.task('sass', function () {
  return gulp.src(pathsSrc.styles.main)
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: 'map',
        includePaths : [pathsSrc.styles.src]
      }
    ).on('error', sass.logError))
    .pipe(gulp.dest(pathsDist.styles));
});

function compileJS() {
  
}

gulp.task('compileJS', function() {
  const bundler = browserify(pathsSrc.jsEntry, {
    debug: true,
    paths: ['./src/js/', './node_modules']
  });

  bundler
    .transform(babel, {presets: 'env'})             // Compiles js, needs to happen before browserify
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('main.js'))                        // End file name
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))      // Adds onto existing sourcemaps
    //.pipe((gulpif(env.PROD == 1, uglify())))
    .pipe(sourcemaps.write('./'))                   // Adds source maps
    .pipe(gulp.dest(pathsDist.js));
});
 
gulp.task('watch', function() {
  gulp.watch(pathsSrc.styles.files, ['sass']);
  gulp.watch(pathsSrc.views, ['views']);
  gulp.watch(pathsSrc.js, ['compileJS']);
});

gulp.task('views', function() {
  gulp.src(pathsSrc.views)
  .pipe(gulp.dest(pathsDist.views));
});

gulp.task('dev', ['compileJS', 'sass', 'views']);

gulp.task('default', ["watch"]);