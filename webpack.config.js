const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// provides specifications for which loaders are used, which files are processed
// or excluded, the webpack build output, and the port where content is served

module.exports = {
    entry: './source/index.js',
    output: {
      path: path.join(__dirname, '/build'),
      filename: 'bundlefile.js',
      publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]              
            },
            {
                test:/\.(png|jpg|jpeg|webp|ico|svg|pdf)$/i,
                type: 'asset/resource',
                exclude: /node_modules/
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './source/index.html',
            favicon: './source/favicon.ico',
            filename: './index.html'
        }),
    ]
  }