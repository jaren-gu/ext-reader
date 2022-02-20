const webpack = require('webpack')

const plugins = [
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
    }),

    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    }),
]

const isProduction = () => {
    return process.env.NODE_ENV === 'production'
}

const config = {
    mode: 'production',
    entry: {
        background: './src/background.ts',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
    },
    devServer: {
        port: 3000,
    },

    plugins,

    module: {
        rules: [
            {
                test: /\.ts[x]$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'stage-0', 'react'],
                        },
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.js[x]$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0', 'react'],
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
}

module.exports = config
