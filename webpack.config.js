const path = require('path')
const fs = require('fs')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const OUTPUT_DIR = './dist'

function listAllPosts() {
  const postsDir = path.join(__dirname, './posts')
  return fs.readdirSync(postsDir).map((fn) => fn.replace(/\.md/, '.html'))
}

module.exports = [{
  target: 'node',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, OUTPUT_DIR),
    libraryTarget: 'umd',
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[chunkhash:5]'
        }
      }
    ],
    noParse: [
      /\.min\.js$/,
      /es6-promise\.js$/
    ]
  },
  plugins: [
    new StaticSiteGeneratorPlugin({
      paths: listAllPosts(),
      locals: {
        // Properties here are merged into `locals`
        // passed to the exported render function
        greet: 'Hello'
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: OUTPUT_DIR + '../publish',
    host: '0.0.0.0'
  },
  devtool: isProd ? false : '#eval-source-map'
}]
