'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
const paths = {
  styles: {
    src: './styles/sass/partials',
    main: './styles/sass/main.scss',
    files: './styles/sass/**/*.scss',
    dest: './styles/css'
  }
}

gulp.task('sass', function () {
  return gulp.src(paths.styles.main)
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: 'map',
        includePaths : [paths.styles.src]
      }
    ).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(paths.styles.files, ['sass']);
});

gulp.task('default', ["sass", "sass:watch"]);