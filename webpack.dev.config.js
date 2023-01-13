const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.js");
const path = require("path");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/views"),
    },
    watchFiles: ["src/*"],
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
  devtool: "source-map",
});
