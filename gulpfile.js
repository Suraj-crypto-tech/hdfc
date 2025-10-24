'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    chalk = require('chalk'),
    autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('scss', function () {
    return gulp.src('assets/scss/style.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 15,
            sourceMap: true
        }).on('error', function (e) {
            this.emit('end');
            console.log(chalk.bgRed('SCSS error'), chalk.red(e));
        }))
        .pipe(autoprefixer({
            cascade: false,
            flexbox: true
        }))
        .pipe(gulp.dest('assets/css'));
});


gulp.task('critical', function () {
    return gulp.src('assets/scss/critical.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 15,
            sourceMap: true
        }).on('error', function (e) {
            this.emit('end');
            console.log(chalk.bgRed('SCSS error'), chalk.red(e));
        }))
        .pipe(autoprefixer({
            cascade: false,
            flexbox: true
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('scripts_common', function () {
    // return gulp.src(['assets/js/lib/jquery.min.js', 'assets/js/lib/slick.min.js', 'assets/js/common.js'])
    return gulp.src(['assets/js/lib/jquery.min.js', 'assets/js/common.js'])
        .pipe(concat('common.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }).on('error', function (e) {
            this.emit('end');
            console.log(chalk.bgRed('ERROR in transpiling - common:'), chalk.red(e));
        }))
        .pipe(uglify().on('error', function (e) {
            this.emit('end');
            console.log(chalk.bgRed('JS Uglify error - common: '), chalk.red(e));
        }))
        .pipe(gulp.dest('assets/build'));
});

gulp.task('scripts', function () {
    return gulp.src('assets/js/custom/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }).on('error', function (e) {
            this.emit('end');
            console.log(chalk.bgRed('ERROR in transpiling - custom:'), chalk.red(e));
        }))
        .pipe(uglify().on('error', function (e) {
            this.emit('end');
            console.log(chalk.bgRed('JS Uglify error - custom: '), chalk.red(e));
        }))
        .pipe(gulp.dest('assets/build'));
});

gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', gulp.series('scss','critical'));
    gulp.watch(['assets/js/lib/*.js', 'assets/js/common.js'], gulp.series('scripts_common'));
    gulp.watch(['assets/js/custom/**/*.js'], gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('scss','critical', 'scripts_common', 'scripts', 'watch'));