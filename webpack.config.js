
const path = require('path');
const fs = require('fs');

const result = {};

const paths = {
    src: path.resolve('src'),
    build: path.resolve('dist')
}
const context = path.join(paths.src, 'js');






function webpackConfig() {
    const files = fs.readdirSync(context);
    const jsFiles = files.filter(file => path.extname(file) === '.js');

    jsFiles.forEach((file) => {
        const [name] = file.split('.');
        result[name] = `./${file}`;
    });
    
    console.log(result);
    return {
        context: context,
        mode: app.isProd ? 'production' : 'development',
        entry: result,
        output: {
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            ],
        },
        devtool: !app.isProd ? 'source-map' : false
    }
}

module.exports = webpackConfig