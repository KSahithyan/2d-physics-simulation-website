const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const htmlPlugin = new HTMLWebpackPlugin({
    template: './index.html',
    filename: './index.html'
})
const copyPlugin = new CopyPlugin({
    patterns: [
        {from: './src/icons', to: 'icons'}
    ]
})

module.exports = {
    // define entry file and output
    entry: './src/index.tsx',
    output: {
        path: path.resolve('dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx']
    },
    // define babel loader
    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
            { test: /\.ts(x?)$/i, loader: 'ts-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [htmlPlugin, copyPlugin]
};

