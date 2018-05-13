const ExtractTextPlugin = require('extract-text-webpack-plugin')

const rules = [
  {
    test: /.js?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'react']
    }
  },
  {
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'react']
    }
  },
  {
    test: /.(scss|css)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ]
            },
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    })
  },
  {
    test: /\.(eot|woff|woff2|ttf)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 25000,
        name: 'fonts/[name]-[hash].[ext]'
      }
    }]
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'images/[name]-[hash].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(png|jpg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      }
    ]
  }
]
module.exports = rules
