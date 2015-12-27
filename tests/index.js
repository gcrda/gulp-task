var include = require('rekuire'),

    project = include('project'),
    root    = project.path.root,

    file     = require('gulp-file'),
    debug    = require('gulp-debug'),

    task    = include('src/gulp-task');

new task('A', function(src) {
    return src('x')
        .pipe(file('A', ''))
        .pipe(debug());
});

new task('B', function(src, dest, cb) {
    setTimeout(function() {
        src('x')
            .pipe(file('B', ''))
            .pipe(debug());

        cb();
    }, 500);
});

new task('C', ['A'], function(src, dest, cb) {
    setTimeout(function() {
        src('x')
            .pipe(file('C', ''))
            .pipe(debug());

        cb();
    }, 1000);
});

new task('D', function(src) {
    return src('x')
        .pipe(file('D', ''))
        .pipe(debug());
});

new task('def', ['A', ['B', 'C'], 'D'], function(src) {
    return src('x')
        .pipe(file('def', ''))
        .pipe(debug());
});

task.start('def');
