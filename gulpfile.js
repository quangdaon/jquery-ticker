const gulp = require('gulp');
const sass = require('gulp-sass');
//const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');

const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('rollup-plugin-replace');

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

	gulpScripts
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));

	return gulpScripts;
});

gulp.task('watch', ['browserSync'], function () {
	gulp.watch('src/scss/**/**/*.scss', ['styles']);
	gulp.watch('src/js/**/**/*.js', ['scripts']);
	gulp.watch('dist/js/**/**/*.js', browserSync.reload);
});

let defaultTasks = ['styles', 'scripts'];

if (debug) defaultTasks.push('watch');

gulp.task('default', defaultTasks);