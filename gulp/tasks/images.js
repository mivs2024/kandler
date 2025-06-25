const filePaths =require("../config/paths");
const { src, dest } = require('gulp');
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");



function images() {
    // return src([`./src/images/**/*`], { encoding: false })
    return src([filePaths.src.images], { encoding: false })
        .pipe(changed(filePaths.build.images))
        .pipe(imagemin([imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })], { verbose: true }))

        // .pipe(dest(filePaths.build.images))
        // .pipe(src(filePaths.src.images, { encoding: false }))
        // .pipe(webp({quality: 100}))
        .pipe(dest(filePaths.build.images))

};

module.exports = images