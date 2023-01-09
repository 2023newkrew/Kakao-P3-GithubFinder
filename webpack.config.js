const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "src/index.js"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true,
    assetModuleFilename: "./assets/[name][ext",
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "./views/index.html",
      template: "./src/views/index.html",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@scripts": path.resolve(__dirname, "./src/js/"),
      "@styles": path.resolve(__dirname, "./src/styles/"),
      "@view": path.resolve(__dirname, "./src/views/"),
    },
  },
};
