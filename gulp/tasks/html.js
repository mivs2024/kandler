const filePaths = require("../config/paths");
const browserSync = require('browser-sync')
const fileinclude = require('gulp-file-include');
const { src, dest } = require('gulp')



function html() {
    return src(filePaths.src.html)
        .pipe(fileinclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(dest(filePaths.buildFolder))
        .pipe(browserSync.stream());
}

module.exports = html