const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const DIST_PATH = path.join(__dirname, 'dist');
const APP_PATH = path.join(__dirname, 'app');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[contenthash]',
                        },
                    },
                ],
            },
            {
                test: /\.js|jsx$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}], 'react', 'stage-0'],
                    plugins: ['transform-decorators-legacy', 'react-html-attrs']
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)\/react-toolbox/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader?importLoaders=1!postcss-loader'
                })
            },
            {
                test: /\.css$/,
                include: /(node_modules)\/react-toolbox/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]--[local]--[hash:base64:8]"
                        }
                    },
                    "postcss-loader"
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve( __dirname, 'public/index.html' ),
            filename: 'index.html'
        }),
        new CommonsChunkPlugin({
            names: ['vendor', 'bootstraper']
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                unused: true,
                dead_code: true
            }
        }),
        new ExtractTextPlugin('[name].styles.css')
    ],
    devServer: {
        port: 3030
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    }
};