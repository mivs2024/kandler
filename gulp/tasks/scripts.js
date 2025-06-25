const filePaths = require("../config/paths");
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const webpack = require('webpack-stream');
const webpackConfig = require('../../webpack.config');




const { src, dest } = require('gulp')




function scripts() {
    return src(filePaths.src.js)
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "JS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpack(webpackConfig()))
        .pipe(dest(filePaths.build.js))
        .pipe(browserSync.stream());
}


module.exports=scripts