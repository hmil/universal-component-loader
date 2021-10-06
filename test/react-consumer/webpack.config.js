const path = require('path');

const mode = process.env.NODE_ENV || 'development';

module.exports = /** @type import('webpack').Configuration */({
    entry: './src/main.ts',
    devtool: false,
    mode,
    resolve: {
        extensions: ['.js', 'ts', '.tsx', '.jsx'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: 'auto'
    },
    module: {
        rules: [{
            test: /\.tsx?/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        port: 3000,
        hot: false,
    }
});
