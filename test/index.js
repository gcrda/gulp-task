var require = require('rekuire'),
    project = require('project'),

    src     = project.path.src,

    gulp    = require('gulp'),
    sequence = require('gulp-sequence'),
    debug   = require('gulp-debug'),

    Task    = require(project.main),

    chai    = require('chai'),
    assert  = chai.assert,

    log     = console.log;

//var def = new Task();

//console.log(project);
//console.log(Task);

/*
gulp.task('default', [], function() {
    console.log('default gulp task runned');
});
*/

function isFunction(object) {
    return typeof object === 'function';
}

//console.log(gulp);
//console.log(gulp.start);

gulp.task('a', function() {
    console.log('a');
    return gulp.src('package.json', {read : false})
               .pipe(debug());
});

gulp.task('b', function() {
    console.log('b');
    return gulp.src('package.json', {read : false})
               .pipe(debug());
});

gulp.task('c', function() {
    console.log('c');
    return gulp.src('package.json', {read : false})
               .pipe(debug());
});

gulp.task('d', function() {
    console.log('d');
    return gulp.src('package.json', {read : false})
               .pipe(debug());
});

/*
gulp.task('default', ['A', 'B', 'C'], function() {
    console.log('default');
    return gulp.src('package.json', {read : false})
               .pipe(debug());
});
*/

/*
gulp.task('default', function(callback) {
    sequence(['A', 'B'], 'C')(function() {
        console.log('default');
        return gulp.src('package.json', {read : false})
                   .pipe(debug());
    });
});

//gulp.start();
gulp.start.call(gulp, 'default');
*/
/*
var task = new Task('default', ['a', ['b', 'c'], 'd'], function() {
    console.log('default');
    console.log(this);

    return this;
});
*/
//var t2 = Task.prototype.constructor.apply(Object.create(Task.prototype), []);

/*
Task.add(task);
*/

Task.add('default', ['a', ['b', 'c'], 'd'], function() {
    console.log('default');
    //console.log(this);

    return this
        .src('package.json', {read: false})
        .pipe(debug())
});

Task.start();

return;

describe('Check whether Task exists', function() {
    it('exists', function() {
        assert(isFunction(Task));
    });

    describe('new Task()', function() {
        var task = new Task();

        it('should have the proper properties', function() {
            assert(task.getName().indexOf('task_') > -1);
            assert(task.hasDependencies() === false);
            assert(task.hasFunction() === false);
        });
    });

    describe('a task', function() {
        it('should be great', function() {



        });
    });
});