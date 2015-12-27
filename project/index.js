function getPath() {
    var p    = require('path'),
        root = p.normalize(process.cwd()),
        args = Array.prototype.slice.call(arguments, 0).join('/');

    return p.normalize(root + '/' + args);
}

module.exports = {
    path : {
        root    : getPath(),
        project : getPath('/project'),
        src     : getPath('/src'),
        tests   : getPath('/tests')
    }
};
