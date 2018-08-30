const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { smart } = require('webpack-merge')
const { resolve } = require('path')

require('dotenv').config()

const nodeModulePath = resolve('node_modules')
const srcDirPath = resolve(__dirname, 'src')
const distPath = resolve(__dirname, 'dist')
const templateFilePath = resolve(srcDirPath, 'index.html')
const entryFilePath = resolve(srcDirPath, 'app.js')

const { NODE_ENV, PORT: port, TITLE: title } = process.env

const IS_OPTIMIZED = NODE_ENV !== 'development'

const base = {
  target: 'web',

  entry: ['@babel/polyfill', entryFilePath],

  output: {
    libraryTarget: 'var',

    path: distPath,

    filename: 'bundle.js',

    sourceMapFilename: 'bundle.map'
  },

  resolve: {
    extensions: ['.js', '.json'],

    modules: [nodeModulePath]
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        exclude: /node_modules/,

        use: {
          loader: 'babel-loader',

          options: {
            babelrc: false,

            retainLines: !IS_OPTIMIZED,

            cacheDirectory: !IS_OPTIMIZED,

            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
                  }
                }
              ]
            ],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      },
      {
        test: /\.(jpeg|jpg|mpc|mps|mpb|cxc|cxs|cxb|png|tga)$/,

        use: {
          loader: 'mtl-loader'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title,
      filename: 'index.html',
      inject: 'body',
      template: templateFilePath
    })
  ]
}

const development = {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    port,
    host: '0.0.0.0',
    inline: true,
    watchOptions: {
      ignored: [/node_modules/]
    }
  }
}

const optimized = {
  bail: IS_OPTIMIZED,

  mode: 'production',

  devtool: false,

  output: {
    pathinfo: false
  },

  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          warnings: false,
          conditionals: true,
          comparisons: false
        },
        output: {
          comments: false,
          ascii_only: true
        }
      }
    })
  ]
}

module.exports = !IS_OPTIMIZED
  ? smart(base, development)
  : smart(base, optimized)
