/* eslint-disable */

var babel = require('gulp-babel');
var del = require('del');
var gulp = require('gulp');
var minimist = require('minimist');
var open = require('gulp-open');
var webpack = require('gulp-webpack');

var argv = minimist(process.argv.slice(2));
var COMPONENT = argv.c || argv.component || false;

gulp.task('clean', function () {
	return del.sync(['./lib/*']);
});

gulp.task('build', ['clean'], function () {
	return gulp.src('./src/**/*.js*')
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		.pipe(gulp.dest('./lib'));
});

gulp.task('bundle', ['build'], function () {
	var entryPath = './demo/' + COMPONENT + '/index.jsx';
	var config = require('./wpconfig')(entryPath);
	return gulp.src(entryPath)
		.pipe(webpack(config))
		.pipe(gulp.dest('./demo'));
});

gulp.task('demo', ['bundle'], function () {
	gulp.src('./demo/index.html')
		.pipe(open());
});

// gulp demo -c decimal-input
