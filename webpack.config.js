const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  target: "web",
  output: {
    filename: "npu.user.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.ProvidePlugin({
      "window.jQuery": 'jquery'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("./src/manifest.json"), 
          to: "manifest.json" 
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: "url-loader",
      },
      {
        test: /\.scss$/,
        use: [
          "extract-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
