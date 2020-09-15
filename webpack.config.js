const { resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackChromeReloaderPlugin = require("webpack-chrome-extension-reloader");

const mode = process.env.NODE_ENV;
module.exports = {
  mode,
  devtool: "inline-source-map",
  entry: {
    "content-script": "./src/getDynalistSearchInfo.js",
    background: "./src/background.js",

    // This is just the popup script, it shouldn't trigger the plugin reload when is changed
    popup: "./src/popup.js"
  },
  output: {
    publicPath: ".",
    path: resolve(__dirname, "dist/"),
    filename: "[name].js",
    libraryTarget: "umd"
  },
  mode: "development",
  plugins: [
    /***********************************************************************/
    /* By default the plugin will work only when NODE_ENV is "development" */
    /***********************************************************************/
    new WebpackChromeReloaderPlugin(),

    new MiniCssExtractPlugin({ filename: "style.css" }),
    new CopyWebpackPlugin({patterns: [
      { from: "./src/popup.html"},
      { from: "./manifest.json" },
    ]})
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [require("@babel/preset-env")]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.txt$/,
        use: "raw-loader"
      }
    ]
  }
};