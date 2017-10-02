var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.less', '.html', '.svg'],
    modules: [helpers.root('src'), helpers.root('node_modules')]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'angular2-template-loader']
      },
      {
        test: /\.jade$/,
        use: ['html-loader?attrs=img:src video:poster source:src use:href', 'jade-html-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|json)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.less$/,
        use: ['to-string-loader', 'angular2-styles-loader', 'css-loader', 'less-loader']
      }
    ],
    exprContextCritical: false,
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
       helpers.root('src'),
      { }
    ),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.jade'
    })
  ]
};
