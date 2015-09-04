var gulp = require('gulp'),
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

gulp.task('lint', function () {
    return gulp.src('public/app/**/*.js')
        .pipe(jslint({
            global: ['angular', 'Firebase', 'ASQ', '_'],
            white: true,
            unparam: true
        }));
});

gulp.task('app-scripts', function () {
    return gulp.src('public/app/**/*.js')
        .pipe(concat('app.js'))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function () {
    gulp.watch('public/app/**/*.js', ['lint', 'app-scripts']);
});

// default task
gulp.task('default', ['vendor-css', 'core-css', 'vendor-scripts', 'lint', 'app-scripts']);