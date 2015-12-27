var include = require('rekuire'),

    gulp    = require('gulp'),
    bump    = require('gulp-bump'),
    tag     = require('gulp-tag-version'),

    project = include('project'),

    path    = project.path,
    root    = path.root,

    file    = {
        package_json : root + '/package.json'
    };

// bump tasks
gulp.task('bump', ['bump-minor']);

    gulp.task('bump-major', function() {
        return gulp
            .src(file.package_json)
            .pipe(bump({type : 'major'}))
            .pipe(gulp.dest(root));
    });

    gulp.task('bump-minor', function() {
        return gulp
            .src(file.package_json)
            .pipe(bump({type : 'minor'}))
            .pipe(gulp.dest(root));
    });

    gulp.task('bump-patch', function() {
        return gulp
            .src(file.package_json)
            .pipe(bump({type : 'patch'}))
            .pipe(gulp.dest(root));
    });

// tag task
gulp.task('tag', function() {
    return gulp
        .src(file.package_json)
        .pipe(tag());
});
