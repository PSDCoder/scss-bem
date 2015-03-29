var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
    serve: './demo/',
    demoStyles: './demo/css/',
    src: './src/',
    files: {
        demo: {
            scss: './demo/css/*.scss',
            html: './demo/*.html'
        },
        src: {
            scss: './src/*.scss'
        }
    }
};

gulp.task('default', ['serve']);
gulp.task('build', ['scss']);


gulp.task('serve', ['scss', 'watch'], function() {
    browserSync({ server: paths.serve });
});

gulp.task('scss', function () {
    var taskName = process.argv.slice(2, 3)[0];
    var isBuildTask = taskName === 'build';

    return $.rubySass(paths.demoStyles, { sourcemap: true })
        .on('error', function (err) {
            console.error('Gulp ruby sass error', err.message);
        })
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.demoStyles))
        .pipe($.if(!isBuildTask, reload({stream: true})));

    // for libsas building, but when it will updates to 3.2 version
    //gulp.src(paths.files.scss)
    //    .pipe($.plumber())
    //    .pipe($.sourcemaps.init())
    //    .pipe($.sass())
    //    .pipe($.sourcemaps.write('./'))
    //    .pipe(gulp.dest(paths.src))
    //    .pipe($.if(!isBuildTask, reload({stream: true})));
});

gulp.task('watch', function () {
    gulp.watch(paths.files.demo.scss, ['scss']);
    gulp.watch(paths.files.src.scss, ['scss']);
    gulp.watch(paths.files.demo.html).on('change', reload);
});