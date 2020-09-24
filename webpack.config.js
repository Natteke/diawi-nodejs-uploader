const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
    entry: {
        core: './src/core/index.ts',
    },
    output: {
        filename: '[name]/index.js',
        path: `${__dirname}/dist`,
    },
    mode: 'development',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    target: 'node',
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, './src'),
        },
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    ],
};
