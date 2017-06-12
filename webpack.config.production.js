/**
 * Created by andre on 06.06.2017.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './client/js/main.js',
        scss: './client/js/main-for-scss.js'
    },
    output: {
        path: path.join(__dirname, "client/release"),
        filename: "[name].entry.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.min.js'
        }
    },
    plugins: [new webpack.optimize.UglifyJsPlugin()]
};