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
    //return gulp.src(paths.demo.scss)
    //    .pipe($.sourcemaps.init())
    //    .pipe($.sass())
    //    .pipe($.plumber())
    //    .pipe($.sourcemaps.write('./'))
    //    .pipe(gulp.dest(path.dirname(paths.demo.scss)))
    //    .pipe(browserSync.stream({ match: '**/*.css' }));

    return $.rubySass(paths.demo.scss, { sourcemap: true })
        .on('error', function (err) {
            console.error('Gulp ruby sass error', err.message);
        })
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

gulp.task('test-sass', function () {
    var testFile = 'test-sass/test.scss';
    var resultDir = 'test-sass/';

    //lib-sass
    gulp.src(testFile)
        .pipe($.sass())
        .pipe($.plumber())
        .pipe($.rename({
            suffix: '-libsass'
        }))
        .pipe(gulp.dest(resultDir));

    //ruby-sass
    $.rubySass(testFile)
        .on('error', function (err) {
            console.error('Gulp ruby sass error', err.message);
        })
        .pipe($.rename({
            suffix: '-rubysass'
        }))
        .pipe(gulp.dest(resultDir));
});