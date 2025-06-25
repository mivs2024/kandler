const { series, watch } = require('gulp')
const filePaths = require("./gulp/config/paths");

const browserSync = require('browser-sync');
const clean = require('./gulp/tasks/clean')
const files = require('./gulp/tasks/files')
const images = require('./gulp/tasks/images')
const fontsFiles = require('./gulp/tasks/fonts')
const html = require('./gulp/tasks/html')
const scss = require('./gulp/tasks/scss')
const scripts = require('./gulp/tasks/scripts')
const ftp = require('./gulp/tasks/ftp')




global.app = {
    isProd: process.argv.includes('--build')
}




function watching() {
    browserSync.init({
        server: {

            baseDir: filePaths.buildFolder, index: "index.html"
        },
    });
    watch(filePaths.watch.scss, scss);
    watch(filePaths.watch.js, scripts);
    watch(filePaths.watch.html, html);
    watch(filePaths.watch.images, images);

    watch(filePaths.watch.files, files);

}

const fonts = series(fontsFiles.otfToTtf, fontsFiles.ttfToWoff, fontsFiles.fontsStyle);

const dev = series(clean, files, images, fontsFiles.fontsCopy, html, scss, scripts, watching);

const buildTasks = series(clean, files, images, fontsFiles.fontsCopy, html, scss, scripts);
const build = series(buildTasks);
const deployFTP = series( ftp);

exports.build = build
exports.ftp = deployFTP

// exports.otfToTtf = otfToTtf
// exports.ttfToWoff = ttfToWoff
// exports.fontsStyle = fontsStyle
exports.fonts = fonts
exports.images = images

exports.default = dev