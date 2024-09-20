const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, , 'css-loader', 'sass-loader'],
      },
    ],
  },
  externals: {
    axios: 'axios',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://localhost:8000/api'),
    }),
    new HtmlWebpackPlugin({
      template: './template.prod.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[fullhash].css',
    }),
    new FaviconsWebpackPlugin('./public/favicon.png'),
  ],
})
