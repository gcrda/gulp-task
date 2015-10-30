var path = require('path'),
    root = path.resolve(__dirname, '../');

module.exports = {
    name : 'gulp-task',
    root : root,
    main : path.resolve(root, './src', './gulp-task.js'),
    path : {
        root : root,
        dist : path.resolve(root, './dist'),
        src  : path.resolve(root, './src'),
        test : path.resolve(root, './test')
    }
};