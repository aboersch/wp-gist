var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function () {
    gulp.src(['index.ts'])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js.pipe(uglify())
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('wp-gist'));
});
gulp.task('css', function () {
    gulp.src(['style.css'])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('wp-gist'));

});
gulp.task('copy-font', function () {
    gulp.src('fonts/*.*').pipe(gulp.dest('wp-gist/fonts/'));
})
gulp.task('default', ['scripts', 'css', 'copy-font']);