var gulp = require('gulp');
var sass = require('gulp-sass');
const {exec} = require('child_process');


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

//Launch React app
gulp.task('launch', function () {
    exec('react-scripts start');
});

gulp.task('start', ['scss', 'watch', 'launch']);

