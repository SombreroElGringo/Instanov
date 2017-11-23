var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var newer        = require('gulp-newer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
const { spawn, exec } = require('child_process');

var onError = function(err) {
    notify.onError({
        title:    "Error",
        message:  "<%= error %>",
    })(err);
    this.emit('end');
};

var plumberOptions = {
    errorHandler: onError,
};

// Compile Sass to CSS
gulp.task('sass', function() {
    var autoprefixerOptions = {
        browsers: ['last 2 versions'],
    };

    var filterOptions = '**/*.css';

    var reloadOptions = {
        stream: true,
    };

    var sassOptions = {
        includePaths: [

        ]
    };

    return gulp.src('src/scss/App.scss')
        .pipe(plumber(plumberOptions))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/css'))
        .pipe(filter(filterOptions))
        .pipe(reload(reloadOptions));
});

// Watch Sass files
gulp.task('watch', function() {
    gulp.watch('src/scss/App.scss', ['sass']);
});

// BrowserSync
gulp.task('browsersync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        open: false,
        online: false,
        notify: false,
    });
});

//Lauch React app
gulp.task('launch', function() {
    exec('react-scripts start');
});

gulp.task('start', ['sass', 'watch', 'launch']);

