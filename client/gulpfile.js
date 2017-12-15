var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const {exec} = require('child_process');


// Compile Sass to CSS
gulp.task('scss', function () {

    gulp.src('src/scss/App.scss')
        .pipe(sass({
	        outputStyle: "compressed"
        }).on('error', sass.logError))
	    .pipe(autoprefixer())
        .pipe(gulp.dest('src/assets/css'))

});

// Watch Sass files
gulp.task('watch', function () {
    gulp.watch('src/scss/*.scss', ['scss']);
});

//Launch React app
gulp.task('launch', function () {
    exec('react-scripts start');
});

gulp.task('start', ['scss', 'watch', 'launch']);

