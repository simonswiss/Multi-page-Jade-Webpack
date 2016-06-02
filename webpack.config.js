const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  entries: __dirname + '/src/js/entries/',
  output: __dirname + '/dist/',
  jade: __dirname + '/src/jade/'
}

function jadePage(name) {
  return new HtmlWebpackPlugin({
    filename: name + '.html',
    template: PATHS.jade + name + '.jade',
    inject: false
  })
}

module.exports = {
  entry: {
    index: PATHS.entries + 'index.js',
    about: PATHS.entries + 'about.js'
  },
  output: {
    path: PATHS.output,
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {presets: ['es2015', 'react']}
      },
      { 
        test: /\.jade$/,
        exclude: /node_modules/,
        loader: 'jade' 
      },
      {
        test: /\.(styl|css)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
      }
    ]
  },
  plugins: [
    jadePage('index'),
    jadePage('about'),
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' }
    ])
  ]
}