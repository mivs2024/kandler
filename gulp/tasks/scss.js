const filePaths = require("../config/paths");
const browserSync = require('browser-sync')
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const postcssPresetEnv = require("postcss-preset-env");



const { src, dest } = require('gulp')
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function scss() {


    return src(filePaths.src.scss)

        .pipe(gulpif(!app.isProd, sourcemaps.init()))
        .pipe(plumber(
            notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulpif(app.isProd, postcss([
            autoprefixer()
            , postcssPresetEnv()
        ])))
        .pipe(gulpif(app.isProd, cleanCSS()))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulpif(!app.isProd, sourcemaps.write('.')))
        .pipe(dest(filePaths.build.css))
        .pipe(browserSync.stream());
}


module.exports = scss