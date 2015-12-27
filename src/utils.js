const DEFAULT_NAME        = 'task_',
      DEFAULT_NAME_LENGTH = 16;

module.exports = {
    generateName : function(prefix, length) {
        var name  = typeof prefix === 'string' ? prefix : DEFAULT_NAME,
            bound = typeof length === 'number' ? length : DEFAULT_NAME_LENGTH,
            chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        bound -= name.length;

        if (bound < 0) {
            bound = 0;
        }

        while (bound--) {
            name += chars[Math.floor(Math.random() * chars.length)];
        }

        return name;
    },
    isString : function(object) {
        return typeof object === 'string';
    },
    isArray : function(object) {
        return Object.prototype.toString.call(object) === '[object Array]';
    },
    isArguments : function(object) {
        return Object.prototype.toString.call(object) === '[object Arguments]';
    },
    isFunction : function(object) {
        return typeof object === 'function';
    },
    isEmpty : function(string) {
        return string.length === 0 && /\s+/.test(string);
    },
    isNullOrUndefined : function(object) {
        return object === null || typeof object === 'undefined';
    },
    pickArray : function(paramArr) {
        for (var i = 0, len = paramArr.length; i < len; ++i) {
            if (this.isArray(paramArr[i])) {
                return paramArr[i];
            }
        }

        return null;
    },
    pickFunction : function(paramArr) {
        for (var i = 0, len = paramArr.length; i < len; ++i) {
            if (typeof paramArr[i] === 'function') {
                return paramArr[i];
            }
        }

        return null;
    }
};
