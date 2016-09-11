
const gulp = require('gulp');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const replace = require('gulp-replace');

const paths = {
	fonts: './node_modules/materialize-css/dist/font/**/*.*',
	css: './_includes/build/css/*.css',
	js: './_includes/build/js/*.js',
	build: './_includes/build',
	pre_base: './_dependencies/base.html'
};

gulp.task('usemin', () => {
	return gulp.src(paths.pre_base)
		.pipe(usemin({
			css: [],
			js: []
		}))
		.pipe(gulp.dest(paths.build));
});

gulp.task('replace-hrefs', ['usemin'], () => {
	return gulp.src(`${paths.build}/link.html`)
		.pipe(gulp.dest('./_includes/build'));
});

gulp.task('copy-base', ['usemin'], () => {
	return gulp.src(`${paths.build}/base.html`)
		.pipe(gulp.dest('./_layouts/'));
});

gulp.task('copy-css', ['usemin'], () => {
	return gulp.src(paths.css)
		.pipe(gulp.dest('./css'));
});

gulp.task('copy-js', ['usemin'], () => {
	return gulp.src(paths.js)
		.pipe(gulp.dest('./js'));
});

gulp.task('copy-fonts', () => {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest('./font'));
});


gulp.task('default', ['usemin', 'copy-base', 'copy-css', 'copy-js', 'copy-fonts']);