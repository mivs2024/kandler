const filePaths =require("../config/paths");

const { src, dest } = require('gulp');

function files() {
    return src(filePaths.src.files, { encoding: false })
        .pipe(dest(filePaths.build.files))
}

module.exports = files
