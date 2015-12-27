var include  = require('rekuire'),
    util     = include('utils'),

    gulp     = require('gulp'),
    sequence = require('gulp-sequence').use(gulp),
    flatten  = require('array-flatten'),

    noop     = function() {};

/**
 * Description for B
 *
 * @constructor Task
 *
 * @param {Array}    dependencies
 * @param {function} [func]
 */
/**
 * Description for C
 *
 * @constructor Task
 *
 * @param {string}   name
 * @param {function} [func]
 */
/**
 * Description for D
 *
 * @constructor Task
 *
 * @param {Array} dependencies
 */
/**
 * Description for D
 *
 * @constructor Task
 *
 * @param {function} function
 */
/**
 * Description for A
 *
 * @default
 * @constructor Task
 *
 * @param {string}   name
 * @param {Array}    dependencies
 * @param {function} [func]
 */
function Task(name, dependencies, func) {
    var _name, _deps, _func;

    if (util.isString(name) && !util.isEmpty(name)) {
        _name = name;
    }

    _deps = util.pickArray([name, dependencies]);
    _func = util.pickFunction([name, dependencies, func]);

    if (!_name) {
        _name = util.generateName();
    }

    if (!_deps) {
        _deps = [];
    }

    if (_deps.length > 0) {
        var seq = [];

        // flatten out the dependencies deeper, than 1 level
        _deps.forEach(function(value) {
            if (typeof value === 'string') {
                seq.push(value);
            } else if (Array.isArray(value)) {
                seq.push(flatten(value));
            }
        });

        _deps = seq;
    }

    if (!_func) {
        _func = false;
    }

    this._name = _name;
    this._deps = _deps;
    this._func = _func;

    var self = this,
        fn   = this.getFunction();

    if (this.hasDependencies()) {
        gulp.task(this.getName(), function(cb) {
            sequence.apply(null, self.getDependencies())(function() {
                fn.call(gulp, gulp.src, gulp.dest, cb);
            });
        });
    } else {
        gulp.task(this.getName(), fn.bind(gulp, gulp.src, gulp.dest));
    }
}

Task.prototype = {
    constructor: Task,

    getName: function() {
        return this._name;
    },
    hasDependencies: function() {
        return this._deps.length > 0;
    },
    getDependencies: function() {
        return this._deps;
    },
    hasFunction: function() {
        return !!this._func;
    },
    getFunction: function() {
        return this._func || noop;
    }
};

Task.start = function(task) {
    var name = 'default',
        argv;

    if (util.isString(task)) {
        name = task;
    } else if (task instanceof Task) {
        name = task.getName();
    } else if (util.isNullOrUndefined(task)) {
        name = 'default';
    } else {
        argv = arguments;
        name = new Task(argv[0], argv[1], argv[2]).getName();
    }

    gulp.start.call(gulp, name);
};

/** @exports Task */
module.exports = Task;
