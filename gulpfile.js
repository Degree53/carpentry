'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
var del = require('del');

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
