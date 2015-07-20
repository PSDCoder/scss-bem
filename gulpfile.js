var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
    serve: 'demo',
    demo: {
        scss: 'demo/css/styles.scss',
        html: 'demo/*.html'
    },
    src: {
        watch: 'src/**/*.scss'
    }
};

gulp.task('default', ['serve']);
gulp.task('build', ['scss']);
gulp.task('serve', ['scss', 'watch'], function() {
    browserSync({ server: paths.serve });
});

gulp.task('scss', function () {
    return gulp.src(paths.demo.scss)
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.plumber())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(path.dirname(paths.demo.scss)))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('watch', function () {
    $.watch(paths.demo.scss, function () {
        gulp.start('scss');
    });
    $.watch(paths.src.watch, function () {
        gulp.start('scss');
    });
    $.watch(paths.demo.html).on('change', reload);
});