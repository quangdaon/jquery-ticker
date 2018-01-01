const gulp = require('gulp');

const browserSync = require('browser-sync');
const rename = require('gulp-rename');

const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');

const rollup = require('gulp-better-rollup');
const uglify = require('gulp-uglify');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');

const pug = require('gulp-pug');

const pkgSettings = require('./package');

const debug = process.env.NODE_ENV !== 'production';

// Gulp BrowserSync
gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: 'demo',
			index: 'index.html',
			routes: {
				'/dist': 'dist'
			}
		},
		ghostMode: false,
		notify: false
	});
});

gulp.task('scripts', function () {
	const replacements = {
		ENV: process.env.NODE_ENV,
		VERSION: pkgSettings.version
	};

	const gulpScripts = gulp.src('src/js/entry.js')
		.pipe(rollup({
			plugins: [
				replace(Object.assign({
					delimiters: ['|', '|']
				}, replacements)),
				resolve({ browser: true }),
				commonjs(),
				babel({
					exclude: 'node_modules/**',
					babelrc: false,
					presets: ['es2015-rollup']
				})]
		}, 'cjs'))
		.pipe(rename('ticker.js'));

	if (!debug) {
		gulpScripts.pipe(uglify())
			.pipe(rename({
				suffix: '.min'
			}));
	}

	gulpScripts.pipe(gulp.dest('dist/js'));

	return gulpScripts;
});

gulp.task('styles', function () {
	let gulpStyles = gulp.src('src/scss/ticker.scss')
		.pipe(sass({
			outputStyle: debug ? 'expanded' : 'compressed'
		}).on('error', sass.logError))
		.pipe(prefix());

	if (!debug) {
		gulpStyles.pipe(rename({
			suffix: '.min'
		}));
	}

	gulpStyles.pipe(gulp.dest('dist/css'));

	if (debug) {
		gulpStyles.pipe(browserSync.reload({
			stream: true
		}));
	}

	return gulpStyles;
});

gulp.task('demo:views', () => {
	return gulp.src('src/demo/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('demo'));
});

gulp.task('demo:scripts', () => {
	return gulp.src('src/demo/scripts/demo.js')
		.pipe(uglify())
		.pipe(gulp.dest('demo/assets'));
});

gulp.task('demo:styles', () => {
	return gulp.src('src/demo/styles/demo.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(prefix())
		.pipe(gulp.dest('demo/assets'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch', ['browserSync'], function () {
	gulp.watch('src/scss/**/**/*.scss', ['styles']);
	gulp.watch('src/js/**/**/*.js', ['scripts']);

	gulp.watch('src/demo/**/**/*.pug', ['demo:views']);
	gulp.watch('src/demo/**/**/*.js', ['demo:scripts']);
	gulp.watch('src/demo/**/**/*.scss', ['demo:styles']);

	gulp.watch('dist/js/**/**/*.js', browserSync.reload);
	gulp.watch('demo/**/*.*', browserSync.reload);
});

let defaultTasks = ['styles', 'scripts'];

if (debug) defaultTasks.push('demo:views', 'demo:scripts', 'demo:styles', 'watch');

gulp.task('default', defaultTasks);