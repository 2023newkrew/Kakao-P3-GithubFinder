const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config();
module.exports = (_, argv) => {
  const isDevelopment = argv.mode !== "production";

  return {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
      assetModuleFilename: "[name][ext]",
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // 'style-loader' /** Create style node */,
            MiniCssExtractPlugin.loader, // js 전에 CSS 적용 위함
            "css-loader" /** Translate CSS into CommonJS */,
            "sass-loader" /** Compile SASS to CSS */,
          ], // 역순으로 로더가 작동한다. 이 순서를 지켜야한다.
        },
        {
          test: /\.(png|svg|jpg|jpeg|webp|gif)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "index.html",
      }), //
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
    devServer: {
      port: 3000,
      compress: true,
      hot: false,
      liveReload: true,
      open: true,
      watchFiles: ["src/**/*.js", "src/**/*.scss", "public/**/*"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "@controllers": path.resolve(__dirname, "src/controllers/"),
        "@constants": path.resolve(__dirname, "src/constants/"),
        "@models": path.resolve(__dirname, "src/models/"),
        "@utils": path.resolve(__dirname, "src/utils/"),
      },
    },
  };
};
