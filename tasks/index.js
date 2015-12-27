var include = require('rekuire'),

    project = include('project'),
    path    = project.path,
    root    = path.root,

    gulp    = require('gulp'),
    bump    = require('gulp-bump');

// bump tasks
gulp.task('bump', ['bump-minor']);

    gulp.task('bump-major', function() {
        return gulp
            .src(root + './package.json')
            .pipe(bump({type : 'major'}))
            .pipe(gulp.dest(root + '/'));
    });

    gulp.task('bump-minor', function() {
        return gulp
            .src(root + './package.json')
            .pipe(bump({type : 'minor'}))
            .pipe(gulp.dest(root + '/'));
    });

    gulp.task('bump-patch', function() {
        return gulp
            .src(root + './package.json')
            .pipe(bump({type : 'patch'}))
            .pipe(gulp.dest(root + '/'));
    });
