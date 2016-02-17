var gulp = require('gulp'),
    debug = require('gulp-debug'),
    del = require('del'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    tsProject = tsc.createProject('tsconfig.json'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    jslint = require('gulp-jslint'),
    uglify = require('gulp-uglify'),
    vendorJsSource = [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/firebase/firebase.js',
        'bower_components/angularfire/dist/angularfire.min.js',
        'bower_components/underscore/underscore-min.js',
        'node_modules/asynquence/asq.js'
    ],
    vendorSassSource = [
        'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.scss'
    ],
    coreStylesSource = [
        'public/css/main.css',
        'public/css/custom.css'
    ];

gulp.task('vendor-css', function () {
    return gulp.src(vendorSassSource)
               .pipe(sass().on('error', sass.logError))
               .pipe(minifyCss())
               .pipe(concat('vendor.css'))
               .pipe(rename({ suffix: '.min' }))
               .pipe(gulp.dest('public/css'));
});

gulp.task('core-css', function () {
    return gulp.src(coreStylesSource)
               .pipe(minifyCss())
               .pipe(concat('styles.css'))
               .pipe(rename({ suffix: '.min' }))
               .pipe(gulp.dest('public/css'));
});

gulp.task('vendor-scripts', function () {
    return gulp.src(vendorJsSource)
               .pipe(concat('vendor.js'))
               .pipe(rename({ suffix: '.min' }))
               .pipe(gulp.dest('public/js'));
});

gulp.task('ts-lint', function () {
    return gulp.src('./public/app/**/*.ts').pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('compile-ts', function () {
    var sourceTsFiles = ['./public/app/**/*.ts', './typings/**/*.ts'];
    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));
        
    tsResult.dts.pipe(gulp.dest('public/js'));
    return tsResult.js.pipe(sourcemaps.write('.'))
                      .pipe(gulp.dest('public/js'));
});

gulp.task('recompile', ['ts-lint', 'compile-ts']);

gulp.task('watch', function () {
    gulp.watch(['./public/app/**/*.ts'], ['ts-lint', 'compile-ts']);
});

// default task
gulp.task('default', ['vendor-css', 'core-css', 'vendor-scripts', 'ts-lint', 'compile-ts']);