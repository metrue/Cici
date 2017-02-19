const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const pkg = require('./package.json')
// Adds a banner to the top of each generated chunk.
const banner = `
${pkg.description}
v${pkg.version} ©${new Date().getFullYear()} ${pkg.author}
${pkg.homepage}
`.trim()

const isProd = process.env.NODE_ENV === 'production'

const OUTPUT_DIR = './lib'

module.exports = [{
  target: 'node',
  entry: {
    PostPage: './src/PostPage.js',
    HomePage: './src/HomePage.js'
  },
  output: {
    path: path.resolve(__dirname, OUTPUT_DIR),
    libraryTarget: 'commonjs2',
    publicPath: '/',
    // filename: isProd ? 'build.[chunkhash:5].js' : 'build.js'
    filename: 'js/[name].build.js'
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
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: {
          stylus: ExtractTextPlugin.extract({
            loader: 'css-loader?{discardComments:{removeAll:true}}!stylus-loader',
            fallbackLoader: 'vue-style-loader'
          })
        }
      }
    }),
    new ExtractTextPlugin({
      filename: './css/build.[name].css',
      disable: false,
      allChunks: true
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

// production build setting
if (isProd) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.BannerPlugin(banner)
  ])
}
