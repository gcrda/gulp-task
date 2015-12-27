var p = require('path');

var project = {
        name : 'gulp-task',
        root : p.resolve(__dirname, '../')
    },
    path = {
        dist : p.resolve(project.root, './dist'),
        src  : p.resolve(project.root, './src'),
        test : p.resolve(project.root, './test')
    };

var gulp  = require('gulp'),

    compressor = require('gulp-uglify'),
    mocha      = require('gulp-mocha'),
    sequence   = require('gulp-sequence'),
    debug      = require('gulp-debug');

gulp.task('default', function() {
    return (
         gulp
            .src(path.src + '/*.js', {read: false})
            .pipe(debug())
            //.pipe(mocha())
    );
});

gulp.task('compress', function() {
    return (
         gulp
            .src(
                path.src + '/*.js'
            )
            .pipe(compressor())
            .pipe(gulp.dest(
                path.dist
            ))
    );
});