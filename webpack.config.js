const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (env) => ({
  mode: env.IS_DEV ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },
  devtool: env.IS_DEV ? 'inline-source-map' : false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    open: true,
    hot: false,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // eslint-disable-next-line global-require
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: env.IS_DEV ? './.env.dev' : './.env.prod',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/views/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets/', to: 'assets/', noErrorOnMissing: true }],
      options: {
        concurrency: 100,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@abstract': path.resolve(__dirname, 'src/js/abstract'),
      '@binder': path.resolve(__dirname, 'src/js/binder'),
      '@constant': path.resolve(__dirname, 'src/js/constant'),
      '@error': path.resolve(__dirname, 'src/js/error'),
      '@model': path.resolve(__dirname, 'src/js/model'),
      '@repository': path.resolve(__dirname, 'src/js/repository'),
      '@util': path.resolve(__dirname, 'src/js/util'),
      '@view': path.resolve(__dirname, 'src/js/view'),
      '@viewmodel': path.resolve(__dirname, 'src/js/viewmodel'),
      '@config': path.resolve(__dirname, 'src/js/config'),
      '@ui': path.resolve(__dirname, 'src/js/ui'),
    },
  },
});
