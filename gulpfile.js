'use strict';

var gulp = require('gulp');
var del = require('del');
var react = require('gulp-react');
var uglify = require('gulp-uglify');

gulp.task('clean', function() {
	del(['lib/*']);
});

gulp.task('scripts', ['clean'], function() {
	return gulp.src('src/*.jsx')
		.pipe(react())
		.pipe(uglify())
		.pipe(gulp.dest('lib'));
});

gulp.task('default', ['scripts']);

gulp.task('watch', function() {
	gulp.watch(['src/*.jsx'], ['default']);
});
