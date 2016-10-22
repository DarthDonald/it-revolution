var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

// Compile LESS files from /less into /css
gulp.task('styles', function() {
    return gulp.src('less/style.less')
        .pipe(less())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('template', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/script.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Run everything
gulp.task('default', ['styles', 'scripts', 'template']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'styles', 'scripts', 'template'], function() {
    gulp.watch('less/*.less', ['styles']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('*.html', ['template']);
    gulp.watch('js/**/*.js', browserSync.reload);
});
