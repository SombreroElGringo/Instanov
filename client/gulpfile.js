var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
const {spawn, exec} = require('child_process');


// Compile Sass to CSS
gulp.task('scss', function () {

    gulp.src('src/scss/App.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css'))

});

// Watch Sass files
gulp.task('watch', function () {
    gulp.watch('src/scss/App.scss', ['scss']);
});

//Lauch React app
gulp.task('launch', function () {
    exec('react-scripts start');
});

gulp.task('start', ['scss', 'watch', 'launch']);

