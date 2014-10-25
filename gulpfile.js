var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

gulp.task('default', function() {
  gulp.src(['public/css/bootstrap.min.css', 'public/css/font-awesome.min.css','public/css/custom.css'])
    .pipe(concatCss('main.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('js', function() {
  gulp.src(['public/js/bootstrap.min.js', 'public/js/marked.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

gulp.task('watch', function() {
  gulp.watch('public/css/custom.css', ['default']);
});
