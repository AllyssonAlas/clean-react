const path = require('path');
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  devServer: {
    static: './public',
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    }
  },
  entry: './src/main/index.tsx',
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
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/public/js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:8000/api')
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
};
