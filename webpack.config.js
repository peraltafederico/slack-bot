const path = require('path')
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  target: 'node', 
  externals: [nodeExternals()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'ts-loader',
      },
    ],
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
  },
  devtool:'source-map',
  resolve: { extensions: ['.ts'] },
}
