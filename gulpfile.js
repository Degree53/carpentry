'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
// var uglify = require('gulp-uglify');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('clean', function() {
	del(['./lib/*']);
});

gulp.task('transform', ['clean'], function() {
	return gulp.src('./src/**/*.jsx')
		.pipe(react())
		.pipe(gulp.dest('./lib'));
});

gulp.task('watch', function() {
	gulp.watch(['./src/**/*.jsx'], ['transform']);
});

gulp.task('bundle', ['transform'], function() {
	var bundler = browserify({
		cache: {}, packageCache: {},
		entries: ['./index.js']
	});
	
	return bundler.bundle()
		.pipe(source('./bundle.js'))
		.pipe(gulp.dest('./test'));
});
