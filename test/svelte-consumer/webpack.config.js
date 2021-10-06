const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = /** @type import('webpack').Configuration */({
    entry: './src/main.ts',
    // devtool: 'inline-source-map',
    mode,
    resolve: {
        // see below for an explanation
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', 'ts', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
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
        }, {
            test: /\.(html|svelte)$/,
            use: {
                loader: 'svelte-loader',
                options: {
                    compilerOptions: {
                        dev: !prod
                    },
                    emitCss: false,
                    hotReload: false,
                    preprocess: sveltePreprocess({ sourceMap: !prod })
                }
            }
        }, {
            // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
            test: /node_modules\/svelte\/.*\.mjs$/,
            resolve: {
                fullySpecified: false
            }
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
