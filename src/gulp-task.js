var Gulp;

var gulp     = require('gulp'),
    sequence = require('gulp-sequence').use(gulp);

var DEFAULT_NAME = 'task_',
    DEFAULT_NAME_LENGTH = 16;

/**
 * Generates a default name for the task
 *
 * @private
 *
 * @returns {string}
 */
function generateName() {
    var name  = DEFAULT_NAME,
        bound = DEFAULT_NAME_LENGTH - name.length,
        chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if (bound < 0) {
        bound = 0;
    }

    while (bound--) {
        name += chars[Math.floor(Math.random() * chars.length)];
    }

    return name;
}

function isString(object) {
    return typeof object === 'string';
}
function isArray(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
}
function isArguments(object) {
    return Object.prototype.toString.call(object) === '[object Arguments]';
}
function isFunction(object) {
    return typeof object === 'function';
}
function isEmpty(string) {
    return string.length === 0 && /\s+/.test(string);
}
function isNullOrUndefined(object) {
    return object === null || typeof object === 'undefined';
}
function pickArray(paramArr) {
    for (var i = 0, len = paramArr.length; i < len; ++i) {
        if (isArray(paramArr[i])) {
            return paramArr[i];
        }
    }

    return null;
}
function pickFunction(paramArr) {
    for (var i = 0, len = paramArr.length; i < len; ++i) {
        if (typeof paramArr[i] === 'function') {
            return paramArr[i];
        }
    }

    return null;
}

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
    var n, d, fn;

    if (isString(name) && !isEmpty(name)) {
        n = name;
    }

    d  = pickArray([name, dependencies]);
    fn = pickFunction([name, dependencies, func]);

    if (!n) {
        n = generateName();
    }

    if (!d) {
        d = [];
    }

    if (!fn) {
        fn = false;
    }

    this.name         = n;
    this.dependencies = d;
    this.func         = fn;

    //console.log('new Task', n, d, fn);
    console.log('new Task', this);
    //console.log('new Task', arguments);
}

Task.prototype = {
    constructor: Task,
    getName: function() {
        return this.name;
    },
    hasDependencies: function() {
        return this.dependencies.length > 0;
    },
    getDependencies: function() {
        return this.dependencies;
    },
    hasFunction: function() {
        return !!this.func;
    },
    getFunction: function() {
        return this.func || function() {};
    }
};

/**
 *
 * @function add
 *
 * @param {string}   name
 * @param {Array}    dependencies
 * @param {function} func
 */
/**
 *
 * @function add
 *
 * @param {...Task} task
 */
Task.add = function(task) {
    var t = task,
        name, dep, func, argv;

    if (!(t instanceof Task)) {
        argv = arguments;
        t = new Task(argv[0], argv[1], argv[2]);
    }

    name = t.getName();
    dep  = t.getDependencies();
    func = t.getFunction().bind(gulp);

    if (t.hasDependencies()) {
        gulp.task(name, function() {
            sequence.apply(null, dep)(func);
        });
    } else {
        gulp.task(name, func);
    }
};

Task.start = function(task) {
    var name = 'default',
        argv;

    if (isString(task)) {
        name = task;
    } else if (task instanceof Task) {
        name = task.getName();
    } else if (isNullOrUndefined(task)) {
        name = 'default';
    } else {
        argv = arguments;
        name = new Task(argv[0], argv[1], argv[2]).getName();
    }

    gulp.start.call(gulp, name);
};

/** @exports Task */
module.exports = Task;