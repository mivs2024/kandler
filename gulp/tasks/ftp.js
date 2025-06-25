const filePaths = require("../config/paths");
const configFTP = require("../config/ftp-settings");
const { src, dest } = require('gulp');
const vinylFTP = require('vinyl-ftp');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");




const ftp = () => {
    // configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);
    return src(`${filePaths.buildFolder}/**/*.*`,  {encoding: false} )
        .pipe(plumber(
            notify.onError({
                title: "FTP",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(ftpConnect.dest(`/${filePaths.ftp}/`));
}

module.exports = ftp