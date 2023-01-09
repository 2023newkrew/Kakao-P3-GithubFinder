const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const {merge} = require('webpack-merge');
const config = require('./webpack.config');
const path = require('path');

module.exports = merge(config, {
  mode: 'development',
  plugins: [
    new ESLintWebpackPlugin({
      fix: true,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    open: true,
  },
});
