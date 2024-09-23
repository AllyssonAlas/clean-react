const path = require('path')

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    filename: 'main-bundle-[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
}
