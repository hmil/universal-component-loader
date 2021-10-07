const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = /** @type import('webpack').Configuration */({
    entry: {
        'main': './src/main.ts',
        'widget': './src/widget/index.ts'
    },
    devtool: false,
    mode,
    resolve: {
        // see below for an explanation
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.ts', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: 'auto',
        library: {
            // name: ['SvelteConsumer', '[name]'],
            type: 'umd'
        },
        environment: { module: true },
    },
    // experiments: {
    //     outputModule: true
    // },
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
                        dev: !prod,
                        customElement: true
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
    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        'svelte': 'svelte',
        'svelte/internal': 'svelte/internal',
        'svelte/compiler': 'svelte/compiler',
    },
    externalsType: 'commonjs',
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
    },
});
