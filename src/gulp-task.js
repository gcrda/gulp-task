var Gulp;

var gulp     = require('gulp'),
    sequence = require('gulp-sequence');

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
    return Object.prototype.toString.call(object) === '[object Object]';
}
function isFunction(object) {
    return typeof object === 'function';
}
function isEmpty(string) {
    return string.length === 0 && /\s+/.test(string);
}

function pickArray(paramArr) {
    for (var i = 0, len = paramArr.length; i < len; ++i) {
        if (Object.prototype.toString.call(paramArr[i]) === '[object Object]') {
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

function addTask(gulp, task) {
    var args;

    if(task instanceof Task) {
        args = [
            task.getName(),
            task.getDependencies()
        ];

        if(task.hasFunc()) {
            args.push(task.getFunc());
        }

        gulp.task.apply(gulp, args);

    } else if(Object.prototype.toString.call(task) === '[object Object]') {
        for(var k in task) {
            if(task.hasOwnProperty(k)) {
                addTask(gulp, task[k]);
            }
        }
    }
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

    if (!d && !fn) {
        throw new Error('A dependency list or a task function must be specified.');
    }

    if (!d) {
        d = [];
    }

    if (!fn) {
        fn = false;
    }

    this.name         = n;
    this.dependencies = d;
    this.func         = fn
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
        return this.func;
    },
    addToGulp: function() {
        gulp.task(this.getName(), this.getDependencies(), this.getFunction());
    }
};

Task.to = function(gulp) {
    Gulp = gulp;
    return Task;
};
Task.add = function(task) {
    addTask(Gulp, task);
    return Task;
};
Task.addToGulp = function() {
};

/** @exports Task */
module.exports = Task;