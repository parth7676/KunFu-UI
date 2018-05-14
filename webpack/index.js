const { resolve } = require('path')
const vendor = require('./vendor')
const rules = require('./rules')
const plugins = require('./plugins')
const devServer = require('./dev_server')
const devTool = require('./devtool')

const settings = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss', '.ttf', '.woff2', '.eot', '.svg'],
    alias: {
      'publicPath': resolve(__dirname, 'public'),
      'src': resolve('src'),
      'actions': resolve('src/actions'),
      'reducers': resolve('src/reducers'),
      'endpoints': resolve('src/endpoints'),
      'components': resolve('src/components'),
      'css': resolve('src/css'),
      'assets': resolve('public/assets'),
      'selectors': resolve('src/selectors')
    }
  },
  context: resolve(__dirname, '..'),
  entry: {
    app: [
      'react-hot-loader/patch',
      'babel-polyfill',
      './src/index'
    ],
    vendor
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, '..', 'build/'),
    publicPath: '/'
  },
  module: {
    rules
  },
  plugins,
  devServer,
  devtool: devTool
}
module.exports = settings
