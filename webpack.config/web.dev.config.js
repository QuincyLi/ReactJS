var path = require('path');
var webpack = require('webpack');
var openBrowserPlugin = require('open-browser-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var htmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var os = require('os');
var browser = os.platform().indexOf('win32') >= 0 ? 'chrome' : 'google chrome';

var vendorCss = new extractTextPlugin({
    filename: 'assets/css/vendor.[name].css',
});

var appCss = new extractTextPlugin({
    filename: 'assets/css/app.[name].css',
});

var myPlugins = [
    // new openBrowserPlugin({ url: 'http://localhost:8081', browser: browser }),
    new htmlWebpackPlugin({
        template: '!!raw-loader!index.ejs',
        filename: 'index.ejs',
        alwaysWriteToDisk: true
    }),
    new htmlWebpackHarddiskPlugin(),

    // pack all common packages from app & vendor and name it as verdor.[chunkhash].js.
    // Since we defined packages in vendor, so common packages are exactly the same as verndor.
    // then the packages in app will be moved out.

    // manifest is used to split runtime codes of webpack from vendor.js into manifest.js to make sure hash of vendor.js is not changed.
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),


    // hot-reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
];

myPlugins.push(vendorCss);
myPlugins.push(appCss);

module.exports = {
    entry: {
        app: ['./app/index.js'],
        vendor: ['react', 'react-router', 'react-router-dom', 'react-dom', 'redux', 'react-redux', 'jquery', 'babel-polyfill']
    },

    output: {
        // chunk hash is to resolve browser cache issue.
        // e.g. javascript content is changed, but new change doesn't take effect, this is becuase browser caches javascript.
        // if we add a hash into filename, this is will be resolved since everytime you make any change, hash changes which means file name changes.
        path: path.resolve('./dist'),
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[id].js',

        // deploy static files into server(IIS, CDN), then we need to set publicPath.
        // in this demo, they'er deployed to IIS.
        // publicPath: 'http://localhost/'
    },

    devtool: 'source-map',

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/, loader: ['url-loader', 'img-loader'] },
            { test: /\.html$/, loader: 'html-loader' },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: appCss.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true
                        }
                    }]
                })
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: vendorCss.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: false
                        }
                    }]
                })
            }
        ]
    },

    plugins: myPlugins
}