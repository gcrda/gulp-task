var include = require('rekuire'),

    gulp    = require('gulp'),
    debug   = require('gulp-debug'),
    bump    = require('gulp-bump'),
    git     = require('gulp-git'),
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

// git commit task
gulp.task('commit', function() {
    var pkg     = require(file.package_json),
        version = pkg.version,
        message = 'v' + version;

    return gulp
        .src(file.package_json)
        .pipe(git.commit(message));
});

// tag task
gulp.task('tag', function() {
    return gulp
        .src(file.package_json)
        .pipe(tag());
});

gulp.task('publish', function() {
    var pkg     = require(file.package_json),
        version = pkg.version,
        message = 'v' + version;

    return gulp.src('')
        .pipe(git.commit(message))
        .pipe(git.tag(message));
});
