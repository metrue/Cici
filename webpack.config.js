const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const OUTPUT_DIR = './public'

const list = (() => {
  const postsDir = path.join(__dirname, './posts')
  return fs.readdirSync(postsDir).map((fn) => fn.replace(/\.md/, '.html'))
})()

module.exports = [{
  target: 'node',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, OUTPUT_DIR),
    libraryTarget: 'umd',
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[chunkhash:5]',
        },
      },
      {
        test: /\.styl$/,
        loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/',
      },
    ],
    noParse: [
      /\.min\.js$/,
      /es6-promise\.js$/,
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: {
          stylus: ExtractTextPlugin.extract({
            loader: 'css-loader?{discardComments:{removeAll:true}}!stylus-loader',
            fallbackLoader: 'vue-style-loader',
          }),
        },
      },
    }),
    new ExtractTextPlugin({
      filename: './css/build.[name].css',
      disable: false,
      allChunks: true,
    }),
    new StaticSiteGeneratorPlugin({
      paths: [...list, '/'],
      locals: {},
    }),
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: OUTPUT_DIR,
    host: '0.0.0.0',
  },
  devtool: isProd ? false : '#eval-source-map',
}]
