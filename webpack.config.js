const path = require('path');
const nodeExternals = require('webpack-node-externals');
const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');
const webpack = require('webpack');

const distPath = path.resolve(__dirname, './dist');

module.exports = {
    entry: {
        core: './src/core/index.ts',
    },
    output: {
        filename: '[name]/index.js',
        path: distPath,
    },
    mode: 'production',
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
        new DeclarationBundlerPlugin({
            moduleName: '[name]',
            out: path.resolve(distPath, '[name]'),
        }),
        // new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    ],
};
