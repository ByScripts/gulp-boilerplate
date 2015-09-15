"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var yargs = require('yargs');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var tap = require('gulp-tap');
var path = require('path');
var livereload = require('gulp-livereload');
var iff = require('gulp-if');
var uglifyJs = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var streamify = require('gulp-streamify');
var rimraf = require('rimraf');

var watch = yargs.argv.watch;
var build = yargs.argv._.length === 1 && yargs.argv._[0] === 'build';

var error = function (message) {
    gutil.log(gutil.colors.white.bgRed.bold(' ERROR '), message);
};

if(!build && yargs.argv._.indexOf('build') !== -1) {
    error('"build" task must be called alone.');
    process.exit();
}

if (watch) {

    if (build) {
        error('You can not use --watch while building.')
        process.exit();
    }

    livereload.listen();
}

gulp.task('static', function () {

    var files = 'src/dist/**/*';

    var task = function () {
        gulp.src(files)
            .pipe(gulp.dest('dist'))
            .pipe(livereload());
    };

    if (watch) {
        gulp.watch(files, task);
    }

    task();
});

gulp.task('styles', function () {

    var files = 'src/styles/**/*.scss';

    var task = function () {
        gulp.src(files)
            .pipe(sass().on('error', sass.logError))
            .pipe(iff(build, minifyCss()))
            .pipe(gulp.dest('dist/styles'))
            .pipe(livereload())
    };

    if (watch) {
        gulp.watch(files, task);
    }

    task();
});

gulp.task('scripts', function () {

    gulp.src('src/scripts/*.js')
        .pipe(tap(function (file, t) {

            var fileName = path.basename(file.path);
            var bundler = browserify({cache: {}, packageCache: {}});

            bundler.add(file.path);
            bundler.transform(babelify);

            var bundle = function bundle() {
                bundler
                    .bundle()
                    .pipe(source(fileName))
                    .pipe(iff(build, streamify(uglifyJs())))
                    .pipe(gulp.dest('dist/scripts'))
                    .pipe(livereload())
                ;
            };

            if (watch) {
                bundler = watchify(bundler);
                bundler.on('update', bundle); // on any dep update, runs the bundler
                bundler.on('log', function (message) {
                    var date = new Date();
                    gutil.log(date.getHours() + ':' + date.getMinutes(), '-', fileName, '-', message);
                });
            }

            bundle();
        }));
});

gulp.task('default', ['static', 'scripts', 'styles']);

gulp.task('build', function () {
    rimraf('dist', function () {
        gulp.start('default');
    });
});
