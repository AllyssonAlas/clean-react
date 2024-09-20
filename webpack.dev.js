const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  devServer: {
    static: './dist',
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:8000/api'),
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html',
    }),
    new CleanWebpackPlugin(),
  ],
})
