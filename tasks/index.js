var include  = require('rekuire'),

    gulp     = require('gulp'),
    sequence = require('gulp-sequence'),
    debug    = require('gulp-debug'),
    bump     = require('gulp-bump'),
    git      = require('gulp-git'),
    tag      = require('gulp-tag-version'),
    npm      = require('npm'),

    project  = include('project'),

    path     = project.path,
    root     = path.root,

    file     = {
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
gulp.task('git-commit', function(cb) {
    var pkg     = require(file.package_json),
        version = pkg.version,
        message = 'v' + version;

    gulp
        .src(file.package_json)
        .pipe(git.commit(message, function(error) {
            if (error) {
                // TODO fix wrongly given error about unsuccessful commit (gulp-git bug)
                process.exit(); // exit until the bug above is not fixed
            }

            cb(); // need cb() in order to signal that this task has ended (gulp-git bug)
        }));
});

// git tag task
gulp.task('git-tag', function() {
    return gulp
        .src(file.package_json)
        .pipe(tag());
});

// git push task
gulp.task('git-push', function(cb) {
    git.push('origin', 'master', {args: "--tags"}, function (error) {
        if (error) {
            throw error
        }

        cb();
    });
});

// npm publish task
gulp.task('npm-publish', function(cb) {
    var pkg = require(file.package_json);

    npm.load(pkg, function(error) {
        if (error) {
            throw error;
        }

        npm.commands.publish([], function (error, data) {
            if (error) {
                throw error;
            }

            process.exit(); // exit instead of cb(); in order to stop re-executing the whole "publish" task because of gulp-git bug
        });
    });
});

// publish task
gulp.task('publish', sequence(
    'git-commit',
    'git-tag',
    'git-push',
    'npm-publish'
));
