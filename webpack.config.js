const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');

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
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName:'[name]__[local]--[hash:base64:5]'
                            },
                        }
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /\.module\.css$/,
              },
            {
                test:/\.(png|jpg|jpeg|webp)$/i,
                type: 'asset/resource'
            },
            {
                test:/\.svg$/,
                use: [
                        {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10000,
                            }
                        }
                ]
            },
            {
                test:/\.(ico|pdf)$/,
                use: {
                    loader: 'file-loader'
                },
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