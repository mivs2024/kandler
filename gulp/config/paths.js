const buildFolder = './dist';
const srcFolder = './src';

const filePaths = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		images: `${buildFolder}/images/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
	},
	src: {
		js: `${srcFolder}/js/*.js`,
		images: `${srcFolder}/images/**/*.*`,
		svg: `${srcFolder}/images/**/*.svg`,
		scss: [`${srcFolder}/scss/*.scss`],
		html: `${srcFolder}/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		fontsWoff: `${srcFolder}/fonts/*.{woff2,woff}`,
		fonts: `${srcFolder}/fonts/`,
		fontsOtf: `${srcFolder}/fonts/*.otf`,
		fontsTtf: `${srcFolder}/fonts/*.ttf`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/images/**/*.*`,
		files: `${srcFolder}/files/**/*.*`,
        fonts: `${srcFolder}/fonts/*.woff2`
	},
	buildFolder,
	srcFolder,
	ftp:'kandler'
	
}

module.exports = filePaths;