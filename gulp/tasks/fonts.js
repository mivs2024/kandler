const filePaths = require("../config/paths");
const { src, dest } = require('gulp');
const fonter = require('gulp-fonter-fix');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');

function fontsCopy() {
    return src(filePaths.src.fontsWoff, { encoding: false })
        .pipe(dest(filePaths.build.fonts))
}

function otfToTtf() {
    return src(filePaths.src.fontsOtf, { encoding: false })
        .pipe(fonter({ formats: ['ttf'] }))
        .pipe(dest(filePaths.src.fonts))
}

function ttfToWoff() {
    return src(filePaths.src.fontsTtf, {   encoding: false })
        .pipe(ttf2woff2())
        .pipe(dest(filePaths.src.fonts))

}
async function fontsStyle() {
    let fontsFile = `${filePaths.srcFolder}/scss/_fonts.scss`;


    await fs.promises.writeFile(fontsFile, '');
    const fontsFiles = await fs.promises.readdir(filePaths.src.fonts);



   
    for (var i = 0; i < fontsFiles.length; i++) {
        let fontFileType = fontsFiles[i].split(".")[1];
        if(fontFileType==='woff2'){

            let fontFileName = fontsFiles[i].split(".")[0];
            
    
            let fontName = fontFileName.split("-")[0]
                ? fontFileName.split("-")[0]
                : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
                ? fontFileName.split("-")[1]
                : fontFileName;
            let fontStyle = fontFileName.includes("-Italic")
                ? "italic"
                : "normal";
            if (
                fontWeight.toLowerCase() === "thin" ||
                fontWeight.toLowerCase() === "hairline"
            ) {
                fontWeight = 100;
            } else if (
                fontWeight.toLowerCase() === "extralight" ||
                fontWeight.toLowerCase() === "ultralight"
            ) {
                fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
                fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
                fontWeight = 500;
            } else if (
                fontWeight.toLowerCase() === "semibold" ||
                fontWeight.toLowerCase() === "demibold"
            ) {
                fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
                fontWeight = 700;
            } else if (
                fontWeight.toLowerCase() === "extrabold" ||
                fontWeight.toLowerCase() === "ultrabold"
            ) {
                fontWeight = 800;
            } else if (
                fontWeight.toLowerCase() === "black" ||
                fontWeight.toLowerCase() === "heavy"
            ) {
                fontWeight = 900;
            } else if (
                fontWeight.toLowerCase() === "extrablack" ||
                fontWeight.toLowerCase() === "ultrablack"
            ) {
                fontWeight = 950;
            } else {
                fontWeight = 400;
            }
            await fs.promises.appendFile(
                fontsFile,
                `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`,
    
            );
        }


    }


}


module.exports = { otfToTtf, ttfToWoff, fontsStyle,fontsCopy }