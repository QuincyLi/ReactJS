var path = require('path');

module.exports = {
    entry: {
        app: './server/bin/server.js'
    },
    target: 'node',
    node: {
        __filename: false,
        __dirname: false
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'server.js'
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=stage-3' },

        ]
    }
}