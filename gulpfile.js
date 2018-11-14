
const gulp = require('gulp');
// const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('styles', () => {
    return gulp.src('./dev/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        // .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('./public/styles'))
        .pipe(reload({stream:true}));
});

gulp.task('watch', () => {
  gulp.watch('./dev/styles/**/*.scss', ['styles']);
  gulp.watch('./dev/scripts/main.js', ['scripts']);
  gulp.watch('*.html', reload);
});

// gulp.task('js', () => {
//     browserify('dev/scripts/app.js', { debug: true })
//         .transform('babelify', {
//             sourceMaps: true,
//             presets: ['env', 'react']
//         })
//         .bundle()
//         .on('error', notify.onError({
//             message: "Error: <%= error.message %>",
//             title: 'Error in JS 💀'
//         }))
//         .pipe(source('app.js'))
//         .pipe(buffer())
//         .pipe(gulp.dest('public/scripts'))
// });

gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('./dev/scripts/*.js', ['js']);
    gulp.watch('./dev/styles/*.scss', ['styles']);
    gulp.watch('*.html', reload);
});

gulp.task('default', ['bs', 'styles', 'watch']);