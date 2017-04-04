const gulp = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const zip = require('gulp-zip');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function () {
    return gulp.src(['index.ts'])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js.pipe(uglify())
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('wp-gist'));
});
gulp.task('css', function () {
    return gulp.src(['style.css'])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('wp-gist'));
});
gulp.task('copy-font', function () {
    return gulp.src('fonts/*.*').pipe(gulp.dest('wp-gist/fonts/'));
})
gulp.task('default', ['scripts', 'css', 'copy-font']);

const argv = require('yargs').argv;

gulp.task('release', ['default'], function () {
    return gulp.src('wp-gist/*')
        .pipe(zip('release-' + argv.version + '.zip'))
        .pipe(gulp.dest(''));
});