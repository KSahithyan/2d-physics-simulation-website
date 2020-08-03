 const path = require('path');
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
    }
 };

