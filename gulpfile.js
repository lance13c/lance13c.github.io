
const gulp = require('gulp');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const replace = require('gulp-replace');
const fs = require('fs');
const minifyCss = require('gulp-minify-css');

const paths = {
	fonts: './node_modules/materialize-css/dist/font/**/*.*',
	data: './_data/data.json',
	src_index_js: './_dependencies/index.js',
	dist_index_js: './js',
	css_post_build: './_includes/**/*.css',
	sass_post_build: './_includes/**/*.scss',
	js_post_build: './_includes/**/*.js',
	post_build: './_includes/build',
	pre_base: './_dependencies/*.html',
	pre_alt_base: './_dependencies/alt/base.html'
};

gulp.task('usemin', () => {
	return gulp.src(paths.pre_base)
		.pipe(usemin({
			css: [],
			js: []
		}))
		.pipe(gulp.dest(paths.post_build));
});

gulp.task('replace-hrefs', ['usemin'], () => {
	return gulp.src(`${paths.build}/link.html`)
		.pipe(gulp.dest('./_includes/build'));
});

gulp.task('copy-base', ['usemin'], () => {
	return gulp.src(`${paths.post_build}/*.html`)
		.pipe(gulp.dest('./_layouts/'));
});

gulp.task('copy-sass', ['usemin'], () => {
	return gulp.src(paths.sass_post_build)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('copy-css', ['usemin'], () => {
	return gulp.src(paths.css_post_build)
		.pipe(gulp.dest('./css'));
});

gulp.task('copy-js', ['usemin'], () => {
	return gulp.src(paths.js_post_build)
		.pipe(gulp.dest('./js'));
});

gulp.task('copy-fonts', () => {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest('./fonts'));
});

gulp.task('insert-data', () => {
	let fileContent = fs.readFileSync(paths.data, "utf8");
	
	return gulp.src(paths.src_index_js)
		.pipe(replace('DATA_LOCATION', fileContent))
		.pipe(gulp.dest(paths.dist_index_js));
});

gulp.task('default', ['usemin', 'copy-base', 'copy-css', 'copy-sass', 'copy-js', 'copy-fonts', 'insert-data']);