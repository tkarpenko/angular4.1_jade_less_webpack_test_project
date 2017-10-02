var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('../frontend'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
      new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false,
      options: {
        htmlLoader: {
          minimize: false,
        }
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: false
      }
    })
  ]
});
